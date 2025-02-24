import axios from 'axios';
import { find, cloneDeep } from 'lodash';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import {
  SET_LOADING,
  SET_FACILITY_MODEL_LIST,
  SET_ETC_MODEL_LIST,
  SET_FACILITY_DRILLDOWN,
  SET_ETC_DRILLDOWN,
  SELECT_ETC,
  SET_FACILITY_DAILY_EVENTS,
  SET_ETC_DAILY_EVENTS,
  SET_SELECTED_FACILITIES,
  SET_SELECTED_ETCS,
} from './action-types';

// Setters

export const setLoading = loading => ({
  type: SET_LOADING,
  loading,
});

export const setFacilityModelList = facilityModelList => ({
  type: SET_FACILITY_MODEL_LIST,
  facilityModelList,
});

export const setSelectedFacilities = facilityIds => ({
  type: SET_SELECTED_FACILITIES,
  facilityIds,
});

export const setSelectedETCs = etcIds => ({
  type: SET_SELECTED_ETCS,
  etcIds,
});

export const setEtcModelList = etcModelList => ({
  type: SET_ETC_MODEL_LIST,
  etcModelList,
});

// Getters

export const getFacilityReporting = () => (dispatch) => {
  dispatch(setLoading(true));
  return axios.get('facility-reports')
    .then((response) => {
      dispatch(setFacilityModelList(response.data.data));
      window.setTimeout(() => dispatch(setLoading(false)), 1000);
    });
};

export const getEtcReporting = () => (dispatch) => {
  dispatch(setLoading(true));
  return axios.get('etc-reports')
    .then((response) => {
      dispatch(setEtcModelList(response.data.data));
      window.setTimeout(() => dispatch(setLoading(false)), 1000);
    });
};

// Manipulators

export const selectEtc = etcId => ({
  type: SELECT_ETC,
  etcId,
});

export const changeBudget = budget => (dispatch, getState) => {
  const { facilityModelList, selectedFacilities } = getState().reportingReducer;
  let [selectedFacility] = selectedFacilities;
  selectedFacility = parseInt(selectedFacility, 10);

  if (!facilityModelList.length) {
    return;
  }
  let updatedModelList = [];

  if (selectedFacilities.length === 1) {
    updatedModelList = facilityModelList
      .map((data) => {
        if (parseInt(data.id, 10) === selectedFacility) {
          const clone = cloneDeep(data);
          clone.attributes.budget = budget;
          return clone;
        }
        return data;
      });
  } else {
    updatedModelList = facilityModelList
      .map((data) => {
        const clone = cloneDeep(data);
        clone.attributes.organization.budget = budget;
        return clone;
      });
  }
  dispatch(setFacilityModelList(updatedModelList));
};

export const getFacilityDrilldown = facilityId => dispatch =>
  axios.get(`facility-reports/${facilityId}`)
    .then((response) => {
      dispatch(({
        type: SET_FACILITY_DRILLDOWN,
        facilityDetails: response.data.data,
      }));
    });

export const getEtcDrilldown = etcId => dispatch =>
  axios.get(`etc-reports/${etcId}`)
    .then((response) => {
      dispatch(({
        type: SET_ETC_DRILLDOWN,
        etcDetails: response.data.data,
      }));
    });

export const getFacilityDailyView = (facilityId, date) => dispatch =>
  axios.get(`facility-reports/${facilityId}/${date}`)
    .then((response) => {
      dispatch(({
        type: SET_FACILITY_DAILY_EVENTS,
        events: response.data.data,
      }));
    });
export const getEtcDailyView = (etcId, date) => dispatch =>
  axios.get(`etc-reports/${etcId}/${date}`)
    .then((response) => {
      dispatch(({
        type: SET_ETC_DAILY_EVENTS,
        events: response.data.data,
      }));
    });

export const saveBudget = budget => (dispatch, getState) => {
  const { facilityModelList, selectedFacilities } = getState().reportingReducer;
  let [selectedFacility] = selectedFacilities;
  selectedFacility = parseInt(selectedFacility, 10);

  if (!facilityModelList.length) {
    return;
  }
  let updatedModelList = [];
  if (selectedFacilities.length === 1) {
    const facility = find(facilityModelList, { id: selectedFacility.toString() });
    const attributes = {
      name: facility.attributes.name,
      budget: parseInt(budget, 10),
      location_id: facility.attributes.location_id,
    };
    axios.put(`facilities/${selectedFacility}`, {
      data: {
        type: 'facilities',
        attributes,
      },
    });
    updatedModelList = facilityModelList
      .map((data) => {
        if (parseInt(data.id, 10) === selectedFacility) {
          const clone = cloneDeep(data);
          clone.attributes.budget = budget;
          return clone;
        }
        return data;
      });
  } else {
    const { organization } = facilityModelList[0].attributes;
    const attributes = {
      name: organization.name,
      budget: parseInt(budget, 10),
    };
    axios.put(`organizations/${organization.id}`, {
      data: {
        type: 'organizations',
        attributes,
      },
    });
    updatedModelList = facilityModelList
      .map((data) => {
        const clone = cloneDeep(data);
        clone.attributes.organization.budget = budget;
        return clone;
      });
  }
  dispatch(setFacilityModelList(updatedModelList));
};

const pxToMm = px => Math.floor(px / document.getElementById('my_mm').offsetHeight);

export const downloadPDF = () => {
  const content = document.getElementById('reporting');
  if (!content) {
    return;
  }

  content.classList.add('reporting-print');

  const { offsetHeight, offsetWidth } = content;
  html2canvas(content, {
    width: offsetWidth,
    height: offsetHeight,
  })
    .then((canvas) => {
      // Convert to mm
      const ratio = 210 / pxToMm(offsetWidth);
      const imgWidth = pxToMm(offsetWidth) * ratio;
      const imgHeight = pxToMm(offsetHeight) * ratio;
      // eslint-disable-next-line
      const pdf = new jsPDF('portrait', 'mm', 'a4');
      // const { width, height } = pdf.internal.pageSize;
      pdf.addImage(canvas, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('reporting.pdf');
      content.classList.remove('reporting-print');
    });
};

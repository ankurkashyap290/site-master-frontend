import moment from 'moment';

const calendarReducer = {
  deletableModel: null,
  editableModel: null,
  modelDetails: null,
  modelList: [],
  searchKey: '',
  calendarEvents: [],
  calendarConfig: {
    date: moment().toDate(),
    onNavigate: () => {},
    view: 'month',
    onView: () => {},
    events: [],
    popup: true,
  },
};

export default calendarReducer;

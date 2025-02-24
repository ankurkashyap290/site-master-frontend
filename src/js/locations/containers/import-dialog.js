import { connect } from 'react-redux';

import ImportDialogComponent from 'ui-elements/import-dialog';
import { importCSV, getLocationList } from '../store/actions';

const mapDispatchToProps = dispatch => ({
  onImport: file => dispatch(importCSV(file)),
  updateModelList: () => dispatch(getLocationList()),
});

const mapStateToProps = () => ({
  title: 'Locations',
  description: 'Choose the file, which you want to import to the list',
});

const ImportDialog = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImportDialogComponent);

export default ImportDialog;

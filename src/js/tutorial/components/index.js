import React from 'react';
import Paper from '@material-ui/core/Paper';
import { cloneDeep } from 'lodash';

import NewUser from './new-user';
import RecoverPassword from './recover-password';
import CreateEvent from './create-event';
import BidRequest from './bidding-request';
import PDFDoc from './pdfdoc';

class TutorialPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newUser: false,
      recoverPassword: false,
      createEvent: false,
      bidRequest: false,
    };
    this.toggleVideo = this.toggleVideo.bind(this);
  }

  toggleVideo(type) {
    const newState = cloneDeep(this.state);
    newState[type] = !newState[type];
    this.setState(newState);
  }

  render() {
    return (
      <div className="table-wrapper">
        <Paper className="table-paper">
          <NewUser toggleVideo={this.toggleVideo} open={this.state.newUser} />
          <RecoverPassword toggleVideo={this.toggleVideo} open={this.state.recoverPassword} />
          <CreateEvent toggleVideo={this.toggleVideo} open={this.state.createEvent} />
          <BidRequest toggleVideo={this.toggleVideo} open={this.state.bidRequest} />
          <PDFDoc
            fileUrl="/files/import_client.pdf"
            title="Import Using CSV - Client"
            description="This manual helps you with importing clients from a CSV file."
          />
          <PDFDoc
            fileUrl="/files/import_location.pdf"
            title="Import Location"
            description="This manual helps you with importing locations from a CSV file."
          />
          <PDFDoc
            fileUrl="/files/reporting.pdf"
            title="How to View Reporting"
            description="This manual helps you to better understand reporting menu."
          />
        </Paper>
      </div>
    );
  }
}

export default TutorialPage;

import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Icon, Typography } from '@material-ui/core';
import BidForm from './bid-form';

const EtcBidComponent = (props) => {
  if (!props.editableModel) {
    return (
      <Paper className="standalone-form">
        <Typography variant="title" paragraph>
          Transport request not found
        </Typography>
        <Typography>
          The event might have been deleted or maybe you have mistyped the URL.
        </Typography>
      </Paper>
    );
  }
  let bidStatusText = '';
  switch (props.editableModel.attributes.status) {
    case 'accepted':
      bidStatusText = 'Your bid has been accepted';
      break;
    case 'submitted':
      bidStatusText = 'Your bid has been saved';
      break;
    case 'declined':
      bidStatusText =
        props.declinedByDriver ?
          'You have successfully declined this transportation request' :
          'Transport already fulfilled';
      break;
    default:
      bidStatusText = '';
  }
  return (
    <Paper className="standalone-form">
      <Typography variant="headline" className="etc-name">
        <Icon className="icon">airport_shuttle</Icon>
        {props.editableModel.attributes.etc.name}
      </Typography>
      {bidStatusText ?
        <div>
          <Typography variant="title" paragraph>
            {bidStatusText}
          </Typography>
          <Typography paragraph>
            Thank you for your service to our organization and for being an active
            Journey participant.
          </Typography>
        </div>
      : null}
      <BidForm {...props} />
    </Paper>
  );
};

EtcBidComponent.defaultProps = {
  headline: '',
};

EtcBidComponent.propTypes = {
  editableModel: PropTypes.object.isRequired,
  declinedByDriver: PropTypes.bool.isRequired,
  headline: PropTypes.string,
  onEnter: PropTypes.func.isRequired,
};

export default EtcBidComponent;

import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Iframe from 'react-iframe';
import { withStyles } from '@material-ui/core/styles';
import styles from './theme';

const CreateEvent = ({ toggleVideo, open, classes }) => (
  <React.Fragment>
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image="https://i.vimeocdn.com/video/742130259_640.jpg"
        title="Onboard New User"
        onClick={() => toggleVideo('bidRequest')}
      />
      <CardContent>
        <Typography gutterBottom variant="headline" component="h2">
        Manage Bid Requests
        </Typography>
        <Typography component="p">
          This video shows how manage bidding requests and external drivers.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => toggleVideo('bidRequest')}>
          Watch Video
        </Button>
      </CardActions>
    </Card>
    <Dialog
      open={open}
      fullWidth
      onClose={() => toggleVideo('bidRequest')}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">Manage Bid Requests</DialogTitle>
      <DialogContent
        className={classes.dialog}
      >
        <DialogContentText>
          <Iframe
            url="https://player.vimeo.com/video/303178489"
            width="550px"
            height="300px"
            frameBorder="0"
            webkitallowfullscreen
            mozallowfullscreen
            allowFullScreen
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => toggleVideo('bidRequest')} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  </React.Fragment>
);

CreateEvent.propTypes = {
  toggleVideo: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
};

export default withMobileDialog()(withStyles(styles)(CreateEvent));

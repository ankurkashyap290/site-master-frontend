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

const RecoverPassword = ({ toggleVideo, open, classes }) => (
  <React.Fragment>
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image="https://i.vimeocdn.com/video/742130636_640.jpg"
        title="Onboard New User"
        onClick={() => toggleVideo('recoverPassword')}
      />
      <CardContent>
        <Typography gutterBottom variant="headline" component="h2">
        Recover Password
        </Typography>
        <Typography component="p">
          This video shows how to recover your password.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => toggleVideo('recoverPassword')}>
          Watch Video
        </Button>
      </CardActions>
    </Card>
    <Dialog
      open={open}
      fullWidth
      onClose={() => toggleVideo('recoverPassword')}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">Recover Password</DialogTitle>
      <DialogContent
        className={classes.dialog}
      >
        <DialogContentText>
          <Iframe
            url="https://player.vimeo.com/video/303178806"
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
        <Button onClick={() => toggleVideo('recoverPassword')} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  </React.Fragment>
);

RecoverPassword.propTypes = {
  toggleVideo: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
};

export default withMobileDialog()(withStyles(styles)(RecoverPassword));

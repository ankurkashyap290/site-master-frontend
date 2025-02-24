import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import styles from './theme';

const PDFDoc = ({
  classes, fileUrl, title, description,
}) => (
  <Card className={classes.card}>
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        height: '195px',
      }}
    >
      <IconButton disableRipple aria-label="Download" href={fileUrl} target="_blank" style={{ display: 'block' }}>
        <Icon style={{ fontSize: '191px' }}>save_alt</Icon>
      </IconButton>
    </div>
    <CardContent>
      <Typography gutterBottom variant="headline" component="h2">
        {title}
      </Typography>
      <Typography component="p">
        {description}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" color="primary" href={fileUrl} target="_blank" style={{ textDecoration: 'none' }}>
        Download File
      </Button>
    </CardActions>
  </Card>
);

PDFDoc.propTypes = {
  classes: PropTypes.object.isRequired,
  fileUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default withStyles(styles)(PDFDoc);

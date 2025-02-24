import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';

const tutorialSteps = [
  {
    label: '1. How to view appointments on the calendar',
    imgPath: '/images/tour/1.jpg',
  },
  {
    label: '2. How to search in the calendar',
    imgPath: '/images/tour/2.jpg',
  },
  {
    label: '3. How to send one request to multiple transportation companies',
    imgPath: '/images/tour/3.jpg',
  },
];

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    flexGrow: 1,
    position: 'relative',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing.unit * 4,
    backgroundColor: theme.palette.background.default,
  },
  view: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  img: {
    overflow: 'hidden',
    width: '100%',
  },
  mobileStepper: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
});

class Tour extends React.Component {
  constructor() {
    super();
    this.state = {
      activeStep: 0,
    };
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleStepChange = this.handleStepChange.bind(this);
  }

  handleNext() {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }));
  }

  handleBack() {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }));
  }

  handleStepChange(activeStep) {
    this.setState({ activeStep });
  }

  render() {
    const { classes, theme } = this.props;
    const { activeStep } = this.state;

    const maxSteps = tutorialSteps.length;

    return (
      <div className={classes.root}>
        <Paper square elevation={0} className={classes.header}>
          <Typography>{tutorialSteps[activeStep].label}</Typography>
        </Paper>
        <SwipeableViews
          className={classes.view}
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.activeStep}
          onChangeIndex={this.handleStepChange}
          enableMouseEvents
        >
          {tutorialSteps.map(step => (
            <img key={step.label} className={classes.img} src={step.imgPath} alt={step.label} />
          ))}
        </SwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          className={classes.mobileStepper}
          nextButton={
            <Button color="primary" size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
              Next
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button color="primary" size="small" onClick={this.handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              Back
            </Button>
          }
        />
      </div>
    );
  }
}

Tour.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Tour);

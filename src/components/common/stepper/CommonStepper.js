import { Stepper, Step, StepLabel, withStyles } from '@material-ui/core';
import StepperStyle from 'theme/styles/components/StepperStyle';

const CommonStepper = (props) => {
  
  const { classes, activeStep, steps } = props;

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {
          steps.map((label, index) => {
            return (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })
        }
      </Stepper>
    </div>

  );

}

export default withStyles(StepperStyle)(CommonStepper);
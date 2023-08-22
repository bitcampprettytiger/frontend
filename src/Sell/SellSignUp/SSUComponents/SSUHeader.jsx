import React from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';

const steps = ['조회', '가입', '정보'];

const StepProgress = ({ activeStep }) => {
  return (
    <Stepper alternativeLabel activeStep={activeStep}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default StepProgress;

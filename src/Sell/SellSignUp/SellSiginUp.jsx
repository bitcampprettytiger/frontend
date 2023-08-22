import React from 'react';
import SSUsaup from './SSUComponents/SSUsaup';
import SSUHeader from './SSUComponents/SSUHeader';
import { Container } from '@mui/material';
import SSUdoro from './SSUComponents/SSUdoro';
import { Button } from '@mui/material';

const RegistrationForm = () => {
  return (
    <Container style={{ padding: '20px', border: '1px solid #ccc' }}>
      <SSUHeader />
      <SSUsaup />
      <SSUdoro />
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button variant="contained" color="primary">
          다음
        </Button>
      </div>
    </Container>
  );
};

export default RegistrationForm;

import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const AppBarWithTitle = ({ title }) => {
  let navigate = useNavigate();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar sx={{ position: 'relative',backgroundColor: 'white', width: '100%', height: '20vh' }}>
        <Toolbar sx={{ minHeight: '100%' }}>
          <IconButton edge="start" aria-label="back" onClick={() => { navigate(-1); }}>
            <ArrowBackIcon
            sx={{width:'15px', height:'15px'}}/>
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: 'black',
              fontSize: '18px',
              marginTop: 'auto',
              marginBottom: 'auto',
            }}
          >
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

AppBarWithTitle.propTypes = {
  title: PropTypes.string.isRequired
};

export default AppBarWithTitle;

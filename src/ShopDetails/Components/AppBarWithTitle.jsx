import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import useResponsive from '../SDCustomHooks/useResponsive';

const AppBarWithTitle = ({ title }) => {
  let navigate = useNavigate();
  const { width } = useResponsive();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar sx={{
                width: width,
                left: `calc((100% - ${width}) / 2)`,
                right: `calc((100% - ${width}) / 2)`,
                backgroundColor: 'white', 
                height: '8%', 
                position: 'fixed', 
                top : 0,
            }}>
                <Toolbar sx={{ minHeight: '0', display: 'flex' }}>
                    <Box sx={{
                        height: '50%',
                        width: 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '1vw',
                        marginLeft: '1vw',
                    }}>
                        <IconButton edge="start" aria-label="back" onClick={() => { navigate(-1) }}>
                            <ArrowBackIcon sx={{
                                marginTop: 'auto',
                                marginBottom: 'auto',
                            }} />
                        </IconButton>
                    </Box>
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: 'black',
              fontSize: '115%',
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
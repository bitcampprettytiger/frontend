import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import {useNavigate} from 'react-router-dom';

function ScrollTop(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 0,
  });
  

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor',
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1000 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

function AppBarNoShare(props) {
  let navigate = useNavigate();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar sx={{ backgroundColor: 'white', width:'100vw', height: '20vh' }}>
        <Toolbar sx={{minHeight:'100%'}}>
          <IconButton edge="start" aria-label="back" onClick={() => {navigate(-1)}}>
            <img
              src="/icon/왼쪽화살표.png"
              alt="back button"
              style={{
                height: '30px',
                marginRight: '10px',
                marginTop: '-9px',
                transform: 'rotate(180deg)',
              }}
            />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: 'black',
              fontSize: '18px',
              marginTop:'auto',
              marginBottom:'auto',
            }}
          >
            압구정 포장마차 {/* 가게 이름 데이터 넣기*/}
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <Container>
        <Box sx={{ my: 2 }}>
        </Box>
      </Container>
      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}

export default AppBarNoShare;
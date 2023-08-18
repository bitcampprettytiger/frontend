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
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share'; 
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
        sx={{ position: 'fixed', bottom: '1vh', right: '2vw', zIndex: 1000 }}
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

function ShopAppBar(props) {
  let navigate = useNavigate();
  const [liked, setLiked] = React.useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar sx={{ backgroundColor: 'white', width: '100vw', height: '70px' }}>
        <Toolbar sx={{ minHeight: '0', display: 'flex' }}>
          <IconButton edge="start" aria-label="back" onClick={() => {navigate(-1)}}>
            <ArrowBackIcon sx={{
                height: '100%',
                marginRight: '1vw',
                marginLeft: '1vw',
                marginTop: 'auto',
                marginBottom: 'auto',
              }}/>
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            noWrap
            sx={{
              color: 'black',
              fontSize: '18px',
              marginTop: 'auto',
              marginBottom: 'auto',
            }}
          >
            압구정 포장마차 {/* 가게 이름 데이터 넣기*/}
          </Typography>
          <Box flexGrow={1} />
          <Box display="flex" alignItems="center" >
            <Box sx={{
              height: '50%', 
              width: 'auto', 
              display: 'flex',
              alignItems: 'center', 
              justifyContent: 'center',
              marginRight: '2vw'
            }}>
              <IconButton
                edge="end"
                aria-label="like"
                onClick={handleLike}
                sx={{
                  color: liked ? '#FF745A' : 'inherit',
                  height: '100%', // 아이콘 버튼의 높이를 상위 Box 높이에 맞춤
                  width: 'auto',
                }}
              >
                {liked ? <FavoriteIcon /> : <FavoriteBorderIcon sx={{ color: '#FF745A' }} />}
              </IconButton>
            </Box>
            <IconButton edge="end" aria-label="share" sx={{ height: '30px', width: '30px', marginRight: '1vw', marginTop: 'auto',
              marginBottom: 'auto',}}>
              <ShareIcon />
            </IconButton>
          </Box>
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

export default ShopAppBar;
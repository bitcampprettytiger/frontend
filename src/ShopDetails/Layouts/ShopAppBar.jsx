import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import { useNavigate, useParams } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ScrollTop from '../Components/ScrollTop';
import useVendor from '../SDCustomHooks/useVendor';
import useFavoritePick from '../SDCustomHooks/useFavoritePick';
import useResponsive from '../SDCustomHooks/useResponsive';

function ShopAppBar(props) {
    let navigate = useNavigate();
    const { vendorId, memberId } = useParams();
    const { vendor, error, loading } = useVendor(vendorId);
    const [open, setOpen] = React.useState(false);
    const { width } = useResponsive();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const { toggleFavorite } = useFavoritePick();
    const [liked, setLiked] = useState(false);

    const handleLike = async () => {
        try {
            await toggleFavorite(vendorId, liked);
            setLiked(!liked);
        } catch (error) {
            console.error("Error toggling favorite:", error);
        }
    };

    const vendorName = vendor?.vendorName || "가게 이름 없음";

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
                        component="div"
                        noWrap
                        sx={{
                            color: 'black',
                            fontSize: '115%',
                            verticalAlign: 'middle',
                            marginTop: 'auto',
                            marginBottom: 'auto',
                        }}
                    >
                        {vendorName} {/* 가게 이름 데이터 */}
                    </Typography>
                    <Box flexGrow={1} />
                    <Box display="flex" alignItems="center" >
                        <Box sx={{
                            height: '50%',
                            width: 'auto',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '1vw'
                        }}>
                            <IconButton
                            edge="end"
                            aria-label="like"
                            onClick={handleLike}
                            sx={{
                                color: liked ? '#FF745A' : 'inherit',
                                height: '100%',
                                width: 'auto',
                            }}
                        >
                            {liked ? <FavoriteIcon /> : <FavoriteBorderIcon sx={{ color: '#FF745A' }} />}
                        </IconButton>
                        </Box>
                        <Box sx={{
                            height: '50%',
                            width: 'auto',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '1vw'
                        }}>
                            <div>
                            <IconButton edge="end" aria-label="share" onClick={handleClickOpen} sx={{
                                marginRight: '0', marginTop: 'auto',
                                marginBottom: 'auto',
                            }}>
                                <ShareIcon />
                            </IconButton>
                            {/* <ShareModal open={open} handleClose={handleClose} /> */}
                            </div>
                        </Box>
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
import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { BsArrowRight } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function LoginSelectionPage() {
    const navigate = useNavigate();
    const [showButtons, setShowButtons] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(null);
    const [initialAnimationDone, setInitialAnimationDone] = useState(false);
    const [isVertical, setIsVertical] = useState(window.innerWidth < window.innerHeight);

    useEffect(() => {
        function handleResize() {
            setIsVertical(window.innerWidth < window.innerHeight);
        }

        const initialTimer = setTimeout(() => {
            setInitialAnimationDone(true);
        }, 1000);

        const buttonTimer = setTimeout(() => {
            setShowButtons(true);
        }, 4000);

        window.addEventListener('resize', handleResize);

        return () => {
            clearTimeout(initialTimer);
            clearTimeout(buttonTimer);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleClick = (route, color) => {
        setButtonClicked(color);
        setTimeout(() => {
            navigate(route);
        }, 1000);
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: isVertical ? 'column' : 'row', 
            height: '100vh',
            overflow: 'hidden',
            position: 'relative',
            background: buttonClicked ? 
                        `radial-gradient(circle at center, ${buttonClicked}, transparent)` : 
                        "transparent"
        }}>
            <motion.div
                initial={{ scale: 0 }}
                animate={initialAnimationDone ? { scale: 1 } : {}}
                transition={{ duration: 1, ease: 'easeOut' }}
                style={{
                    position: 'absolute',
                    top: '20%',
                    left: '20%',
                    width: '50%',
                    height: '50%',
                    backgroundImage: 'url(/images/yongtako.png)',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    zIndex: -1,
                    transform: 'translate(-50%, -50%)',
                }}
            />
            <AnimatePresence>
                {showButtons && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, ease: 'easeIn' }}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            exit={{
                                scale: buttonClicked === '#21BF73' ? 50 : 1,
                                transition: { duration: 1, ease: 'easeIn' },
                            }}
                            style={{
                                flex: 1,
                                backgroundColor: buttonClicked || '#B0EACD',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Button
                                variant="contained"
                                style={{
                                    backgroundColor: '#21BF73',
                                    color: 'white',
                                    borderRadius: '30px',
                                    border: 'none',
                                    fontSize: '120%',
                                    fontWeight: 'bold',
                                }}
                                endIcon={<BsArrowRight />}
                                onClick={() => handleClick('/selllogin', '#21BF73')}
                            >
                                사장님
                            </Button>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, ease: 'easeIn' }}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            exit={{
                                scale: buttonClicked === '#FD5E53' ? 50 : 1,
                                transition: { duration: 1, ease: 'easeIn' },
                            }}
                            style={{
                                flex: 1,
                                backgroundColor: buttonClicked || '#f1eceb',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Button
                                variant="contained"
                                style={{
                                    backgroundColor: '#FD5E53',
                                    color: 'white',
                                    borderRadius: '30px',
                                    border: 'none',
                                    fontSize: '120%',
                                    fontWeight: 'bold',
                                }}
                                endIcon={<BsArrowRight />}
                                onClick={() => handleClick('/login', '#FD5E53')}
                            >
                                손님
                            </Button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

export default LoginSelectionPage;

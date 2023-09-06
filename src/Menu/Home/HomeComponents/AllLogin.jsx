import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';

export default function AllLogin() {
    const [isBusiness, setIsBusiness] = useState(false);

    const handleToggle = () => {
        setIsBusiness(!isBusiness);
    };

    const UserLogin = () => (
        <div style={{ backgroundColor: 'pink', padding: '20px', borderRadius: '5px' }}>
            <h2>사용자 로그인</h2>
            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="아이디"
                InputProps={{
                    style: { borderColor: 'pink' },
                    onFocus: (e) => (e.target.style.borderColor = 'pink'),
                }}
            />
            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                type="password"
                label="비밀번호"
                InputProps={{
                    style: { borderColor: 'pink' },
                    onFocus: (e) => (e.target.style.borderColor = 'pink'),
                }}
            />
            <Button variant="contained" color="primary" style={{ marginTop: '10px' }} onMouseOver={(e) => (e.target.style.backgroundColor = 'darkred')} onMouseOut={(e) => (e.target.style.backgroundColor = '')}>
                로그인
            </Button>
        </div>
    );

    const BusinessLogin = () => (
        <div style={{ backgroundColor: 'limegreen', padding: '20px', borderRadius: '5px' }}>
            <h2>사업자 로그인</h2>
            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="아이디"
                InputProps={{
                    style: { borderColor: 'limegreen' },
                    onFocus: (e) => (e.target.style.borderColor = 'limegreen'),
                }}
            />
            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                type="password"
                label="비밀번호"
                InputProps={{
                    style: { borderColor: 'limegreen' },
                    onFocus: (e) => (e.target.style.borderColor = 'limegreen'),
                }}
            />
            <Button variant="contained" color="primary" style={{ marginTop: '10px' }} onMouseOver={(e) => (e.target.style.backgroundColor = 'darkgreen')} onMouseOut={(e) => (e.target.style.backgroundColor = '')}>
                로그인
            </Button>
        </div>
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '20px' }}>
                <Button variant={isBusiness ? 'outlined' : 'contained'} color="primary" onClick={handleToggle}>
                    사용자
                </Button>
                <Button variant={isBusiness ? 'contained' : 'outlined'} color="primary" onClick={handleToggle}>
                    사업자
                </Button>
            </div>

            <Slide direction={isBusiness ? 'left' : 'right'} in={!isBusiness} mountOnEnter unmountOnExit>
                <div>
                    <UserLogin />
                </div>
            </Slide>

            <Slide direction={isBusiness ? 'right' : 'left'} in={isBusiness} mountOnEnter unmountOnExit>
                <div>
                    <BusinessLogin />
                </div>
            </Slide>
        </div>
    );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../../Layout/Footer.jsx';
import Header from '../../../Layout/Header.jsx';
import './WaitingDetail.css';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

function WaitingDetail() {
    const navigate = useNavigate();
    const [count, setCount] = useState(0);
    const [screenState, setScreenState] = useState('initial'); // 다음버튼 누르기전 화면

    const handleNavigateToHome = () => {
        console.log("Navigating to home...");
        navigate("/home");
    }

    const handleNextClick = () => {
        if (screenState === 'initial') {
            setScreenState('next');
        } else if (screenState === 'next') {
            setScreenState('submitted');
        }
    }

    return (
        <div className='App-main2'>
            {screenState !== 'submitted' && <Header page="waitingDetail" />}

            <div className='waiting-detail-container'>
                {screenState === 'initial' ? (
                    <div className='number-count-container'>
                        <div className="left-text">인원 수</div>
                        <div className="right-buttons">
                            <AddCircleOutlineIcon className="plus-button" onClick={() => setCount(prev => prev + 1)} />
                            <span className="count-text">{count}</span>
                            <RemoveCircleOutlineIcon className="minus-button" onClick={() => setCount(prev => Math.max(prev - 1, 0))} />
                        </div>
                    </div>
                ) : screenState === 'next' ? (
                    <div className='people-count-container'>
                        <p>현재 팀 대기중</p>
                        <div className="info-box">
                            <div className="info-item">
                                <span className="label">매장명</span>
                                <span className="value">떡볶이집</span>
                            </div>
                            <div className="info-item">
                                <span className="label">인원</span>
                                <span className="value">{count}명</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h2>신청 완료</h2>
                        <p>떡볶이집에 대기 신청이 완료되었습니다. 확인 버튼을 눌러 대기 상황을 확인하세요.</p>
                    </div>
                )}
            </div>

            <Footer
                type={screenState}
                handleNextClick={handleNextClick}
                handleNavigateToHome={handleNavigateToHome}
            />
        </div>
    );
}

export default WaitingDetail;

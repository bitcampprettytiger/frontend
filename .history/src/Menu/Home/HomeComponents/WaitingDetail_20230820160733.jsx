import React, { useState } from 'react';
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
import Header from '../../../Layout/Header.jsx';
import Footer from '../../../Layout/Footer.jsx';
=======
import Header from '../../../Layout/Header.jsx';
import Header from '../../../Layout/Footer.jsx';
>>>>>>> eb9913a7fd4e91db25de283ac5a09ad6a517be01
import './WaitingDetail.css';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

function WaitingDetail() {
<<<<<<< HEAD
    const navigate = useNavigate();
    const [count, setCount] = useState(0);
    const [screenState, setScreenState] = useState('initial'); // 다음버튼 누르기전 화면

    const handleNavigateToHome = () => {
        console.log("Navigating to home...");
        navigate("/home");
    }

=======

    const [count, setCount] = useState(0);
    const [screenState, setScreenState] = useState('initial'); // 다음버튼 누르기전 화면

    // 다음버튼 클릭시 변경함수
>>>>>>> eb9913a7fd4e91db25de283ac5a09ad6a517be01
    const handleNextClick = () => {
        if (screenState === 'initial') {
            setScreenState('next');
        } else if (screenState === 'next') {
            setScreenState('submitted');
        }
    }

    const renderWaitingDetailFooter = () => {
        if (screenState === 'submitted') {
            return (
                <footer className="App-footer">
<<<<<<< HEAD
                    <button className="text-button" onClick={handleNavigateToHome}>닫기</button>
=======
                    <button className="text-button" onClick={() => {/* TODO: 닫기 기능 구현 */ }}>닫기</button>
>>>>>>> eb9913a7fd4e91db25de283ac5a09ad6a517be01
                    <button className="text-button" onClick={() => {/* TODO: 취소하기 기능 구현 */ }}>취소하기</button>
                </footer>
            );
        }
        return (
            <footer className="App-footer">
                <button className="text-button" onClick={handleNextClick}>
                    {screenState === 'initial' ? '다음' : '신청하기'}
                </button>
            </footer>
<<<<<<< HEAD
        );
=======
        )
>>>>>>> eb9913a7fd4e91db25de283ac5a09ad6a517be01
    }

    return (
        <div>
            <div className='App-main2'>
                {screenState !== 'submitted' && <Header page="waitingDetail" />}

                <div className='waiting-detail-container'>
                    {screenState === 'initial' ? (
<<<<<<< HEAD
=======
                        // 인원 수 선택 화면
>>>>>>> eb9913a7fd4e91db25de283ac5a09ad6a517be01
                        <div className='number-count-container'>
                            <div className="left-text">인원 수</div>
                            <div className="right-buttons">
                                <AddCircleOutlineIcon className="plus-button" onClick={() => setCount(prev => prev + 1)} />
                                <span className="count-text">{count}</span>
                                <RemoveCircleOutlineIcon className="minus-button" onClick={() => setCount(prev => Math.max(prev - 1, 0))} />
                            </div>
                        </div>
                    ) : screenState === 'next' ? (
<<<<<<< HEAD
=======
                        // '다음'을 클릭한 후의 화면 내용
>>>>>>> eb9913a7fd4e91db25de283ac5a09ad6a517be01
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
<<<<<<< HEAD
                        <div>
                            <h2>신청 완료</h2>
                            <p>떡볶이집에 대기 신청이 완료되었습니다. 확인 버튼을 눌러 대기 상황을 확인하세요.</p>
                        </div>
                    )}
                </div>
                <Footer type={screenState === 'initial' ? 'waitingDetail' : screenState === 'next' ? 'submitting' : 'submitted'} handleNextClick={handleNextClick}></Footer>
=======
                        // '신청하기'를 클릭한 후의 화면 내용
                        <div>
                            <h2>신청 완료</h2>
                            <p>떡볶이집에 대기 신청이 완료되었습니다. 확인 버튼을 눌러 대기 상황을 확인하세요.</p>
                            {/* 원하는 추가 내용을 여기에 넣을 수 있습니다. */}
                        </div>
                    )}
                </div>
                {/* {renderWaitingDetailFooter()} */}
                {/* <Footer type='waitingDetail' handleNextClick={handleNextClick}></Footer> */}


                {/* <Footer type={screenState} handleNextClick={handleNextClick}></Footer> */}
                <Footer type={screenState === 'initial' ? 'waitingDetail' : screenState === 'next' ? 'submitting' : 'submitted'} handleNextClick={handleNextClick}></Footer>


>>>>>>> eb9913a7fd4e91db25de283ac5a09ad6a517be01
            </div>
        </div>
    )
}

export default WaitingDetail;
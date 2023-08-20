import React from 'react';
import './SellSignUp.css';
import { Link } from 'react-router-dom';
// import Header from '../../Layout/Header';
// import Footer from '../../Layout/Footer';

function SellSignup() {
  return (
    <div className='sellSignUp'>
        <div className='JoinBody1'>
            <div className='content1'>
              <h2>Welcome,</h2>
              <h3>만나서 반가워요!</h3>
              <p>처음에 입력해야 할 정보가 많아요 :)</p>
              <br></br>
              <p>사업자 등록번호와 <br></br> 도로점유허가번호가 필요해요.</p>
            </div>
            <Link to='/SellSignUp2'>
            <div>
              <button className='startBtn'>시작하기</button>
            </div>
            </Link>
        </div>
    </div>
  )
}

export default SellSignup
import React from 'react';
import './SellJoin.css';
import { Link } from 'react-router-dom';
// import Header from '../../Layout/Header';
// import Footer from '../../Layout/Footer';

function SellJoin() {
  return (
    <div className='sellJoin'>
        <div className='JoinBox'>
            <div className='content1'>
              <h2>Welcome,</h2>
              <h3>사장님 어서오세요!</h3>
            </div>
            <div className='SellLoginBox'>
          <form>
            <div className='loginFormField'>
              <label htmlFor='username'>아이디</label>
              <input type='text' id='username' placeholder='아이디' />
            </div>
            <div className='loginFormField'>
              <label htmlFor='password'>비밀번호</label>
              <input type='password' id='password' placeholder='비밀번호' />
            </div>
            <button className='loginBtn'>로그인</button>
          </form>
        </div>
        <div className='toJoin'>
            <p>아직 회원이 아니신가요?</p>
            <Link to='/SellSignUp'>
            <button className='goJoinForm'>회원가입</button>
            </Link>
        </div>
      </div>
    </div>
  )
}

export default SellJoin
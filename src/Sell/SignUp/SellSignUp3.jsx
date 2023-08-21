import React from 'react'
import './SellSignUp3.css'
import { Link } from 'react-router-dom';

const SellSignUp3 = () => {
  return (
    <div className='SellSignUp3'>
        <div className='JoinBody3'>
        <div className='stepContainer'>
            <div className='step'>
                <div className='circle'>
                <span className='stepText'>사업자/도로점유허가 조회</span>
                </div>
            </div>
            <div className='arrow'></div>
            <div className='step'>
                <div className='circle'>
                <span className='stepText'><strong>회원가입</strong></span>
                </div>
            </div>
            <div className='arrow' id='pointArrow'></div>
            <div className='step'>
                <div className='circle'>
                <span className='stepText'>상점상세등록</span>
                </div>
            </div>
        </div>

            <div className='JoinForm'>
                <form>
                <div className='FormField'>
                    <label htmlFor='username'>아이디</label>
                    <input type='text' id='username' placeholder='아이디' />
                </div>
                <div className='FormField'>
                    <label htmlFor='password'>비밀번호</label>
                    <input type='password' id='password' placeholder='비밀번호' />
                </div>
                <div className='FormField'>
                    <label htmlFor='confirmPassword'>비밀번호 확인</label>
                    <input type='password' id='confirmPassword' placeholder='비밀번호 확인' />
                </div>
                <div className='FormField'>
                    <label htmlFor='storeAddress'>가게 주소</label>
                    <input type='text' id='storeAddress' placeholder='가게 주소' />
                </div>
                <div className='FormField'>
                    <label htmlFor='phoneNumber'>전화번호</label>
                    <input type='tel' id='phoneNumber' placeholder='전화번호' />
                </div>
                <div className='FormField'>
                    <label htmlFor='roadOccuNumber'>도로점유증번호</label>
                    <input type='text' id='roadOccuNumber' placeholder='도로점유증번호' />
                </div>
                <div className='FormField'>
                    <label htmlFor='businessNumber'>사업자번호</label>
                    <input type='text' id='businessNumber' placeholder='사업자번호' />
                </div>
                <Link to='/SellSignUp4'>
                    <button className='registerBtn'>다음</button>
                </Link>
                </form>
            </div>
        </div>
    </div>
  )
}

export default SellSignUp3
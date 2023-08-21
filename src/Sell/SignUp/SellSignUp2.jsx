import React from 'react'
import './SellSignUp2.css';
import { Link } from 'react-router-dom';

function SellSignUp2() {
  return (
    <div className='SellSignUp2'>
        <div className='JoinBody2'>
            <div className='stepContainer'>
                <div className='step'>
                    <div className='circle'>
                    <span className='stepText'><strong>사업자/도로점유허가 조회</strong></span>
                    </div>
                </div>
                <div className='arrow' id='pointArrow'></div>
                <div className='step'>
                    <div className='circle'>
                    <span className='stepText'>회원가입</span>
                    </div>
                </div>
                <div className='arrow'></div>
                <div className='step'>
                    <div className='circle'>
                    <span className='stepText'>상점상세등록</span>
                    </div>
                </div>
            </div>
            <div className='CheckForm'>
                <div className='BuisnessNum'>
                    <div className='FormField'>
                        <label htmlFor='businessNumber'>사업자 등록번호</label>
                        <input type='text' id='bNo' placeholder='사업자 등록번호'/>
                    </div>
                </div>
                <div className='BuisnessNum'>
                    <div className='FormField'>
                        <label htmlFor='businessStartDt'>개업일</label>
                        <input type='text' id='startDt' placeholder='개업일'/>
                    </div>
                    <div className='FormField'>
                        <label htmlFor='businessPNm'>사업자명</label>
                        <input type='text' id='pNm' placeholder='실제 사업자명'/>
                    </div>
                </div>
                <button className='BuisnessformCheck'>확인</button>
        
                <div className='roadOccuNum'>
                        <div className='FormField'>
                            <label htmlFor="roadOccuNumber">도로점유허가번호</label>
                            <input type='text' id='perNo' placeholder='도로점유허가번호'/>
                        </div>
                    </div>
                    <button className='roadOcuuformCheck'>확인</button>
                
            <Link to='/SellSignUp3'>
            <div>
              <button className='nextBtn'>다음</button>
            </div>
            </Link>
            </div>
        </div>
    </div>
  )
}

export default SellSignUp2
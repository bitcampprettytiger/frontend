import React from 'react'
import './SellSignUp4.css'

function SellSignUp4() {
  return (
    <div className='SellSignUp4'>
        <div className='JoinBody4'>
          <div className='stepContainer'>
              <div className='step'>
                  <div className='circle'>
                  <span className='stepText'>사업자/도로점유허가 조회</span>
                  </div>
              </div>
              <div className='arrow'></div>
              <div className='step'>
                  <div className='circle'>
                  <span className='stepText'>회원가입</span>
                  </div>
              </div>
              <div className='arrow'></div>
              <div className='step'>
                  <div className='circle'>
                  <span className='stepText'><strong>상점상세등록</strong></span>
                  </div>
              </div>
          </div>

          <div className='SignUpDetails'>
          <form>
            <div className='FormField'>
            <label htmlFor='storeType'>가게구분</label>
              <select id='storeType'>
                <option value='none'>가게 구분 선택</option>
                <option value='streetVendor'>노점</option>
                <option value='foodTruck'>푸드트럭</option>
                <option value='streetFood'>길거리</option>
              </select>
            </div>
            <div className='FormField'>
              <label htmlFor='mainMenu'>대표메뉴</label>
              <input type='text' id='mainMenu' placeholder='대표메뉴' />
            </div>
            <div className='FormField'>
              <label htmlFor='storeName'>가게이름</label>
              <input type='text' id='storeName' placeholder='가게이름' />
            </div>
            <div className='BuisnessNum'>
              <div className='FormField'>
                <label htmlFor='phoneNumber1'>전화번호1</label>
                <input type='tel' id='phoneNumber1' placeholder='전화번호1' />
              </div>
              <div className='FormField'>
                <label htmlFor='phoneNumber2'>전화번호2</label>
                <input type='tel' id='phoneNumber2' placeholder='전화번호2' />
              </div>
            </div>
            <div className='FormField'>
              <label htmlFor='storePhoto'>가게사진</label>
              <input type='file' id='storePhoto' />
            </div>
              <button className='SignUpBtn'>등록하기</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SellSignUp4
import React from 'react';
import { useLocation } from 'react-router-dom';

const RequestPay = () => {
  const location = useLocation();
  const totalAmount = location.state?.totalAmount;
  const orderMenus = location.state?.orderedMenus;

    IMP.request_pay({
      pg: "html5_inicis",
      pay_method: "card",
      merchant_uid: "ORD20180131-0000011",
      name: "노르웨이 회전 의자",
      amount: 64900,
      buyer_email: "gildong@gmail.com",
      buyer_name: "홍길동",
      buyer_tel: "010-4242-4242",
      buyer_addr: "서울특별시 강남구 신사동",
      buyer_postcode: "01181"
    }, rsp => {
      if (rsp.success) {
        alert('결제가 성공적으로 완료되었습니다.');
      } else {
        alert(`결제 실패: ${rsp.error_msg}`);
      }
    });
  }


export default RequestPay;

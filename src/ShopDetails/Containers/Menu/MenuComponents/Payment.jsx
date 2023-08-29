import React from "react";
import { Button } from "@mui/material";

const Payment= () => {
    const onClickPayment = () => {
        const { IMP } = window;
        IMP.init('imp45381601'); 
      
          const data = {
            pg: 'html5_inicis',
            pay_method : 'card',
            murchant_uid: "A0"+ new Date().getTime(),
            amount: getTotalPrice(),
            name: "주식회사 먹자취",
            m_redirect_url : '/Paid'
          };
          IMP.request_pay(data, callback);
        
        };
    
        const callback = (rsp) => {
          const {scuccess, error_msg} = rsp;
      
          if (rsp.success) {
            alert('결제가 성공적으로 완료되었습니다.');
          } else {
            alert(`결제 실패: ${rsp.error_msg}`);
          }
        }

    return (
        <Button
            onClick={onClickPayment}
          sx={{
            backgroundColor: '#FF745A',
            width: '70vw',
            height: '10%',
            color: 'white',
            fontSize: '110%',
            position: 'relative',
            marginBottom: '16px',
          }}
        >
          결제하기
        </Button>
    )
}

export default Payment;
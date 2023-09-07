import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const KakaoLogin = () => {
  const navi = useNavigate();
  const grant_type = 'authorization_code';
  const client_id = '88c6a288697fac101a89f4f639c56f15';
  const REDIRECT_URL = `http://localhost:3000/auth`;
  const [code, setCode] = useState(
    new URL(window.location.href).searchParams.get('code')
  );
  useEffect(() => {
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaa',code);
    axios
      .post(
        `https://kauth.kakao.com/oauth/token`,
        {
          grant_type: `${grant_type}`,
          client_id: `${client_id}`,
          redirect_uri: `${REDIRECT_URL}`,
          code: `${code}`,
        },

        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        }
      )
      .then((res) => {
        console.log('bbbbbbbbbbbbbbbbbbbbbbb',res);
        const { data } = res;
        const { access_token } = data;
        if (access_token) {
          console.log(`Bearer ${access_token}`);
          axios
            .post(
              `https://kapi.kakao.com/v2/user/me`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${access_token}`,
                  'Content-Type':
                    'application/x-www-form-urlencoded;charset=utf-8',
                },
              }
            )

            .then((res) => {
              console.log('데이터 성공 :');
              console.log(res);
              const currentDate = new Date();
              const currentYear = currentDate.getFullYear();
              const ageRange = res.data.kakao_account.age_range;
            });
        } else {
          console.log('없어!');
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [code]);

  return <></>;
};

export default KakaoLogin;

import axios from 'axios';
const SellUpAPI = async (username, password, tel, privacy) => {
  console.log('엑시오수', privacy);
  try {
    // JSON 객체를 생성합니다.
    const data = {
      username: username,
      password: password,
      tel: tel,
      privacy: privacy,
    };

    // Axios 요청에서 'Content-Type': 'application/json' 헤더를 사용합니다.
<<<<<<< HEAD
    const response = await axios.post('http://192.168.0.240:1004/vendor/join', data, {
=======
    const response = await axios.post('https://mukjachi.site:6443/vendor/join', data, {
>>>>>>> dfbbd0f7aed48255a114d10846631cf192d41633
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      alert('성공');
      return '회원가입 성공!';
    } else {
      return '회원가입 실패, 다시 시도해 주세요.';
    }
  } catch (err) {
    console.error(err);
    return '회원가입 중 오류가 발생했습니다.';
  }
};

export default SellUpAPI;
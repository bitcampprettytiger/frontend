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
    console.log('asdasdasasdas',data)
    // Axios 요청에서 'Content-Type': 'application/json' 헤더를 사용합니다.
    const response = await axios.post('https://mukjachi.site:6443/vendor/join', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
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
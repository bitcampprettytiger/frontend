import axios from 'axios';
const registerUser = async (username, password) => {
  try {
    // JSON 객체를 생성합니다.
    const data = {
      username: username,
      password: password,
    };

    // Axios 요청에서 'Content-Type': 'application/json' 헤더를 사용합니다.
    const response = await axios.post(
      'http://27.96.135.75/member/join',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

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

export default registerUser;

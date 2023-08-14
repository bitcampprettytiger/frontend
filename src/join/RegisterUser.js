import axios from 'axios';

const registerUser = async (username, password) => {
  try {
    // FormData 객체를 생성하고 필드를 추가합니다.
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    // Axios 요청에서 'Content-Type': 'multipart/form-data' 헤더를 사용합니다.
    const response = await axios.post('http://101.101.210.23:80/member/join', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    if (response.status === 200) {
      alert('성공')
      return '회원가입 성공!';

    } else {
      return '회원가입 실패, 다시 시도해 주세요.';
    }
  } catch (err) {
    console.error(err.response);
    return '회원가입 중 오류가 발생했습니다.';
  }
};

export default registerUser;

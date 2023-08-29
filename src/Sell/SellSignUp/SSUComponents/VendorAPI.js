import axios from 'axios';
const VendorAPI = async (
  vendorType,
  vendorName,
  SIGMenu,
  address,
  tel,
  businessDay,
  open,
  close,
  file // 파일을 인자로 받음
) => {
  try {
    const selectedDays = Object.entries(businessDay)
      .filter(([, checked]) => checked)
      .map(([day]) => day)
      .join(',');

    // JSON 객체를 생성합니다.
    const formData = new FormData();
    formData.append('vendorType', vendorType);
    formData.append('vendorName', vendorName);
    formData.append('SIGMenu', SIGMenu);
    formData.append('address', address);
    formData.append('tel', tel);
    formData.append('businessDay', selectedDays);
    formData.append('open', open);
    formData.append('close', close);
    if (file) {
      formData.append('file', file);
    }
    // Axios 요청에서 'Content-Type': 'application/json' 헤더를 사용합니다.
    const response = await axios.post(
      'http://27.96.135.75/vendor/info',
      formData, // FormData 사용
      {
        headers: {
          'Content-Type': 'multipart/form-data', // 헤더 수정
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

export default VendorAPI;

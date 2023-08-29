import axios from 'axios';
const VendorAPI = async (
  vendorType,
  vendorName,
  SIGMenu,
  address,
  tel,
  businessDay,
  open, // businessHours.시작
  close // businessHours.마감
) => {
  try {
    const selectedDays = Object.entries(businessDay)
      .filter(([, checked]) => checked)
      .map(([day]) => day)
      .join(',');

    // JSON 객체를 생성합니다.
    const data = {
      vendorType: vendorType,
      vendorName: vendorName, // 여기에 가게이름 값을 삽입
      businessDay: selectedDays,
      SIGMenu: SIGMenu, // 여기에 대표메뉴 값을 삽입
      address: address, // 여기에 주소 값을 삽입
      tel: tel, // 여기에 전화번호 값을 삽입
      open: JSON.stringify(open), // 영업 시작 시간
      close: close, // 영업 마감 시간 시간을 가져옵니다.

    };
    // Axios 요청에서 'Content-Type': 'application/json' 헤더를 사용합니다.
    const response = await axios.post('http://27.96.135.75/vendor/info', data, {
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

export default VendorAPI;

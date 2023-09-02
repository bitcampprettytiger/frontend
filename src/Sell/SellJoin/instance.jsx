import axios from 'axios';

// 인스턴스 생성
const instance = axios.create({
  baseURL: 'http://192.168.0.240',
});
console.log(instance.interceptors.response);

// 응답 인터셉터 설정
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(instance.interceptors);
    const originalRequest = error.config;
    console.log(error);
    // 에러가 401이고, 이미 재요청한 것이 아닌 경우
    if (error.response.status === 401 && !originalRequest._retry) {
      console.log('엑세스 토큰 만료, 리프레시 토큰 사용');
      originalRequest._retry = true;

      // 리프레시 토큰 가져오기
      const refreshToken = localStorage.getItem('refreshToken');

      // 새 엑세스 토큰 발급받기 (서버에서 리프레쉬 토큰을 사용해 엑세스 토큰을 발급하는 엔드포인트 필요)
      const { data } = await instance.post('/member/board', { refreshToken });

      // 새 엑세스 토큰 저장
      localStorage.setItem('accessToken', data.accessToken);

      // 헤더에 새 엑세스 토큰 설정
      originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;

      // 원래 요청 다시 실행
      return instance.request(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default instance;
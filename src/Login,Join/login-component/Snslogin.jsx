import { GoogleLoginButton } from 'react-social-login-buttons';
import { AppleLoginButton } from 'react-social-login-buttons';

const SnsLogin = () => (
  <div>
    <div className="sns-title">SNS 로그인</div>
    <div className="sns-line"></div>
    <div className="sns-fun">
      <div className="kakao">
        <img src="./images/kakao_login_medium_wide"></img>
      </div>
      <div className="google">
      </div>
      <div className="apple">
      </div>
    </div>
  </div>
);
export default SnsLogin;

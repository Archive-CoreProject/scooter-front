import React from 'react';
import '../style/Signup.css'; // CSS 파일 경로 확인

const SignupPage = () => {
  return (
    <div className="signup-container">
      <h2 className="signup-title">회원가입</h2>
      <form className="signup-form">
        <div className="id-field">
          <input type="text" placeholder="아이디" className="input-field" />
          <button type="button" className="check-id-button">중복 확인</button> {/* 아이디 중복 확인 버튼 */}
        </div>
        <input type="text" placeholder="사용자 이름" className="input-field" />
        <input type="email" placeholder="이메일" className="input-field" />
        <input type="number" placeholder="나이" className="input-field" />
        <input type="password" placeholder="비밀번호" className="input-field" />
        <input type="password" placeholder="비밀번호 확인" className="input-field" />
        <button type="submit" className="signup-button">가입하기</button>
      </form>
      <p className="login-prompt">이미 계정이 있으신가요? <a href="/login" className="login-link">로그인</a></p>
    </div>
  );
};

export default SignupPage;


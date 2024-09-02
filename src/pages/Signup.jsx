import React, { useState } from 'react';
import '../style/Signup.css'; 

const SignupPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // 폼 제출 핸들러
  const handleSubmit = (event) => {
    event.preventDefault();

    // 비밀번호와 비밀번호 확인이 일치하는지 검증
    if (password !== confirmPassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 비밀번호가 일치하면 성공 메시지 표시 (추가 로직 작성 가능)
    setErrorMessage('');
    alert('회원가입이 완료되었습니다.');
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">회원가입</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="id-field">
          <input type="text" placeholder="아이디" className="input-field" />
          <button type="button" className="check-id-button">중복 확인</button> {/* 아이디 중복 확인 버튼 */}
        </div>
        <input type="text" placeholder="사용자 이름" className="input-field" />
        <input type="email" placeholder="이메일" className="input-field" />
        <input type="number" placeholder="나이" className="input-field" />
        <input
          type="password"
          placeholder="비밀번호"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          className="input-field"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="signup-button">가입하기</button>
      </form>
      <p className="login-prompt">이미 계정이 있으신가요? <a href="/login" className="login-link">로그인</a></p>
    </div>
  );
};

export default SignupPage;



import React, { useState } from 'react';
import '../style/Signup.css'; 

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const usernameRegex = /^[a-zA-Z0-9]{6,}$/;
    if (!usernameRegex.test(username)) {
      setErrorMessage('아이디는 영문과 숫자로 구성된 6자 이상이어야 합니다.');
      return;
    }

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage('비밀번호는 영문과 숫자로 구성된 8자 이상이어야 합니다.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    setErrorMessage('');
    alert('회원가입이 완료되었습니다.');
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">회원가입</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="id-field">
          <input
            type="text"
            placeholder="아이디(영문,숫자 6자 이상)"
            className="input-field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <button type="button" className="check-id-button">중복 확인</button> {/* 아이디 중복 확인 버튼 */}
        </div>
        <input type="text" placeholder="사용자 이름" className="input-field" />
        <input type="phone" placeholder="전화번호" className="input-field" />
        <input type="number" placeholder="나이" className="input-field" />
        <input
          type="password"
          placeholder="비밀번호 (영문,숫자 8자 이상)"
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
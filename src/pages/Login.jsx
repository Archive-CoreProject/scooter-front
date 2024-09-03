import React, { useState } from 'react';
import '../style/Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      setError('비밀번호는 최소 8자 이상이어야 합니다.');
      return;
    }

    try {
      setError(''); 

      const response = await axios.post('https://port-0-scooter-back-lzahw55k260a832a.sel4.cloudtype.app/user/login', {
        userId:username,
        userPw:password,
      });

      if (response.status === 200) {
        
        console.log( response.data.token);
        navigate('/'); 
      }
    } catch (error) {
      
      console.error('로그인 실패:', error.response ? error.response.data : error.message);
      setError('로그인에 실패했습니다. 아이디와 비밀번호를 확인하세요.'); // 오류 메시지 설정
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">🛴Login</h2>
      <br />
      <br />
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="아이디"
          className="input-field"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호(8자 이상)"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error-message">{error}</p>} 
        <br />
        <button type="submit" className="login-button">로그인</button>
      </form>
      <p className="forgot-password">
        <br />
        <br />
        <br />
        <a href="/forgot-password" className="link">비밀번호를 잊으셨나요?</a>
      </p>
      <div className="divider"></div>
      <p className="signup-prompt">
        계정이 없으신가요? <a href="/signup" className="link">가입하기</a>
      </p>
    </div>
  );
};

export default LoginPage;

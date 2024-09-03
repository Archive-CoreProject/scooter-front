import { useState } from "react";
import axios from "axios";
import "../style/Signup.css";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [birth, setBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isUserIdAvailable, setIsUserIdAvailable] = useState(null); // 아이디 중복 확인 상태

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    // 유효성 검사
    const usernameRegex = /^[a-zA-Z0-9]{6,}$/;
    if (!usernameRegex.test(userId)) {
      setErrorMessage("아이디는 영문과 숫자로 구성된 6자 이상이어야 합니다.");
      return;
    }

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordRegex.test(userPw)) {
      setErrorMessage("비밀번호는 영문과 숫자로 구성된 8자 이상이어야 합니다.");
      return;
    }

    if (userPw !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!isUserIdAvailable) {
      setErrorMessage("아이디 중복 확인을 해주세요.");
      return;
    }

    try {
      setErrorMessage("");
      setSuccessMessage("");

      // 회원가입 요청
      await axios
        .post("http://192.168.219.59:3000/user/signup", {
          userId,
          userPw,
          userName,
          birth,
          phone,
        })
        .then(() => {
          navigate("/login");
          setSuccessMessage("회원가입에 성공했습니다! 로그인 페이지로 이동하세요.");
        });
    } catch {
      setErrorMessage("회원가입에 실패했습니다.");
    }
  };

  // 아이디 중복 확인 함수
  const handleCheckUserId = async () => {
    // const response = await axios.post("https://port-0-scooter-back-lzahw55k260a832a.sel4.cloudtype.app/user/checkid", {
    //   userId,
    // });
    console.log(userId);
    await axios
      .post("http://192.168.219.59:3000/user/checkid", {
        userId,
      })
      .then(() => {
        setIsUserIdAvailable(true);
        setErrorMessage("");
        alert("사용 가능한 아이디입니다.");
      })
      .catch((err) => {
        const status = err.response.status;
        if (status === 409) {
          setIsUserIdAvailable(false);
          setErrorMessage("이미 사용중인 아이디 입니다.");
        } else {
          setIsUserIdAvailable(false);
          setErrorMessage("오류가 발생했습니다. 다시 시도해주세요.");
        }
      });
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">회원가입</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            placeholder="아이디(영문,숫자 6자 이상)"
            className="input-field"
            value={userId}
            onChange={(e) => {
              setUserId(e.target.value);
              setIsUserIdAvailable(null); // 아이디 변경 시 중복 확인 상태 초기화
            }}
            required
          />
          <button type="button" className="check-id-button" onClick={handleCheckUserId}>
            중복 <br />
            확인
          </button>
        </div>
        <input
          type="password"
          placeholder="비밀번호 (영문,숫자 8자 이상)"
          className="input-field"
          value={userPw}
          onChange={(e) => setUserPw(e.target.value)}
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
        <input
          type="text"
          placeholder="사용자 이름"
          className="input-field"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <input
          type="date"
          className="input-field"
          value={birth}
          onChange={(e) => setBirth(e.target.value)}
          max="9999-12-31"
          required
        />
        <input
          type="text"
          placeholder="전화번호 (예: 010-1234-5678)"
          className="input-field"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button type="submit" className="signup-button">
          가입하기
        </button>
      </form>
      <p className="login-prompt">
        이미 계정이 있으신가요?{" "}
        <a href="/login" className="login-link">
          로그인
        </a>
      </p>
    </div>
  );
};

export default SignupPage;

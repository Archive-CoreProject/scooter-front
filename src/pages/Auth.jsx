import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../cookie";
import "../style/auth.css";

const Auth = () => {
  const navigate = useNavigate();
  const [scooterIdxInput, setScooterIdxInput] = useState("");
  const [authCodeInput, setAuthCodeInput] = useState("");
  const [isCodeGenerated, setIsCodeGenerated] = useState(false);

  const createAuthCode = async () => {
    await axios({
      method: "POST",
      url: "http://192.168.219.59:3000/board/generate-code",
      data: { scooterIdx: scooterIdxInput },
      headers: {
        Authorization: getCookie("token"),
      },
    })
      .then(() => {
        setIsCodeGenerated(true);
      })
      .catch((err) => {
        console.log(err);
        alert("킥보드 고유값이 잘못되었습니다.");
        setIsCodeGenerated(false);
      });
  };

  const verifyAuthCode = async () => {
    await axios({
      method: "POST",
      url: "http://192.168.219.59:3000/board/check-code",
      data: { scooterIdx: scooterIdxInput, code: authCodeInput },
      headers: {
        Authorization: getCookie("token"),
      },
    })
      .then((res) => {
        if (res.status === 200) {
          alert("킥보드 연결 인증 성공!");
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
        setIsCodeGenerated(false);
      });
  };

  return (
    <>
      <div>
        <button
          onClick={() => {
            navigate("/");
          }}
          style={{ position: "absolute", top: "1rem", left: "1rem", width: "5rem" }}
        >
          뒤로
        </button>
        {!isCodeGenerated && (
          <>
            <h2>사용할 킥보드 고유번호 입력</h2>
            <input
              type="number"
              maxLength={4}
              placeholder="킥보드 고유값"
              onChange={(e) => {
                setScooterIdxInput(e.target.value);
              }}
            />
            <button onClick={createAuthCode}>인증번호 요청</button>
          </>
        )}
        {isCodeGenerated && (
          <>
            <h2 style={{ textAlign: "left" }}>
              킥보드에 표시되는
              <br />
              4자리 인증번호를 입력해주세요!
            </h2>
            <input
              type="number"
              placeholder="4자리(0000)"
              onChange={(e) => {
                setAuthCodeInput(e.target.value);
              }}
            />
            <button onClick={verifyAuthCode}>인증</button>
          </>
        )}
      </div>
    </>
  );
};

export default Auth;

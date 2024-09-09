import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie, setCookie } from "../cookie";
import "../style/auth.css";
import { SyncLoader } from "react-spinners";

const Auth = () => {
  const navigate = useNavigate();
  const [scooterIdxInput, setScooterIdxInput] = useState("");
  const [authCodeInput, setAuthCodeInput] = useState("");
  const [isCodeGenerated, setIsCodeGenerated] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
        setErrorText("");
        setCookie("scooterIdx", scooterIdxInput);
      })
      .catch((err) => {
        console.log(err);
        setErrorText("킥보드 고유값이 잘못되었습니다.");
        setIsCodeGenerated(false);
      });
  };

  const verifyAuthCode = async () => {
    setIsLoading(true);
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
          setIsConnected(true);
          setIsLoading(true);
          setErrorText("");
          alert("킥보드 연결 인증 성공!");
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorText(err.response.data.message);
        setIsLoading(false);
        setIsCodeGenerated(false);
      });
  };

  const disconnectScooter = async () => {
    await axios({
      method: "POST",
      url: `http://192.168.219.59:3000/board/finish`,
      data: { scooterIdx: getCookie("scooterIdx") },
      headers: {
        Authorization: getCookie("token"),
      },
    })
      .then(() => {
        setIsConnected(false);
        alert("정상적으로 반납되었습니다. 이용해주셔서 감사합니다!");
        navigate("/");
      })
      .catch((err) => {
        setErrorText(err.response.data.message);
        console.log(err.response.status);
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
              className="auth-input"
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
        {isCodeGenerated && !isConnected && (
          <>
            <h2 style={{ textAlign: "left" }}>
              킥보드에 표시되는
              <br />
              4자리 인증번호를 입력해주세요
            </h2>
            <input
              className="auth-input"
              type="number"
              placeholder="4자리(0000)"
              onChange={(e) => {
                setAuthCodeInput(e.target.value);
              }}
            />
            {isLoading ? (
              <SyncLoader color="rgb(122,111,98)" size={10} speedMultiplier="0.5" />
            ) : (
              <button onClick={verifyAuthCode}>인증</button>
            )}
          </>
        )}
        {isConnected && (
          <>
            <h1>🛴킥보드 이용중</h1>
            <h3>헬멧을 보관함에 넣어야 사용이 종료돼요!</h3>
            <button
              onClick={() => {
                disconnectScooter();
              }}
            >
              사용 종료
            </button>
          </>
        )}
        <h3 style={{ color: "tomato" }}>{errorText}</h3>
      </div>
    </>
  );
};

export default Auth;

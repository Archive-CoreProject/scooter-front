import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie, setCookie } from "../cookie";
import "../style/auth.css";
import { SyncLoader } from "react-spinners";
import * as PortOne from "@portone/browser-sdk/v2";

const Auth = () => {
  const navigate = useNavigate();
  const [scooterIdxInput, setScooterIdxInput] = useState("");
  const [authCodeInput, setAuthCodeInput] = useState("");
  const [isCodeGenerated, setIsCodeGenerated] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const ratePerMinute = 150; // 분당 요금

  const updateTimeOnly = () => {
    const date = new Date();
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Seoul", // 한국 시간대
    };
    const formatter = new Intl.DateTimeFormat("ko-KR", options);
    const formattedTime = formatter.format(date);
    return formattedTime;
  };

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
          setIsRunning(true);
          setIsLoading(true);
          setStartTime(updateTimeOnly());
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

  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const disconnectScooter = async () => {
    // tb_rental에 넣어야 할 값

    // scooterIdx
    // rental_dt
    // rental_st_tm
    // rental_rt_tm
    // pay_method - 카카오페이
    // paid_amount
    // paid_status
    const minutes = Math.ceil(seconds / 60); // 올림을 적용하여 분당 요금 부과
    const result = minutes * ratePerMinute;
    await axios({
      method: "POST",
      url: `http://192.168.219.59:3000/board/finish`,
      data: {
        scooterIdx: getCookie("scooterIdx"),
        rentalDt: getCurrentDate(),
        rentalStTm: startTime,
        rentalRtTm: updateTimeOnly(),
        payMethod: "카카오페이",
        paidAmount: result,
        paidStatus: "success",
      },
      headers: {
        Authorization: getCookie("token"),
      },
    })
      .then(async () => {
        setIsConnected(false);
        const randomNumber = Math.floor(Math.random() * 90000) + 10000;
        const response = await PortOne.requestPayment({
          // Store ID 설정
          storeId: "store-25651a48-3ffc-4530-9e1a-7414d2da01a5",
          // 채널 키 설정
          channelKey: "channel-key-0fd1fa96-8873-46d2-9f09-eb06e491bc3a",
          paymentId: `payment-${randomNumber}`,
          orderName: "팀 아카이브",
          totalAmount: result,
          currency: "CURRENCY_KRW",
          payMethod: "EASY_PAY",
          redirectUrl: `http://192.168.219.59:5173/payment-redirect`,
        });

        if (response.code != null) {
          return alert(response.message);
        }

        // const notified = await axios({ method: "POST", data: { paymentId: randomNumber } });
        alert("정상적으로 반납되었습니다. 이용해주셔서 감사합니다!");
        navigate("/");
      })
      .catch((err) => {
        setErrorText(err.response.data.message);
        console.log(err.response.status);
      });
  };

  const paymentTest = async () => {
    const res = await PortOne.requestPayment({
      //Store ID 설정
      storeId: "store-25651a48-3ffc-4530-9e1a-7414d2da01a5",
      // 채널 키
      channelKey: "channel-key-0fd1fa96-8873-46d2-9f09-eb06e491bc3a",
      paymentId: `payment-we11233hw`,
      orderName: "테스트 결제 상품",
      totalAmount: 100,
      currency: "CURRENCY_KRW",
      payMethod: "EASY_PAY",
      redirectUrl: "http://192.168.219.59:5173/auth",
    });

    if (res.code != null) {
      return alert(res.message);
    }

    res;
  };

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else if (!isRunning && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // MM:SS 형식으로 변환하는 함수
  const formatTime = (totalSeconds) => {
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
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
            <h1>Time: {formatTime(seconds)}</h1>
            {/* <h2>Amount: {calculateAmount(seconds)}</h2> */}
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
      <button onClick={() => paymentTest()}>결제 테스트</button>
    </>
  );
};

export default Auth;

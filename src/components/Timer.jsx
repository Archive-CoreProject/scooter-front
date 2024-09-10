import { useState, useEffect } from "react";

const Timer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 인터벌을 클리어합니다.
  }, []);

  // MM:SS 형식으로 변환하는 함수
  const formatTime = (totalSeconds) => {
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div>
      <h1>{formatTime(seconds)}</h1>
    </div>
  );
};

export default Timer;

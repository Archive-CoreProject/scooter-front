import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Ridepay.css";
import axios from "axios";
import { getCookie } from "../cookie";

const ScooterPayment = () => {
  const navigate = useNavigate();
  const [payList, setPayList] = useState([]);

  const paymentInfo = {
    rideDate: "2024년 09월 03일",
    scooterNumber: "202407",
    rideStartTime: "오후 3:00",
    totalRideTime: "6분",
    rideCost: "950원",
    totalPayment: "950원",
  };

  const handleGoHome = () => {
    navigate("/");
  };

  useEffect(() => {
    const getPaidData = async () => {
      axios({
        method: "GET",
        url: "http://192.168.219.59:3000/pay/pay-amount",
        headers: {
          Authorization: getCookie("token"),
        },
      }).then((res) => {
        setPayList(res.data.result);
        console.log(res.data);
      });
    };
    getPaidData();
  }, []);

  const timeStringToMinutes = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    return hours * 60 + minutes + Math.ceil(seconds / 60); // 초를 올림하여 분으로 변환
  };

  const calculateUsageMinutes = (startTime, endTime) => {
    const startMinutes = timeStringToMinutes(startTime);
    const endMinutes = timeStringToMinutes(endTime);
    return endMinutes - startMinutes;
  };

  // 사용 예시: 시작 시간이 "01:15:30"이고, 종료 시간이 "03:20:15"인 경우
  const startTime = "01:15:30";
  const endTime = "03:20:15";
  const usageMinutes = calculateUsageMinutes(startTime, endTime);

  console.log(`${startTime} - ${endTime} = ${usageMinutes}분`); // "01:15:30 - 03:20:15 = 125분"

  return (
    <div className="payment-container">
      <div className="home-button-container">
        <button className="home-button" onClick={handleGoHome}>
          홈으로
        </button>
      </div>
      {payList.length > 0 ? (
        payList.map((v, i) => (
          <div key={v.rental_dt + i} className="pay-list-item">
            <h2>🛴</h2>
            <div className="list-item-text">
              <p style={{ fontSize: "0.7rem" }}>{v.rental_dt.slice(0, 10)}</p>
              <p>
                {v.rental_st_tm.slice(0, -3)} ~ {v.rental_rt_tm.slice(0, -3)}
              </p>
            </div>
            <p>{calculateUsageMinutes(v.rental_st_tm, v.rental_rt_tm)}분 탔어요!</p>
            <p>{v.paid_amount}원</p>
          </div>
        ))
      ) : (
        <div>결제내역이 없어요</div>
      )}
    </div>
  );
};

export default ScooterPayment;

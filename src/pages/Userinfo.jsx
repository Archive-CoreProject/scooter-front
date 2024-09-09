// src/UserDetail.js
import React, { useEffect, useState } from "react";
import "../style/Userinfo.css";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../cookie";
import axios from "axios";

const userDetail = {
  name: "아카이브",
};

const userHistory = [
  {
    date: "2024-08-25",
    scooterId: "SC67890",
    startTime: "14:00",
    endTime: "14:30",
    paymentAmount: 5000,
  },
  {
    date: "2024-08-20",
    scooterId: "SC12345",
    startTime: "09:00",
    endTime: "09:45",
    paymentAmount: 7000,
  },
  {
    date: "2024-08-15",
    scooterId: "SC11223",
    startTime: "08:00",
    endTime: "08:30",
    paymentAmount: 4000,
  },
  {
    date: "2024-08-10",
    scooterId: "SC98765",
    startTime: "10:00",
    endTime: "10:45",
    paymentAmount: 6000,
  },
  {
    date: "2024-08-10",
    scooterId: "SC98765",
    startTime: "10:00",
    endTime: "10:45",
    paymentAmount: 6000,
  },
];

// 사용 내역을 그리드 형태로 표시하는 컴포넌트
const UserHistoryCell = ({ history }) => {
  return (
    <div className="user-history-cell">
      <div className="history-list">
        {history.map((item, index) => (
          <div key={index} className="history-item">
            <div>날짜: {item.rental_dt.slice(0, 10)}</div>
            <div>스쿠터 식별자: {item.scooter_idx}</div>
            <div>대여 시작 시간: {item.rental_st_tm}</div>
            <div>반납 시간: {item.rental_rt_tm}</div>
            <div>결제 금액: {item.paid_amount}원</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const UserDetail = () => {
  const navigate = useNavigate();
  const [userHistory, setUserHistory] = useState([]);

  useEffect(() => {
    const user = getCookie("user");
    const getCurrentUserInfo = async () => {
      await axios
        .get(`http://192.168.219.59:3000/user/history?userId=${user}`, {
          headers: { Authorization: getCookie("token") },
        })
        .then((res) => {
          setUserHistory(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    };
    getCurrentUserInfo();
    console.log(user);
  }, []);
  return (
    <div className="user-detail-container">
      <button style={{ width: "5rem", display: "inherit" }} onClick={() => navigate("/mmanager")}>
        뒤로
      </button>
      <div className="user-header">
        <h2>{userDetail.name}님 사용 내역</h2>
      </div>
      {userHistory.length > 0 ? <UserHistoryCell history={userHistory} /> : <div>이용내역이 없어요..!</div>}
    </div>
  );
};

export default UserDetail;

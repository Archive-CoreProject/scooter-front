// src/UserDetail.js
import React from 'react';
import '../style/Userinfo.css';

const userDetail = {
  name: '아카이브',
};

const userHistory = [
  {
    date: '2024-08-25',
    scooterId: 'SC67890',
    startTime: '14:00',
    endTime: '14:30',
    paymentAmount: 5000,
  },
  {
    date: '2024-08-20',
    scooterId: 'SC12345',
    startTime: '09:00',
    endTime: '09:45',
    paymentAmount: 7000,
  },
  {
    date: '2024-08-15',
    scooterId: 'SC11223',
    startTime: '08:00',
    endTime: '08:30',
    paymentAmount: 4000,
  },
  {
    date: '2024-08-10',
    scooterId: 'SC98765',
    startTime: '10:00',
    endTime: '10:45',
    paymentAmount: 6000,
  },
];

// 사용 내역을 그리드 형태로 표시하는 컴포넌트
const UserHistoryCell = ({ history }) => {
  return (
    <div className="user-history-cell">
      <h3>사용 내역</h3>
      <div className="history-list">
        {history.map((item, index) => (
          <div key={index} className="history-item">
            <div>날짜: {item.date}</div>
            <div>스쿠터 식별자: {item.scooterId}</div>
            <div>대여 시작 시간: {item.startTime}</div>
            <div>반납 시간: {item.endTime}</div>
            <div>결제 금액: {item.paymentAmount}원</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const UserDetail = () => {
  return (
    <div className="user-detail-container">
      <div className="user-header">
        <h2>{userDetail.name}</h2>
      </div>
      <UserHistoryCell history={userHistory} />
    </div>
  );
};

export default UserDetail;


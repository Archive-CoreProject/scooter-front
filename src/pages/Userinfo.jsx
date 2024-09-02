// src/UserDetail.js
import React from 'react';
import '../style/Userinfo.css';

const userDetail = {
  id: 1,
  name: '홍길동',
  scooterId: 'SC12345',
  rentalDate: '2024-09-01',
  startTime: '10:00',
  endTime: '12:00',
  alcoholLevel: '0.02%',
  paymentMethod: '카드',
  paymentAmount: 15000,
};

const UserDetail = () => {
  return (
    <div className="user-detail">
      <h2>회원 상세 정보</h2>
      <div className="detail-item">
        <span className="detail-label">이름:</span>
        <span className="detail-value">{userDetail.name}</span>
      </div>
      <div className="detail-item">
        <span className="detail-label">스쿠터 식별자:</span>
        <span className="detail-value">{userDetail.scooterId}</span>
      </div>
      <div className="detail-item">
        <span className="detail-label">대여 날짜:</span>
        <span className="detail-value">{userDetail.rentalDate}</span>
      </div>
      <div className="detail-item">
        <span className="detail-label">대여 시작 시간:</span>
        <span className="detail-value">{userDetail.startTime}</span>
      </div>
      <div className="detail-item">
        <span className="detail-label">반납 시간:</span>
        <span className="detail-value">{userDetail.endTime}</span>
      </div>
      <div className="detail-item">
        <span className="detail-label">알코올 수치:</span>
        <span className="detail-value">{userDetail.alcoholLevel}</span>
      </div>
      <div className="detail-item">
        <span className="detail-label">결제 수단:</span>
        <span className="detail-value">{userDetail.paymentMethod}</span>
      </div>
      <div className="detail-item">
        <span className="detail-label">결제 금액:</span>
        <span className="detail-value">{userDetail.paymentAmount}원</span>
      </div>
    </div>
  );
};

export default UserDetail;

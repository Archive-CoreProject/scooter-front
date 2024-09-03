import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../style/Ridepay.css';

const ScooterPayment = () => {
  const navigate = useNavigate(); 

  const paymentInfo = {
    rideDate: '2024년 09월 03일',
    scooterNumber: '202407',
    rideStartTime: '오후 3:00',
    totalRideTime: '6분',
    rideCost: '950원',
    totalPayment: '950원',
  };

  const handleGoHome = () => {
    navigate('/'); 
  };

  return (
    <div className="payment-container">
      <div className="header">
        <h2>결제내역</h2>
      </div>
      <div className="ride-details">
        <div className="detail-item">
          <span className="label">탑승 날짜</span>
          <span className="value">{paymentInfo.rideDate}</span>
        </div>
        <div className="detail-item">
          <span className="label">지쿠터번호</span>
          <span className="value">{paymentInfo.scooterNumber}</span>
        </div>
        <div className="detail-item">
          <span className="label">탑승 시각</span>
          <span className="value">{paymentInfo.rideStartTime}</span>
        </div>
        <div className="detail-item">
          <span className="label">총 탑승 시간</span>
          <span className="value">{paymentInfo.totalRideTime}</span>
        </div>
        <div className="detail-item">
          <span className="label">탑승 금액</span>
          <span className="value">{paymentInfo.rideCost}</span>
        </div>
      </div>
      <div className="total-payment">
        <span className="total-label">최종 결제 금액</span>
        <span className="total-value">{paymentInfo.totalPayment}</span>
      </div>
      <div className="home-button-container">
        <button className="home-button" onClick={handleGoHome}>
          홈으로
        </button>
      </div>
    </div>
  );
};

export default ScooterPayment;

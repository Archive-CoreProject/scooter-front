// src/RideHistory.js
import React, { useState } from 'react';
import '../style/Rhistory.css';

const initialRides = [
  { 
    id: 1, 
    scooterId: 'SC12345', 
    rentalDate: '2024-09-01', 
    startTime: '10:00', 
    endTime: '12:00', 
    paymentMethod: '카드', 
    paymentAmount: 15000 
  },
  { 
    id: 2, 
    scooterId: 'SC54321', 
    rentalDate: '2024-09-02', 
    startTime: '09:30', 
    endTime: '10:15', 
    paymentMethod: '계좌이체', 
    paymentAmount: 8000 
  },
  { 
    id: 3, 
    scooterId: 'SC67890', 
    rentalDate: '2024-09-03', 
    startTime: '14:00', 
    endTime: '15:30', 
    paymentMethod: '카드', 
    paymentAmount: 12000 
  },
  { 
    id: 4, 
    scooterId: 'SC09876', 
    rentalDate: '2024-09-04', 
    startTime: '08:00', 
    endTime: '09:00', 
    paymentMethod: '카카오페이', 
    paymentAmount: 10000 
  },
  { 
    id: 5, 
    scooterId: 'SC11223', 
    rentalDate: '2024-09-05', 
    startTime: '11:00', 
    endTime: '11:45', 
    paymentMethod: '페이팔', 
    paymentAmount: 7000 
  }
];

const alcoholViolations = 3; // 예시: 음주 감지 위반 횟수

const RideHistory = () => {
  const [rides, setRides] = useState(initialRides);

  return (
    <div className="ride-history">
      <h2>킥보드 사용 내역</h2>
      <div className="violation-info">
        <strong>음주 감지 위반 횟수: </strong>{alcoholViolations}회
      </div>
      <table className="ride-table">
        <thead>
          <tr>
            <th>#</th>
            <th>스쿠터 식별자</th>
            <th>대여 날짜</th>
            <th>대여 시작 시간</th>
            <th>반납 시간</th>
            <th>결제 수단</th>
            <th>결제 금액</th>
          </tr>
        </thead>
        <tbody>
          {rides.map((ride) => (
            <tr key={ride.id}>
              <td>{ride.id}</td>
              <td>{ride.scooterId}</td>
              <td>{ride.rentalDate}</td>
              <td>{ride.startTime}</td>
              <td>{ride.endTime}</td>
              <td>{ride.paymentMethod}</td>
              <td>{ride.paymentAmount}원</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RideHistory;


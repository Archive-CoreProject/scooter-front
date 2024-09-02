// src/UserManagement.js
import React, { useState } from 'react';
import '../style/Mmanager.css';

const initialMembers = [
  { id: 1, userId: 'user1', name: '홍길동', phone: '010-1234-5678', role: '일반' },
  { id: 2, userId: 'user2', name: '김철수', phone: '010-9876-5432', role: '제한' },
  { id: 3, userId: 'user3', name: '이영희', phone: '010-5555-6666', role: '일반' },
  { id: 4, userId: 'user4', name: '박민수', phone: '010-1111-2222', role: '제한' },
  { id: 5, userId: 'user5', name: '정수진', phone: '010-7777-8888', role: '일반' },
  { id: 6, userId: 'user6', name: '최영준', phone: '010-3333-4444', role: '제한' },
  { id: 7, userId: 'user7', name: '김민지', phone: '010-9999-0000', role: '일반' }
];

const UserManagement = () => {
  const [members, setMembers] = useState(initialMembers);

  const toggleRole = (id) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === id
          ? { ...member, role: member.role === '일반' ? '제한' : '일반' }
          : member
      )
    );
  };

  return (
    <div className="user-management">
      <h2>회원관리</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>#</th>
            <th>아이디</th>
            <th>사용자 이름</th>
            <th>전화번호</th>
            <th>권한</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td>{member.id}</td>
              <td>{member.userId}</td>
              <td>{member.name}</td>
              <td>{member.phone}</td>
              <td>
                <button
                  onClick={() => toggleRole(member.id)}
                  className={`role-button ${member.role === '일반' ? 'normal' : 'restricted'}`}
                >
                  {member.role}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;




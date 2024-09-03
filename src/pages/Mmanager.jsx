// src/UserManagement.js
import { useEffect, useState } from "react";
import "../style/Mmanager.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../cookie";
import UserBox from "../components/UserBox";

const initialMembers = [
  { userId: "user1", name: "홍길동", phone: "010-1234-5678", role: "일반" },
  { id: 2, userId: "user2", name: "김철수", phone: "010-9876-5432", role: "제한" },
  { id: 3, userId: "user3", name: "이영희", phone: "010-5555-6666", role: "일반" },
  { id: 4, userId: "user4", name: "박민수", phone: "010-1111-2222", role: "제한" },
  { id: 5, userId: "user5", name: "정수진", phone: "010-7777-8888", role: "일반" },
  { id: 6, userId: "user6", name: "최영준", phone: "010-3333-4444", role: "제한" },
  { id: 7, userId: "user7", name: "김민지", phone: "010-9999-0000", role: "일반" },
];

const UserManagement = () => {
  const [members, setMembers] = useState(initialMembers);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserList = async () => {
      const token = getCookie("token");
      await axios({
        method: "GET",
        url: "http://192.168.219.59:3000/user/users",
        headers: {
          Authorization: `${token}`,
        },
      })
        .then((res) => {
          setMembers(res.data.result);
        })
        .catch((err) => {
          console.log(err);
          alert("권한이 없습니다.");
          navigate("/");
        });
    };
    loadUserList();
  }, []);

  return (
    <div style={{ marginTop: "15rem" }}>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        뒤로가기
      </button>
      <div style={{ display: "flex", flexDirection: "column", maxHeight: "100vh" }}>
        <div className="user-management">
          {members.map((v, i) => (
            <UserBox key={i} userId={v.user_id} name={v.user_name} phone={v.user_phone} role={v.user_role} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;

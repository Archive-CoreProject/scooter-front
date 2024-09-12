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
  const [filteredMembers, setFilteredMembers] = useState(initialMembers);
  const [searchTerm, setSearchTerm] = useState("");
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
          setFilteredMembers(res.data.result);
        })
        .catch((err) => {
          console.log(err);
          alert("권한이 없습니다.");
          navigate("/");
        });
    };
    loadUserList();
  }, [navigate]);

  const handleSearch = () => {
    const filtered = members.filter(
      (member) =>
        member.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.user_id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMembers(filtered);
  };

  return (
    <div style={{ marginTop: "10rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
      {/* 상단 고정 영역 */}
      <div
        style={{
          position: "sticky",
          top: "0",
          backgroundColor: "#f0f2f5",
          zIndex: "10",
          width: "100%",
          paddingBottom: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-start",
            marginBottom: "10",
            marginTop: "10px",
          }}
        >
          <button
            onClick={() => navigate("/")}
            style={{
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              width: "120px",
              height: "45px",
            }}
          >
            뒤로
          </button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "0px",
            justifyContent: "center",
            width: "100%",
            maxWidth: "500px",
            marginTop: "20px",
          }}
        >
          <input
            type="text"
            placeholder="유저 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px 0 0 8px",
              border: "1px solid #ddd",
              outline: "none",
              flex: "1",
              height: "30px",
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "0 8px 8px 0",
              cursor: "pointer",
              height: "50px",
              width: "100px",
            }}
          >
            검색
          </button>
        </div>
      </div>

      {/* 회원 목록 스크롤 영역 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          width: "100%",
          maxWidth: "500px",
          marginTop: "20px",
        }}
      >
        <div className="user-management">
          {filteredMembers.map((v, i) => (
            <UserBox key={i} userId={v.user_id} name={v.user_name} phone={v.user_phone} role={v.user_role} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;

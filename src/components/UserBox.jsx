import { useEffect, useState } from "react";
import "../style/userBox.css";
import axios from "axios";
import { getCookie } from "../cookie";
import { useNavigate } from "react-router-dom";

const UserBox = ({ userId, name, phone, role }) => {
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();
  const toggleRole = () => {
    const newRole = userRole === "일반" ? "제한" : "일반";
    const changeUserRole = async () => {
      await axios({
        method: "POST",
        url: "http://192.168.219.59:3000/admin/update-role",
        data: { userId: userId, role: newRole },
        headers: {
          Authorization: getCookie("token"),
        },
      }).then(() => {
        setUserRole(newRole);
      });
    };
    changeUserRole();
  };

  useEffect(() => {
    setUserRole(role === "일반" ? "일반" : "제한");
  }, [role]);

  return (
    <div id="userbox-container">
      <div
        style={{ backgroundColor: "tomato", borderRadius: "0.4rem" }}
        onClick={() => {
          navigate("/userinfo");
        }}
      >
        {userId}
      </div>
      <div>{name}</div>
      <div>{phone}</div>
      <div>
        <button className={`role-button ${userRole === "일반" ? "normal" : "restricted"}`} onClick={toggleRole}>
          {userRole}
        </button>
      </div>
    </div>
  );
};

export default UserBox;

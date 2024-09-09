import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { delCookie, getCookie } from "../cookie";
import axios from "axios";

const Main = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  // 토큰 있어야지만 접근 가능
  useEffect(() => {
    const checkToken = async () => {
      const token = getCookie("token");
      await axios({
        method: "GET",
        url: "http://192.168.219.59:3000/user/verify",
        headers: {
          Authorization: token,
        },
      })
        .then((res) => {
          setIsAdmin(res.data.isAdmin);
          console.log(res.data.isAdmin);
        })
        .catch(() => {
          alert("로그인 후 접근해주세요");
          navigate("/login");
        });
    };
    checkToken();
  }, []);
  return (
    <>
      <div>
        <button
          onClick={() => {
            delCookie("token");
            navigate("/login");
          }}
        >
          로그아웃(개발전용)
        </button>
        <h1>🛴⚡</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime dolor sequi, officiis blanditiis, inventore
          assumenda aliquid deleniti laboriosam eos, eius porro vel? Adipisci repellat in dolorum rerum consequuntur
          beatae totam!
        </p>
        <button
          onClick={() => {
            navigate("/auth");
          }}
        >
          킥보드 이용하기
        </button>
        <button
          onClick={() => {
            navigate("/pay");
          }}
        >
          계산하기
        </button>
        {isAdmin && (
          <button
            onClick={() => {
              navigate("/mmanager");
            }}
          >
            유저 관리
          </button>
        )}
      </div>
    </>
  );
};

export default Main;

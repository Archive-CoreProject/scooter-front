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
          로그아웃
        </button>
        <h1>🛴⚡🧢</h1>
        <p style={{ wordBreak: "keep-all" }}>
          음주감지 헬멧이 장착된 공유킥보드는 사용자가 음주 측정을 통과해야만 주행할 수 있어, 사고를 예방하고 안전한
          이동을 보장합니다. 간편한 헬멧 착용과 음주 감지로 보다 안전하게 킥보드를 이용해보세요.
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
          결제내역
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

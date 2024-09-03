import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { delCookie, getCookie } from "../cookie";

const Main = () => {
  const navigate = useNavigate();
  // 토큰 있어야지만 접근 가능
  useEffect(() => {
    const token = getCookie("token");
    if (token === undefined) {
      navigate("/login");
    }
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
          인증번호 입력하기
        </button>
        <button
          onClick={() => {
            navigate("/pay");
          }}
        >
          계산하기
        </button>
        <button
          onClick={() => {
            navigate("/mmanager");
          }}
        >
          유저 관리
        </button>
      </div>
    </>
  );
};

export default Main;

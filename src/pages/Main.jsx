import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <h1>🛴⚡</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime dolor sequi, officiis blanditiis, inventore
          assumenda aliquid deleniti laboriosam eos, eius porro vel? Adipisci repellat in dolorum rerum consequuntur
          beatae totam!
        </p>
        <button
          onClick={() => {
            navigate("/blue");
          }}
        >
          킥보드 찾기
        </button>
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
      </div>
    </>
  );
};

export default Main;

import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <h2>잘못 찾아오셨습니다</h2>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          돌아가기
        </button>
      </div>
    </>
  );
};

export default NotFound;

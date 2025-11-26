import { MdTaskAlt } from "react-icons/md";
import { useNavigate } from "react-router-dom";
function Logo() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/dashboard");
  };

  return (
    <div onClick={handleClick} className="flex items-center gap-2 font-bold">
      <div className="bg-blue-600 p-2 rounded-xl">
        <MdTaskAlt className="text-xl text-white" />
      </div>
      <div className=" text-xl ">Task Flow</div>
    </div>
  );
}

export default Logo;

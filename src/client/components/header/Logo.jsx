import { useNavigate } from "react-router-dom";
import { MdTaskAlt } from "react-icons/md";
function Logo() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-2 font-bold">
      <div className="bg-blue-600 p-2 rounded-xl">
        <MdTaskAlt className="text-xl text-white" />
      </div>
      <div className=" text-xl ">Task Flow</div>
    </div>
  );
}

export default Logo;

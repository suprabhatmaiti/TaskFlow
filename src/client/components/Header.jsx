import { CiDark, CiLight } from "react-icons/ci";
import { MdTaskAlt } from "react-icons/md";

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <div className=" dark:bg-gray-800 dark:text-white flex justify-between p-4 border-b border-gray-400 items-center">
      <div className="flex gap-2 items-center text-lg">
        <div className="border p-1 border-blue-800 rounded-lg bg-blue-800">
          <MdTaskAlt className="text-2xl" />
        </div>
        TaskFlow
      </div>
      <div
        onClick={toggleDarkMode}
        className="border p-1 border-blue-800 rounded-lg bg-blue-800 cursor-pointer"
      >
        {isDarkMode ? (
          <div>
            <CiDark className="text-2xl" />
          </div>
        ) : (
          <div>
            <CiLight className="text-2xl" />
          </div>
        )}
      </div>
    </div>
  );
}

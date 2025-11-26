import { useEffect, useState } from "react";
import AddTaskModal from "./addTaskModal/AddTaskModal";
import api from "../../utils/api";
import LoadingOverlay from "../../components/LoadingOverlay";
import { getTasks } from "../../services/taskServices";
import TaskList from "./TaskList";

function DashboardPage() {
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [toRefresh, setToRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function fetchTasks() {
      try {
        setLoading(true);
        const result = await getTasks();
        if (!mounted) return;
        const data = result.data?.tasks;
        setTasks(data);
      } catch (err) {
        if (!mounted) return;
        console.error("Failed to fetch tasks:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTasks();

    return () => {
      mounted = false;
    };
  }, [toRefresh]);

  const handleAddBtnClick = () => {
    setOpenTaskModal(true);
  };
  const handleRefresh = () => {
    setToRefresh(!toRefresh);
  };

  return (
    <div className="min-h-screen p-6 md:p-10 text-gray-900">
      <div className="flex justify-between items-center mb-10">
        <h1 className=" text-xl md:text-3xl font-bold">Your Tasks</h1>
        <button
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-lg rounded-lg"
          onClick={handleAddBtnClick}
        >
          Add Task
        </button>
      </div>
      <div className="w-full">
        <div>
          {tasks.length === 0 ? (
            loading ? (
              <LoadingOverlay />
            ) : (
              <p className="text-lg text-gray-400">
                "No task found, Please create a new task"
              </p>
            )
          ) : (
            <TaskList tasks={tasks} setRefresh={handleRefresh} />
          )}
        </div>
      </div>
      {openTaskModal && (
        <AddTaskModal
          closeModal={setOpenTaskModal}
          setRefresh={handleRefresh}
        />
      )}
    </div>
  );
}

export default DashboardPage;

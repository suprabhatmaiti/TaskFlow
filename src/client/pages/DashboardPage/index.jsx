import { useEffect, useState } from "react";
import AddTaskModal from "./addTaskModal/AddTaskModal";
import api from "../../utils/api";
import LoadingOverlay from "../../components/LoadingOverlay";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { getTasks } from "../../services/taskServices.js";
import EditAccordian from "./editTask/EditAccordian.jsx";

function DashboardPage() {
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [toRefresh, setToRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function fetchTasks() {
      try {
        setLoading(true);
        const result = await getTasks();
        if (!mounted) return;
        const data = result.data?.tasks;
        console.log(data);
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

  const handleUpdate = () => {
    setEditId(null);
    setToRefresh(!toRefresh);
  };

  const handleAddBtnClick = () => {
    setOpenTaskModal(true);
  };
  const handleEditClick = (id) => {
    setEditId(id);
  };
  const handleDoneClick = (id) => {
    api.post(`/api/task/update-task/${id}`);
  };
  const handleDeleteClick = () => {};

  const renderedTasks = tasks.map((task) => {
    console.log(typeof task.due_date);
    console.log(task.due_date);
    const dueDate = new Date(task.due_date).toDateString();
    const priority = {
      1: "Low Priority",
      2: "Midium Priority",
      3: "High Priority",
    };
    const edit = editId === task.id;

    return (
      <div
        key={task.id}
        className="w-full bg-white border border-gray-300 md:flex  justify-between items-center rounded-2xl p-4 shadow-sm hover:shadow-xl transition mb-4"
      >
        <div>
          <h2
            className={`text-lg font-medium ${
              task.status_id === 3 ? "line-through" : ""
            }`}
          >
            {task.title}
          </h2>

          <div className="flex flex-wrap gap-4 mt-1 text-sm text-gray-600">
            <p>
              Due: <span className="font-semibold">{dueDate}</span>
            </p>
            <span
              className={`px-3 py-1 rounded-full text-white text-xs font-semibold
                  ${task.priority_id === 3 ? "bg-red-500" : ""}
                  ${task.priority_id === 2 ? "bg-yellow-500" : ""}
                  ${task.priority_id === 1 ? "bg-green-500" : ""}
                `}
            >
              {priority[task.priority_id]}
            </span>
          </div>
        </div>
        {!edit && (
          <div className="flex gap-4 items-center">
            <div>
              <button
                onClick={() => handleEditClick(task.id)}
                className="text-2xl hover:scale-120 cursor-pointer active:scale-100"
              >
                <MdOutlineEdit />
              </button>
            </div>
            <div>
              <button
                onClick={handleDeleteClick}
                className="text-2xl hover:scale-120 cursor-pointer active:scale-100"
              >
                <MdDeleteOutline />
              </button>
            </div>
            <div>
              <button
                onClick={() => handleDoneClick(task.id)}
                className={`bg-blue-600 text-white px-2 py-1 rounded-lg font-bold hover:bg-blue-800 cursor-pointer active:bg-blue-600 ${
                  task.status_id === 3 ? "hidden" : ""
                }`}
              >
                Done
              </button>
            </div>
          </div>
        )}
        {edit && (
          <div>
            {task.due_date}
            <EditAccordian data={task} handleUpdate={handleUpdate} />
          </div>
        )}
      </div>
    );
  });

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
            renderedTasks
          )}
        </div>
      </div>
      {openTaskModal && (
        <AddTaskModal
          closeModal={setOpenTaskModal}
          refresh={() => setToRefresh(!toRefresh)}
        />
      )}
    </div>
  );
}

export default DashboardPage;

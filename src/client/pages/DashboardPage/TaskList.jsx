import { useState } from "react";
import { deleteTask } from "../../services/taskServices";
import { toast } from "react-toastify";
import Task from "./Task";

function TaskList({ tasks, setRefresh }) {
  const [editId, setEditId] = useState(null);

  const handleUpdate = () => {
    setEditId(null);
    setRefresh();
  };
  const handleCancel = () => {
    setEditId(null);
  };

  const handleEditClick = (id) => {
    setEditId(id);
  };
  const handleDoneClick = (id) => {};
  const handleDeleteClick = async (id) => {
    console.log(id);
    try {
      await deleteTask(id);
      setRefresh();
      toast.success("Task Deleted Successfully");
    } catch (error) {
      if (error?.response?.data?.error) {
        toast.error(error?.response?.data?.error);
      }
    }
  };

  return tasks.map((task) => (
    <Task
      data={task}
      onEdit={handleEditClick}
      onDelete={handleDeleteClick}
      onComplete={handleDoneClick}
      onUpdate={handleUpdate}
      onCancel={handleCancel}
      key={task.id}
      editId={editId}
    />
  ));
}
export default TaskList;

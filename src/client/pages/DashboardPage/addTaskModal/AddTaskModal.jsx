import Input from "../../../components/Input";
import Dropdown from "../../../components/Dropdown";
import { useReducer, useState } from "react";
import { initialState, taskReducer } from "../reducer/taskReducer.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createTask } from "../../../services/taskServices.js";

function AddTaskModal({ closeModal, setRefresh }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const priority = [
    { label: "Low", value: 1 },
    { label: "Mid", value: 2 },
    { label: "High", value: 3 },
  ];

  const handleDropdownChange = (value, name) => {
    dispatch({ type: "UPDATE_FIELD", field: name, value: value });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    dispatch({ type: "UPDATE_FIELD", field: name, value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!state.priority || !state.title || !state.dueDate) {
        toast.error("Add Every Field");
        return;
      }
      console.log("err");
      const priorityId = priority.find((p) => p.label === state.priority).value;
      const payload = {
        title: state.title,
        description: state.description,
        priority_id: priorityId,
        due_date: state.dueDate,
      };
      dispatch({ type: "SET_LOADING", payload: true });
      await createTask(payload);

      toast.success("Task Created Successfully");
      closeModal(false);
      setRefresh();
    } catch (error) {
      if (error?.response?.data?.error) {
        toast.error(error?.response?.data?.error);
      }
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const handleCloseModal = () => {
    closeModal(false);
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex flex-col justify-center items-center z-50">
      <form
        className="bg-white rounded-2xl shadow-2xl relative flex flex-col justify-center items-center
          w-11/12 sm:w-2/3  lg:w-1/2 
          p-6 md:p-8 
          animate-fade-in-up"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-end ">
          <button
            onClick={handleCloseModal}
            className=" absolute right-4 bg-gray-200 px-2 rounded-lg hover:bg-gray-400 hover:text-red-400 cursor-pointer"
          >
            X
          </button>
        </div>
        <div className="bg-white w-full max-w-3xl p-6 md:p-10">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-1">
              Create a New Task
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Fill out the form below
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <Input
              label="Title"
              name="title"
              type="text"
              placeholder="Add Title"
              value={state.title}
              onChange={handleInputChange}
            />

            <Input
              mode="desc"
              label="Description"
              name="description"
              type="text"
              placeholder="Add description"
              className="h-24"
              value={state.description}
              onChange={handleInputChange}
            />

            <Dropdown
              options={priority}
              label="Priority"
              name="priority"
              placeholder="Select Priority"
              onSelect={(value) => handleDropdownChange(value, "priority")}
              selection={state.priority}
            />

            <div className="w-full">
              <Input
                label="Due Date"
                type="date"
                name="dueDate"
                value={state.dueDate}
                onChange={handleInputChange}
              />
            </div>

            <button
              className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white w-full px-6 py-3 rounded-lg font-semibold transition disabled:opacity-50  duration-200"
              type="submit"
              disabled={state.loading}
            >
              {state.loading ? "Adding..." : "Add Task"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddTaskModal;

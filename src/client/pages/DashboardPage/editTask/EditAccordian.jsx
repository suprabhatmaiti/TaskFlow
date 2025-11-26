import Input from "../../../components/Input";
import Dropdown from "../../../components/Dropdown";
import { useEffect, useState } from "react";
import SortPriority from "./SetPriority";
import { updateTask } from "../../../services/taskServices";
function EditAccordian({ data, handleUpdate }) {
  console.log(data);
  const [state, setState] = useState({
    title: "",
    description: "",
    priority: "",
    dueDate: "",
    loading: false,
  });

  const priority = [
    { label: "Low", value: 1 },
    { label: "Mid", value: 2 },
    { label: "High", value: 3 },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  useEffect(() => {
    if (data) {
      setState({
        title: data.title,
        description: data.description,
        priority: data.priority_id,
        dueDate: data.due_date,
      });
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, loading: true });

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      });

      if (response.ok) {
      }
    } catch (error) {
      console.error(error);
    } finally {
      setState({ ...state, loading: false });
    }
  };
  const setCheckBox = (value) => {
    setState({ ...state, priority: value });
  };
  const handleUpdateTask = async () => {
    try {
      setState({ ...state, loading: true });
      const response = await updateTask(state, data.id);
      if (response.ok) {
        handleUpdate();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setState({ ...state, loading: false });
    }
  };

  return (
    <div>
      <div className="bg-white mt-4  w-full  border-t border-gray-200">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div>
              <Input
                label="Title"
                name="title"
                type="text"
                placeholder="Add Title"
                value={state.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full">
              <Input
                label="Due Date"
                type="date"
                name="dueDate"
                value={state.dueDate}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <Input
              mode="desc"
              label="Description"
              name="description"
              type="text"
              placeholder="Add description"
              className="h-20"
              value={state.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex md:flex-col gap-4 items-center ">
            <div className="w-full mb-2 md:mb-1">
              <SortPriority
                state={state}
                setCheck={(value) => setCheckBox(value)}
              />
            </div>
          </div>
          <div className="flex gap-4  justify-end items-center">
            <div className="flex gap-2">
              <button
                className="cursor-pointer bg-gray-200 hover:bg-gray-400 active:bg-gray-200  w-full px-2 py-1 rounded-lg font-semibold transition disabled:opacity-50md:px-6 md:py-3 rounded-lg font-semibold transition disabled:opacity-50  duration-200"
                type="submit"
                disabled={state.loading}
                onClick={() => setEditId(null)}
              >
                Cancel
              </button>
              <button
                className="cursor-pointer bg-blue-600 hover:bg-blue-700 active:bg-blue-600 text-white w-full md:px-6 md:py-3  px-2 py-1 rounded-lg font-semibold transition disabled:opacity-50  duration-200"
                type="submit"
                disabled={state.loading}
                onClick={handleUpdateTask}
              >
                {state.loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditAccordian;

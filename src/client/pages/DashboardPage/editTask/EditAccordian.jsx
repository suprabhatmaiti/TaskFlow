import Input from "../../../components/Input";
import Dropdown from "../../../components/Dropdown";
import { useEffect, useState } from "react";
import SortPriority from "./SetPriority";
import { updateTask } from "../../../services/taskServices";
import { toast } from "react-toastify";

function EditAccordian({ data, handleUpdate, handleCancel }) {
  const [state, setState] = useState({
    title: "",
    description: "",
    priority_id: "",
    due_date: "",
    status_id: "1",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  useEffect(() => {
    if (data) {
      console.log(data);
      const toInputDate = (iso) => {
        if (!iso) return "";
        return iso.split("T")[0];
      };
      console.log(data.due_date);
      setState((prev) => ({
        ...prev,
        title: data.title,
        description: data.description,
        priority_id: data.priority_id,
        due_date: toInputDate(data.due_date),
      }));
    }
  }, [data]);

  const setCheckBox = (value) => {
    setState({ ...state, priority_id: value });
    console.log(state);
  };
  const handleUpdateTask = async () => {
    try {
      setLoading(true);
      const payload = state;
      const response = await updateTask(payload, data.id);
      if (response.status === 200) {
        toast.success("Task Updated Successfully");
        handleUpdate();
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
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
                name="due_date"
                value={state.due_date}
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
              <SortPriority state={state} setCheck={setCheckBox} />
            </div>
          </div>
          <div className="flex gap-4  justify-end items-center">
            <div className="flex gap-2">
              <button
                className="cursor-pointer bg-gray-200 hover:bg-gray-400 active:bg-gray-200  w-full px-2 py-1 rounded-lg font-semibold transition disabled:opacity-50md:px-6 md:py-3 rounded-lg font-semibold transition disabled:opacity-50  duration-200"
                type="submit"
                disabled={loading}
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="cursor-pointer bg-blue-600 hover:bg-blue-700 active:bg-blue-600 text-white w-full md:px-6 md:py-3  px-2 py-1 rounded-lg font-semibold transition disabled:opacity-50  duration-200"
                type="submit"
                disabled={loading}
                onClick={handleUpdateTask}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditAccordian;

import React from "react";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import EditAccordian from "./editTask/EditAccordian";

const priority = {
  1: "Low Priority",
  2: "Midium Priority",
  3: "High Priority",
};
export default function Task({
  data,
  onEdit,
  onDelete,
  onComplete,
  editId,
  onUpdate,
  onCancel,
}) {
  const dueDate = data.due_date.split("T")[0];
  const edit = editId === data.id;

  return (
    <div
      key={data.id}
      className="w-full bg-white border border-gray-300 rounded-2xl p-4 shadow-sm hover:shadow-xl transition mb-4"
    >
      <div className="flex justify-between">
        <div className="mb-4">
          <h2
            className={`text-lg font-medium ${
              data.status_id === 3 ? "line-through" : ""
            }`}
          >
            {data.title}
          </h2>

          <div className="flex flex-wrap gap-4 mt-1 text-sm text-gray-600">
            <p>
              Due: <span className="font-semibold">{dueDate}</span>
            </p>
            <span
              className={`px-3 py-1 rounded-full text-white text-xs font-semibold
                  ${data.priority_id === 3 ? "bg-red-500" : ""}
                  ${data.priority_id === 2 ? "bg-yellow-500" : ""}
                  ${data.priority_id === 1 ? "bg-green-500" : ""}
                `}
            >
              {priority[data.priority_id]}
            </span>
          </div>
        </div>
        {!edit && (
          <div className="flex gap-4 items-center">
            <div>
              <button
                onClick={() => onEdit(data.id)}
                className="text-2xl hover:scale-120 cursor-pointer active:scale-100"
              >
                <MdOutlineEdit />
              </button>
            </div>
            <div>
              <button
                onClick={() => onDelete(data.id)}
                className="text-2xl hover:scale-120 cursor-pointer active:scale-100"
              >
                <MdDeleteOutline />
              </button>
            </div>
            <div>
              <button
                onClick={() => onComplete(data.id)}
                className={`bg-blue-600 text-white px-2 py-1 rounded-lg font-bold hover:bg-blue-800 cursor-pointer active:bg-blue-600 ${
                  data.status_id === 3 ? "hidden" : ""
                }`}
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
      <div>
        {edit && (
          <EditAccordian
            data={data}
            handleUpdate={onUpdate}
            handleCancel={onCancel}
          />
        )}
      </div>
    </div>
  );
}

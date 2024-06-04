import React, { useEffect } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { formatDate } from "../../utils/helper";

const TaskFormModal = ({ isOpen, onRequestClose, onSubmit, message = {} }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (isOpen && message.data) {
      setValue("_id", message.data._id);
      setValue("title", message.data.title);
      setValue("description", message.data.description);
      setValue("dueDate", formatDate(message.data.dueDate));
      setValue("status", message.data.status);
      setValue("tags", message.data.tags);
      setValue("priority", message.data.priority);
    }
  }, [isOpen]);

  const handleFormSubmit = (newTask) => {
    newTask.tags =
      newTask.tags === ""
        ? []
        : newTask.tags.split(",").map((tag) => tag.trim());
    onSubmit(newTask);
    reset();
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Task"
      className="bg-white rounded-lg p-6 max-w-lg w-[100%] mx-auto mt-16 mb-20 shadow-lg border md:w-4/5 md:mx-auto sm:w-3/4 lg:w-2/3"
      overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
    >
      <h2 className="text-2xl font-semibold mb-4">{message.heading}</h2>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            {...register("title", {
              required: "Title is required",
              minLength: {
                value: 3,
                message: "Title should be at least 3 characters",
              },
            })}
            className={`mt-1 p-2 border rounded w-full ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register("description")}
            className="mt-1 p-2 border rounded w-full border-gray-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Due Date
          </label>
          <input
            type="date"
            min={formatDate(new Date())}
            {...register("dueDate", {
              required: "Due Date is required",
              validate: (value) =>
                new Date(value) > new Date() ||
                "Due date should be greater than today's date",
            })}
            className={`mt-1 p-2 border rounded w-full ${
              errors.dueDate ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.dueDate && (
            <p className="text-red-500 text-sm">{errors.dueDate.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            defaultValue={"open"}
            {...register("status")}
            className="mt-1 p-2 border rounded w-full border-gray-300"
          >
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tags
          </label>
          <input
            type="text"
            {...register("tags", {
              validate: (value) =>
                value === "" ||
                value.split(",").map((tag) => tag.trim()).length <= 10,
              message: "Tags should be less than 10",
            })}
            className="mt-1 p-2 border rounded w-full border-gray-300"
            placeholder="Comma separated tags"
          />
          {errors.tags && (
            <p className="text-red-500 text-sm">{errors.tags.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Priority
          </label>
          <select
            {...register("priority")}
            defaultValue={"low"}
            className="mt-1 p-2 border rounded w-full border-gray-300"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.priority && (
            <p className="text-red-500 text-sm">{errors.priority.message}</p>
          )}
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onRequestClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-800"
          >
            {message.button}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default TaskFormModal;

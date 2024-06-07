import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import TaskFormModal from "./TaskFormModel";
import { useDispatch, useSelector } from "react-redux";
import { createTask, defaultState } from "../../store/taskSlice";
import { showNotification } from "../../store/notificationSlice";

const AddTask = () => {
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { status } = useSelector((state) => state.task);
  const dispatch = useDispatch();
  const handleAddTask = async (newTask) => {
    setLoading(true);
    dispatch(createTask(newTask));
  };
  useEffect(() => {
    if (status === "succeeded") {
      setLoading(false);
      setIsModalOpen(false);
      dispatch(defaultState());
      dispatch(
        showNotification({
          type: "success",
          message: "You have successfully added a new task",
        })
      );
    }
  }, [status, dispatch]);

  return (
    <>
      <button
        className="flex bg-indigo-500 hover:bg-indigo-800 text-white font-semibold justify-center items-center px-2 py-2 sm:px-4 sm:py-3  lg:px-4 lg:py-2"
        onClick={() => setIsModalOpen(true)}
      >
        <FaPlus className="mt-[1px] mr-3" size={18} />
        Add Task
      </button>
      {IsModalOpen && (
        <TaskFormModal
          isOpen={IsModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          onSubmit={handleAddTask}
          message={{
            heading: "Add New Task",
            button: isLoading ? "Adding Task..." : "Add Task",
          }}
        />
      )}
    </>
  );
};

export default AddTask;

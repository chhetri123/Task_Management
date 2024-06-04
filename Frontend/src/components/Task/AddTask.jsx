import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import TaskFormModal from "./TaskFormModel";
import { useDispatch } from "react-redux";
import { createTask, defaultState } from "../../store/taskSlice";

const AddTask = () => {
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const handleAddTask = async (newTask) => {
    dispatch(createTask(newTask));
    dispatch(defaultState());
  };

  return (
    <>
      <button
        className="flex bg-indigo-500 hover:bg-indigo-800 text-white font-semibold justify-center items-center px-2 py-2 sm:px-4 sm:py-3  lg:px-4 lg:py-2"
        onClick={() => setIsModalOpen(true)}
      >
        <FaPlus className="mt-[1px] mr-3" size={18} />
        Add Task
      </button>
      <TaskFormModal
        isOpen={IsModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTask}
        message={{
          heading: "Add New Task",
          button: "Add Task",
        }}
      />
    </>
  );
};

export default AddTask;

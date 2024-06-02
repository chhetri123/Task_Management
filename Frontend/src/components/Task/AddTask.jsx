import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import TaskFormModal from "./TaskFormModel";
import { useSelector, useDispatch } from "react-redux";
import { createTask, getAllTask, defaultState } from "../../store/taskSlice";

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
        className="flex bg-indigo-500 hover:bg-indigo-800 text-white font-semibold py-2 px-4 rounded shadow transition-colors duration-200"
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

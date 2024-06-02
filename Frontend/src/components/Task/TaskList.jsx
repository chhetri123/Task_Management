import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaEdit, FaTrashAlt, FaUndoAlt } from "react-icons/fa";
import TaskFormModal from "./TaskFormModel";

import { useDispatch, useSelector } from "react-redux";
import { editTask, defaultState, deleteTask } from "../../store/taskSlice";
import {
  getStatusIcon,
  getPriorityClass,
  dateToMonth_Day,
} from "../../utils/helper";

const TaskList = ({ task, onTaskClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const { status } = useSelector((state) => state.task);
  const dispatch = useDispatch();

  const handleEdit = async (updatedTask) => {
    dispatch(editTask(updatedTask));
  };
  const handleDeleteTask = () => {
    dispatch(deleteTask(task._id));
  };
  return (
    <div
      className="relative border rounded-lg p-4 mb-4 shadow-md bg-white transition-transform duration-500 transform hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="flex justify-between items-center mb-2 focus:cursor-grab"
        onClick={() => onTaskClick(task)}
      >
        <div className="w-2/3">
          <h2 className="text-base font-semibold truncate hover:underline focus:cursor-pointer">
            {task.title}
          </h2>
        </div>
        <div className="flex items-center space-x-5 w-1/3 justify-end">
          {getStatusIcon(task.status)}
          <span
            className={`px-4 py-1 rounded-lg ${getPriorityClass(
              task.priority
            )}`}
          >
            {task.priority}
          </span>
        </div>
      </div>
      <div className="flex flex-row  justify-between items-center">
        <p className="text-gray-500 text-xs">
          Start: {dateToMonth_Day(task.createdAt)}
        </p>
        <p className="text-gray-500 text-sm">
          Due: {dateToMonth_Day(task.dueDate)}
        </p>
      </div>

      <div className="mt-2 flex space-x-2">
        {task.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-semibold bg-gray-200 rounded-full px-2 py-1"
          >
            {`#${tag}`}
          </span>
        ))}
      </div>
      {isHovered && (
        <div className="absolute bottom-4 right-8 sm:right-2 md:right-5 flex space-x-4 transition-opacity duration-1000">
          {task.status === "completed" ? (
            <FaUndoAlt
              className="text-yellow-500 cursor-pointer hover:text-yellow-700"
              title="Mark as Incomplete"
              onClick={() => handleEdit({ ...task, status: "open" })}
            />
          ) : (
            <FaCheckCircle
              className="text-green-500 cursor-pointer hover:text-green-700"
              title="Mark as Complete"
              onClick={() => handleEdit({ ...task, status: "completed" })}
            />
          )}
          <FaEdit
            className="text-blue-500 cursor-pointer hover:text-blue-700"
            title="Edit Task"
            onClick={() => setIsModalOpen(true)}
          />
          <FaTrashAlt
            className="text-red-500 cursor-pointer hover:text-red-700"
            title="Delete Task"
            onClick={handleDeleteTask}
          />
        </div>
      )}
      <TaskFormModal
        isOpen={IsModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onSubmit={handleEdit}
        message={{
          heading: "Edit Task",
          button: "Edit Task",
          data: {
            ...task,
            tags: task.tags.join(","),
          },
        }}
      />
    </div>
  );
};

export default TaskList;

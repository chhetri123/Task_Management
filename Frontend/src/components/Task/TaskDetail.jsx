// src/components/TaskDetails.js

import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaCalendarAlt, FaFlag, FaInfoCircle, FaHashtag } from "react-icons/fa";
import {
  dateToMonth_Day,
  statusColors,
  priorityColors,
} from "../../utils/helper";

const TaskDetail = ({ task, onClose }) => {
  if (!task) return null;
  const menuRef = useRef(null);
  const { user } = useSelector((state) => state.auth);

  //
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    const timer = setTimeout(() => {
      window.addEventListener("click", handleClickOutside);
    }, 200);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("click", handleClickOutside);
    };
  }, [task]);

  const {
    title,
    description,
    dueDate,
    createdAt,
    status,
    owner,
    tags,
    priority,
  } = task;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div
        className="bg-white rounded-lg p-6 max-w-lg w-full shadow-lg"
        ref={menuRef}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <FaInfoCircle size={24} />
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center">
            <FaCalendarAlt className="mr-2 text-gray-600" />
            <p>
              <strong>Due date:</strong> {dateToMonth_Day(dueDate)}
            </p>
          </div>
          <div className="flex items-center">
            <FaCalendarAlt className="mr-2 text-gray-600" />
            <p>
              <strong>Start date:</strong> {dateToMonth_Day(createdAt)}
            </p>
          </div>
          <div className="flex items-center">
            <FaFlag
              className={`mr-2 ${priorityColors[priority.toLowerCase()]}`}
            />
            <p>
              <strong>Priority:</strong> {priority}
            </p>
          </div>
          <div className="flex items-center">
            <strong>Status:</strong>
            &nbsp;
            <span
              className={`mr-2 px-2 py-1 rounded-full text-white ${
                statusColors[status.toLowerCase()]
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>
          <div>
            <strong>Description:</strong>
            <p className="mt-1">{description}</p>
          </div>
          <div>
            <strong>Tags:</strong>
            <div className="flex flex-col justify-between mt-2">
              <div className="flex flex-wrap mt-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm mr-2 mb-2"
                  >
                    <FaHashtag className="inline" /> {tag}
                  </span>
                ))}
              </div>
              {user.role === "admin" && (
                <span className="text-gray-500 text-xs">
                  &nbsp; (By <i> @{owner.name.split(" ")[0]} </i> )
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;

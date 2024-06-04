import React, { useEffect, useState } from "react";
import TaskList from "./TaskList";
import TaskSorter from "./TaskSorter";
import TaskDetail from "./TaskDetail";
import { useSelector, useDispatch } from "react-redux";
import {
  defaultState,
  getAllTask,
  taskWithPagination,
} from "../../store/taskSlice";
import Pagination from "./Pagination";

const CreatedTask = () => {
  const {
    task = [],
    totalTask = 0,
    status,
    sortOptions,
    currentPage,
    limit,
    search,
    error,
  } = useSelector((state) => state.task);
  const [selectedTask, setSelectedTask] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTask());
    dispatch(taskWithPagination({ ...sortOptions, page: currentPage, limit }));
  }, []);

  useEffect(() => {
    if (status === "succeeded") {
      dispatch(getAllTask());
      dispatch(
        taskWithPagination({ ...sortOptions, page: currentPage, limit, search })
      );
      dispatch(defaultState());
    }
    if (status === "failed") {
      console.log(error);
    }
  }, [status]);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    dispatch(defaultState());
  };

  const handleCloseTaskDetails = () => {
    setSelectedTask(null);
  };

  return (
    <>
      <div className="mt-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            Your Tasks
            <span className="text-base">({totalTask})</span>
          </h1>
          <TaskSorter />
        </div>
        <div className="bg-white shadow rounded p-4 overflow-auto h-[100vh] scrollbar-hide">
          {task.length > 0 ? (
            task.map((item, index) => (
              <TaskList key={index} task={item} onTaskClick={handleTaskClick} />
            ))
          ) : (
            <span className="text-sm text-gray-500">No task found !!</span>
          )}
        </div>
        <Pagination />
      </div>
      {selectedTask && (
        <TaskDetail task={selectedTask} onClose={handleCloseTaskDetails} />
      )}
    </>
  );
};

export default CreatedTask;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCompletedTask, defaultState } from "../../store/taskSlice";
import TaskList from "./TaskList";
import TaskDetail from "./TaskDetail";
import Pagination from "./Pagination";

//
const CompletedTask = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const { comletedTask = [], status } = useSelector((state) => state.task);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Inital render");
    dispatch(getCompletedTask());
    dispatch(defaultState());
  }, []);

  useEffect(() => {
    if (status === "succeeded") {
      dispatch(getCompletedTask());
      dispatch(defaultState());
      console.log(comletedTask);
    }
  }, [status]);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };
  const handleCloseTaskDetails = () => {
    setSelectedTask(null);
  };

  return (
    <>
      <div className="mt-10">
        <h1 className="text-2xl font-bold mb-6">
          Completed Task
          <span className="text-base"> ({comletedTask?.length || 0})</span>
        </h1>
        <div className="bg-white shadow rounded p-4 overflow-auto h-[100vh] scrollbar-hide">
          {comletedTask &&
            comletedTask?.map((task, index) => (
              <TaskList key={index} task={task} onTaskClick={handleTaskClick} />
            ))}
        </div>
      </div>
      {selectedTask && (
        <TaskDetail task={selectedTask} onClose={handleCloseTaskDetails} />
      )}
    </>
  );
};

export default CompletedTask;

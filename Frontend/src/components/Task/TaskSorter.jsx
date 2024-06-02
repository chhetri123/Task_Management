// src/components/TaskSorter.js

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSortingTask, taskWithPagination } from "../../store/taskSlice";
import { sortObject } from "../../utils/helper";

const TaskSorter = () => {
  const [sortValue, setSortValue] = useState("recent");
  const dispatch = useDispatch();
  const { page, limit } = useSelector((state) => state.task);

  const handleSortChange = (e) => {
    setSortValue(e.target.value);
    const sortObj = sortObject(sortValue);
    dispatch(setSortingTask(sortObj));
    dispatch(taskWithPagination({ ...sortObj, page, limit }));
  };

  return (
    <div className="flex items-center space-x-4">
      <label htmlFor="sort" className="text-gray-700"></label>
      <select
        id="sort"
        value={sortValue}
        onChange={handleSortChange}
        className="border border-gray-300 rounded p-2 "
      >
        <option value="recent">Most Recent</option>
        <option value="oldest">Oldest</option>
        <option value="title">Title</option>
        <option value="dueDate">Due Date</option>
      </select>
    </div>
  );
};

export default TaskSorter;

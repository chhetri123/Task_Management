import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, taskWithPagination } from "../../store/taskSlice";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Pagination = () => {
  const dispatch = useDispatch();
  const {
    currentPage,
    sortOptions,
    totalTask = 0,
    limit,
    search,
  } = useSelector((state) => state.task);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  useEffect(() => {
    dispatch(
      taskWithPagination({ ...sortOptions, page: currentPage, limit, search })
    );
  }, [dispatch, currentPage, limit]);

  return (
    <div className="flex items-center justify-center space-x-4 mt-4 mb-5">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center justify-center px-3 py-1 font-medium text-white rounded-lg shadow-md transition-colors duration-300 
        ${
          currentPage === 1
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-700"
        }`}
      >
        <FaAngleLeft className="mr-2" />
        Previous
      </button>

      <span className="text-xl">{currentPage}</span>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={totalTask <= limit * currentPage}
        className={`flex items-center justify-center px-3 py-1 font-medium text-white rounded-lg shadow-md transition-colors duration-300 
        ${
          totalTask <= limit * currentPage
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-700"
        }`}
      >
        Next
        <FaAngleRight className="ml-2" />
      </button>
    </div>
  );
};
export default Pagination;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch, FaTimes } from "react-icons/fa";
import { searchTasks, clearSearch } from "../store/taskSlice";

//
const SearchBar = () => {
  const [query, setQuery] = useState("");
  const { limit } = useSelector((state) => state.task);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(
      searchTasks({
        search: query,
        page: 1,
        limit,
      })
    );
  };
  const handleClear = () => {
    setQuery("");
    dispatch(clearSearch());
  };

  return (
    <>
      <form onSubmit={handleSearch}>
        <div className="flex items-center justify-center mt-5">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tasks by title or desc..."
              className="border border-gray-300 rounded-l-md py-2 pl-10 pr-10 focus:outline-none focus:border-blue-500 w-full"
            />
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 mr-3"
              >
                <FaTimes />
              </button>
            )}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 ml-3">
              <FaSearch />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default SearchBar;

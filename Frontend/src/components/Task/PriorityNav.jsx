import React from "react";
import { useDispatch } from "react-redux";
import { selectTag } from "../../redux/user/userSlice";
const TagNav = ({ tags }) => {
  const dispatch = useDispatch();
  return (
    <>
      {tags.map((tag, index) => (
        <button
          key={index}
          className="bg-gray-200 rounded-full px-4 py-2 m-2 text-sm whitespace-nowrap transition-colors duration-300 hover:bg-gray-300"
          onClick={() => dispatch(selectTag(tag.toLowerCase()))}
        >
          {tag}
        </button>
      ))}
    </>
  );
};

export default TagNav;

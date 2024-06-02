import React from "react";
import { Link } from "react-router-dom";

const PostTag = ({ tags }) => {
  return (
    <div className="flex">
      {tags.map((tag, index) => (
        <Link key={index} to={`/tag/${tag}`} className="mr-2 hover:underline">
          {tag}
        </Link>
      ))}
    </div>
  );
};

export default PostTag;

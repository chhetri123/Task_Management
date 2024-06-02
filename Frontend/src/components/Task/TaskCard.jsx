import React from "react";

import CompletedTask from "./CompletedTask";
import CreatedTask from "./CreatedTask";

const TaskCard = () => {
  return (
    <>
      <div className="flex flex-col justify-center mx-auto sm:flex-row w-[80%] gap-2 sm:gap-20">
        <div className="flex flex-col w-full">
          <CreatedTask />
        </div>
        <div className="flex flex-col w-full">
          <CompletedTask />
        </div>
      </div>
    </>
  );
};

export default TaskCard;

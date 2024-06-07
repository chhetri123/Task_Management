import { FaCheckCircle, FaHourglassHalf, FaRegCircle } from "react-icons/fa";

const formatDate = (date) => {
  const d = new Date(date);
  const month = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  const year = d.getFullYear();
  return [year, month, day].join("-");
};

const dateToMonth_Day = (timestamp) => {
  const date = new Date(timestamp);
  const month = date.toLocaleString("default", { month: "long" }).slice(0, 3);
  const day = date.getDate();
  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return [month, day, `,${time}`].join(" ");
};

switch (status) {
  case "completed":
    return (
      <FaCheckCircle tilte="Task is Completed" className="text-green-500" />
    );
  case "in_progress":
    return (
      <FaHourglassHalf title="Task In Progress" className="text-yellow-500" />
    );
  case "open":
    return <FaRegCircle title="Task Open" className="" />;
  default:
    return null;
}
const getPriorityClass = (priority) => {
  switch (priority) {
    case "low":
      return "bg-green-100 text-green-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    case "high":
      return "bg-red-100 text-red-800";
    default:
      return "";
  }
};

const sortObject = (sort) => {
  switch (sort) {
    case "recent":
      return { sort: "createdAt" };
    case "oldest":
      return { sort: "-createdAt" };
    case "title":
      return { sort: "title" };
    case "dueDate":
      return { sort: "dueDate" };
    case "high":
      return { sort: "priority" };
    default:
      return { sort: "createdAt" };
  }
};

const statusColors = {
  open: "bg-blue-500",
  in_progress: "bg-yellow-500",
  completed: "bg-green-500",
};

const priorityColors = {
  low: "text-green-500",
  medium: "text-yellow-500",
  high: "text-red-500",
};

export {
  formatDate,
  getStatusIcon,
  getPriorityClass,
  dateToMonth_Day,
  sortObject,
  statusColors,
  priorityColors,
};

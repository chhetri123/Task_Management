import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

const initialState = {
  task: [],
  status: "idle",
  error: null,
  totalTask: 0,
  comletedTask: null,
  sortOptions: {},
  currentPage: 1,
  limit: 5,
  search: null,
};

export const createTask = (task) => async (dispatch) => {
  try {
    const response = await api.post("/tasks", task);
    if (response.data.status === "fail") {
      return dispatch(setError(response.data.message));
    }
    if (response.data.status === "success") {
      dispatch(createTaskSuccess(response.data.task));
      dispatch(getAllTask());
      dispatch(getCompletedTask());
    }
  } catch (error) {
    dispatch(setError(error.message));
  }
};
``;

export const editTask = (task) => async (dispatch) => {
  try {
    const response = await api.put(`/tasks/${task._id}`, task);

    if (response.data.status === "fail") {
      return dispatch(setError(response.data.message));
    }
    if (response.data.status === "success") {
      dispatch(editTaskSuccess());
    }
  } catch (error) {
    dispatch(setError(error.message));
  }
};
export const deleteTask = (taskId) => async (dispatch) => {
  try {
    const resposne = await api.delete(`/tasks/${taskId}`);
    if (resposne.status === "success") {
      dispatch(deleteTaskSuccess());
    }
    dispatch(deleteTaskSuccess());
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const getAllTask = (params) => async (dispatch) => {
  try {
    const response = await api.get(`/tasks`, {
      params: {
        "status[ne]": "completed",
      },
    });

    if (response.data.status === "fail") {
      return dispatch(setError(response.data.message));
    }
    if (response.data.status === "success") {
      return dispatch(getAllTaskSuccess(response.data.results));
    }
  } catch (error) {
    dispatch(setError(error.message));
  }
};
export const getCompletedTask = () => async (dispatch) => {
  try {
    const response = await api.get(`/tasks`, {
      params: { status: "completed" },
    });
    if (response.data.status === "fail") {
      return dispatch(setError(response.data.message));
    }
    if (response.data.status === "success") {
      return dispatch(completedTaskSuccess(response.data.tasks));
    }
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const taskWithPagination = (params) => async (dispatch) => {
  try {
    const response = await api.get(`/tasks`, {
      params: {
        "status[ne]": "completed",
        ...params,
      },
    });

    if (response.data.status === "fail") {
      return dispatch(setError(response.data.message));
    }
    if (response.data.status === "success") {
      return dispatch(getTaskWithPagination(response.data.tasks));
    }
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const searchTasks = (params) => async (dispatch) => {
  try {
    const totalTask = await api.get(`/tasks`, {
      params: {
        "status[ne]": "completed",
        search: params.search,
      },
    });
    dispatch(getAllTaskSuccess(totalTask.data.results));
    dispatch(taskWithPagination(params));
    dispatch(setSearch(params.search));
  } catch (error) {
    dispatch(setError(error));
  }
};
const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    defaultState(state) {
      state.status = "idle";
      state.error = null;
    },
    createTaskSuccess(state) {
      state.status = "succeeded";
      state.error = null;
    },
    editTaskSuccess(state) {
      state.status = "succeeded";
      state.error = null;
    },
    deleteTaskSuccess(state) {
      state.status = "succeeded";
      state.error = null;
    },
    completedTaskSuccess(state, action) {
      state.comletedTask = action.payload;
      state.error = null;
    },
    getAllTaskSuccess(state, action) {
      state.totalTask = action.payload;
      state.error = null;
    },
    setError(state, action) {
      if (action.payload.name === "AxiosError") {
        state.error = "Internal Server Erorr . Try Later";
      } else {
        state.error = action.message;
      }
      state.status = "failed";
    },
    setSortingTask(state, action) {
      state.sortOptions = action.payload;
      state.error = null;
    },
    taskInitalState(state) {
      state.task = [];
      state.status = null;
      state.error = null;
      state.comletedTask = [];
    },
    getTaskWithPagination(state, action) {
      state.task = action.payload;
      state.error = null;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
    clearSearch(state) {
      state.search = null;
      state.status = "succeeded";
    },
  },
});

export const {
  editTaskSuccess,
  deleteTaskSuccess,
  getAllTaskSuccess,
  setError,
  defaultState,
  setLoading,
  createTaskSuccess,
  completedTaskSuccess,
  taskInitalState,
  setSortingTask,
  setCurrentPage,
  getTaskWithPagination,
  setSearch,
  clearSearch,
} = taskSlice.actions;

export default taskSlice.reducer;
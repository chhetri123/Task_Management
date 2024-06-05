import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import Login from "../../../src/components/Auth/Login";
import api from "../../../src/services/api";
import { loginUser } from "../../../src/store/authSlice";
const mockStore = configureStore([]);
jest.mock("../../../src/services/api");

describe("Login Component", () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      auth: {
        status: "",
        error: "",
      },
    });
  });

  test("renders without crashing", () => {
    const { getByLabelText, getByRole, getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );
    expect(getByLabelText("Email")).toBeInTheDocument();
    expect(getByLabelText("Password")).toBeInTheDocument();
    expect(getByRole("button", { name: /Login/i })).toBeInTheDocument();
  });

  test("updates email and password fields correctly", () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(getByLabelText("Password"), {
      target: { value: "password123" },
    });

    expect(getByLabelText("Email").value).toBe("test@example.com");
    expect(getByLabelText("Password").value).toBe("password123");
  });
});

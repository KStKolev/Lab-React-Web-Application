import userEvent from "@testing-library/user-event";
import { render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/authSlice";
import cartReducer from "@/redux/cartSlice";
import SignIn from "../signIn";

global.fetch = jest.fn();

const createMockStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      cart: cartReducer,
    },
  });

describe("SignIn Component", () => {
  const mockOnSignInSuccess = jest.fn();
  const mockSignIn = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockClear();
    mockOnSignInSuccess.mockClear();
    mockSignIn.mockClear();
  });

  const renderSignIn = () => {
    const store = createMockStore();
    return render(
      <Provider store={store}>
        <SignIn onSignInSuccess={mockOnSignInSuccess} signIn={mockSignIn} />
      </Provider>,
    );
  };

  it("should render sign in form", () => {
    const { container } = renderSignIn();

    const usernameInput = container.querySelector('input[name="username"]');
    const passwordInput = container.querySelector('input[name="password"]');
    const submitButton = container.querySelector('button[type="submit"]');

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("should show validation errors for empty fields", async () => {
    const user = userEvent.setup();
    const { container } = renderSignIn();

    const submitButton = container.querySelector('button[type="submit"]');
    if (submitButton) {
      await user.click(submitButton);
    }

    await waitFor(() => {
      expect(container.textContent).toContain("Username is required");
      expect(container.textContent).toContain("Password is required");
    });
  });

  it("should successfully sign in with short but valid username", async () => {
    const user = userEvent.setup();
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => ({
        code: 200,
        user: { id: 1, username: "ab" },
      }),
    });

    const { container } = renderSignIn();

    const usernameInput = container.querySelector('input[name="username"]');
    const passwordInput = container.querySelector('input[name="password"]');

    if (usernameInput && passwordInput) {
      await user.type(usernameInput, "ab");
      await user.type(passwordInput, "password123");
      await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 500);
      });
    }

    const submitButton = container.querySelector('button[type="submit"]');
    if (submitButton) {
      await user.click(submitButton);
    }

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith({
        id: 1,
        username: "ab",
      });
      expect(mockOnSignInSuccess).toHaveBeenCalled();
    });
  });

  it("should successfully sign in with valid credentials", async () => {
    const user = userEvent.setup();
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => ({
        code: 200,
        user: { id: 1, username: "testuser" },
      }),
    });

    const { container } = renderSignIn();

    const usernameInput = container.querySelector('input[name="username"]');
    const passwordInput = container.querySelector('input[name="password"]');

    if (usernameInput && passwordInput) {
      await user.type(usernameInput, "testuser");
      await user.type(passwordInput, "password123");
      await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 500);
      });
    }

    const submitButton = container.querySelector('button[type="submit"]');
    if (submitButton) {
      await user.click(submitButton);
    }

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith({
        id: 1,
        username: "testuser",
      });
      expect(mockOnSignInSuccess).toHaveBeenCalled();
    });
  });

  it("should show error message on failed login", async () => {
    const user = userEvent.setup();
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => ({
        code: 401,
        error: "Invalid credentials",
      }),
    });

    const { container } = renderSignIn();

    const usernameInput = container.querySelector('input[name="username"]');
    const passwordInput = container.querySelector('input[name="password"]');

    if (usernameInput && passwordInput) {
      await user.type(usernameInput, "testuser");
      await user.type(passwordInput, "wrongpass");
      await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 500);
      });
    }

    const submitButton = container.querySelector('button[type="submit"]');
    if (submitButton) {
      await user.click(submitButton);
    }

    await waitFor(() => {
      expect(container.textContent).toContain("Invalid credentials");
    });
  });

  it("should match snapshot", () => {
    const { container } = renderSignIn();
    expect(container).toMatchSnapshot();
  });
});

import { API_BASE_URL } from "../utils/constants";

export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

const loginApi = async (email: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    throw new ApiError("Failed to sign in", response.status);
  }
  return response.json();
};

const signUpApi = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  age: string,
) => {
  try {
    const data = await fetch(`${API_BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        age,
      }),
    });
    if (!data.ok) {
      throw new Error("Failed to sign up");
    }
    return data.json();
  } catch (error) {
    return error instanceof Error ? error.message : String(error);
  }
};

const profileApi = async () => {
  const response = await fetch(`${API_BASE_URL}/profile/view`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!response.ok) {
    throw new ApiError("Failed to fetch profile", response.status);
  }
  return response.json();
};

const logoutApi = async () => {
  const response = await fetch(`${API_BASE_URL}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!response.ok) {
    throw new ApiError("Failed to logout", response.status);
  }
};

export { loginApi, profileApi, signUpApi, logoutApi };

import { API_BASE_URL } from "../utils/constants";
import type {
  ConnectionsResponse,
  ReceivedRequestsResponse,
  User,
} from "../utils/types";

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
    const errorMessage = await response.json();
    throw new Error(errorMessage.message || response.statusText);
  }
  return response.json();
};

const signUpApi = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  age: string,
  gender: string,
  bio: string,
  skills: string,
  profilePic: string,
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
        gender,
        bio,
        skills,
        profilePic,
      }),
    });
    if (!data.ok) {
      const errorResponse = await data.json();
      throw new Error(errorResponse.message || "Failed to sign up");
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
    const errorMessage = await response.json();
    throw new Error(errorMessage.message || "Failed to fetch profile");
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
    const errorMessage = await response.json();
    throw new Error(errorMessage.message || response.statusText);
  }
};

const feedApi = async (): Promise<User[]> => {
  const response = await fetch(`${API_BASE_URL}/user/feed`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!response.ok) {
    const errorMessage = await response.json();
    throw new Error(errorMessage.message || response.statusText);
  }
  return response.json() as Promise<User[]>;
};

const updateProfileApi = async (profileData: User): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/profile/edit`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(profileData),
  });
  if (!response.ok) {
    const errorMessage = await response.json();
    throw new Error(errorMessage.message || "Failed to update profile");
  }
};

const connectionsApi = async (): Promise<ConnectionsResponse> => {
  const response = await fetch(`${API_BASE_URL}/user/connections`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!response.ok) {
    const errorMessage = await response.json();
    throw new Error(errorMessage.message || response.statusText);
  }
  return response.json() as Promise<ConnectionsResponse>;
};

const receivedRequestsApi = async (): Promise<ReceivedRequestsResponse> => {
  const response = await fetch(`${API_BASE_URL}/user/receivedRequests`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!response.ok) {
    const errorMessage = await response.json();
    throw new Error(errorMessage.message || response.statusText);
  }
  return response.json() as Promise<ReceivedRequestsResponse>;
};

const reviewRequestsApi = async (
  status: "accept" | "reject",
  requestId: string,
): Promise<void> => {
  const response = await fetch(
    `${API_BASE_URL}/review/${status}/${requestId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );
  if (!response.ok) {
    const errorMessage = await response.json();
    throw new Error(errorMessage.message || response.statusText);
  }
};

export {
  loginApi,
  signUpApi,
  profileApi,
  logoutApi,
  feedApi,
  updateProfileApi,
  connectionsApi,
  receivedRequestsApi,
  reviewRequestsApi,
};

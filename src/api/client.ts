const BASE_URL = "http://localhost:3000";

const loginApi = async (email: string, password: string) => {
  try {
    const data = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!data.ok) {
      throw new Error("Failed to sign in");
    }
    return data.json();
  } catch (error) {
    return error instanceof Error ? error.message : String(error);
  }
};

const signUpApi = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  age: string,
) => {
  try {
    const data = await fetch(`${BASE_URL}/signup`, {
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

export { loginApi, signUpApi };

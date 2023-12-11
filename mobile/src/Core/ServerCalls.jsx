
const API_BASE_URL = process.env.API_BASE_URL || "localhost:3000";


export const getTokenWithEmailAndPass = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Failed to get token");
    }

    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error("Error getting token:", error);
    throw error;
  }
};

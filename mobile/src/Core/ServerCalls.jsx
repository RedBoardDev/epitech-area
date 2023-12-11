import config from '../config';


export const LoginEmailPass = async (email, password) => {
  try {
    const response = await fetch(`${config.API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Failed to get token ", response.json());
    }

    const data = await response.json();
    return data.token;
  } catch (error) {
    console.log("Error getting token : ", error);
    throw error;
  }
};

export const RegisterEmailPass = async (email, password) => {
    console.log("API URL : " + config.API_BASE_URL)
    
      const response = await fetch(`${config.API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.msg);
      }
      return data.token;
  };
  

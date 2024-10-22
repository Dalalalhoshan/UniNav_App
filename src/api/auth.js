import instance from "./index";
import { storeToken } from "./storage";

const signup = async (data) => {
  try {
    const response = await instance.post("/auth/register", data);
    storeToken(response.data.token);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

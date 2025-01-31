import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const signUpUser = async (userData) => {
  try {
    const res = await axios.post(
      "http://localhost:8000/api/v1/users/register",
      userData
    );

    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default function useSignup() {
  return useMutation({
    mutationFn: signUpUser,
    onSuccess: (data) => {
      console.log("Sign up successfull", data);
    },
    onError: (error) => {
      console.log("Error occured during sing up in useSignup hook:",
        error?.message || error
      )
    }
  })
}

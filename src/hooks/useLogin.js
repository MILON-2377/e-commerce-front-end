import { useMutation } from "@tanstack/react-query";
import axios from "axios"



const logInUser = async(userData) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await axios.post(`${apiUrl}users/login`, userData);
    return res.data;
}

export default function useLogin() {
  return useMutation(
    {
        mutationFn: logInUser,
        onSuccess: (data) => {
            console.log("user log in success:", data);
        },
        onError: (error) => {
            console.log("error occured during log-in user in useLogin hook:", error?.message || error);
        }
    }
  )
}

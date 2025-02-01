import apiUrl from "@/utils/api";
import { useMutation } from "@tanstack/react-query";



const logInUser = async(userData) => {
    const res = await apiUrl.post(`/users/login`, userData);
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

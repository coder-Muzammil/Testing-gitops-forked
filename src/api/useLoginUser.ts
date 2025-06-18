import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { loginUrl } from "./apiConstants";
import { UserDetailType } from "./useLoginUser.types";

export default function useLoginUser() {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (data: { email: string; password: string }) => {
      return axios.post<UserDetailType>(
        loginUrl,
        { ...data, portal: "user" },
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
          withCredentials: true,
        },
      );
    },
  });
}

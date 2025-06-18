import { refreshUrl } from "./apiConstants";
import { UserDetailType } from "./useLoginUser.types";
import { useUser } from "../stores/useUser";
import axios from "axios";

export const useRefreshToken = () => {
  const { refreshToken } = useUser();

  async function refresh() {
    return await axios.post<UserDetailType>(
      refreshUrl,
      {
        refreshToken: refreshToken || "",
      },
      {
        withCredentials: true,
      },
    );
  }

  return refresh;
};

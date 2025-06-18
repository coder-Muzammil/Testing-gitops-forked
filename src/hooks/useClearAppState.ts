import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "../stores/useUser";
import { browserStorageKeys } from "../utils/constants";

function useClearAppState() {
  const { clearUser } = useUser();
  const queryClient = useQueryClient();

  function clearAppState() {
    // if we dont remove the refresh token, he is still in AuthWrapper and refresh function will be called and user will be set again
    // also, if user is logging out it means that he does not want to be logged in anymore on this machine
    localStorage.removeItem(browserStorageKeys.refreshToken);
    localStorage.removeItem(browserStorageKeys.selectedRoute);
    localStorage.removeItem(browserStorageKeys.selectedSubRoute);
    // clearing user state
    clearUser();
    // clearing all queries
    queryClient.clear();
  }

  return clearAppState;
}

export default useClearAppState;

import { Navigate, Outlet } from "react-router-dom";
import RightSideBar from "../Sidebar/RightSideBar";
import { useUser } from "../../../stores/useUser";
import BasicRoutesSidebar from "../Sidebar/BasicRoutesSidebar";
import { useRefreshToken } from "../../../api/useRefreshToken";
import { browserStorageKeys } from "../../../utils/constants";
import { useEffect, useState } from "react";
import MainAppLoader from "../../uiComponents/MainAppLoader";

function AuthWrapper() {
  const { userName, setUser } = useUser();
  const refresh = useRefreshToken();
  const [loading, setLoading] = useState(true);

  const refreshToken =
    localStorage.getItem(browserStorageKeys.refreshToken) ?? "";

  useEffect(() => {
    async function refreshUser() {
      if ((refreshToken && userName) || !refreshToken) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await refresh();

        setUser(data);

        setLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    refreshUser().catch((error: unknown) => {
      console.log(error);
    });
  }, [refreshToken, userName, setUser, refresh]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-fuchsia-950">
        <MainAppLoader />
      </div>
    );
  }

  if (!userName) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="to-purple-100-50 grid h-screen grid-cols-[auto_1fr_auto] overflow-hidden bg-white dark:bg-slate-900 ">
      <BasicRoutesSidebar />
      <Outlet />
      <RightSideBar />
    </div>
  );
}
export default AuthWrapper;

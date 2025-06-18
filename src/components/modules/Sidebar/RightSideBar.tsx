import { FiLogOut } from "react-icons/fi";
import { useLogoutUser } from "../../../api/useLogoutUser";
import useClearAppState from "../../../hooks/useClearAppState";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import useThemeContext from "../Theme/useThemeContext";
const RightSideBar = () => {
  const { mutate: logout } = useLogoutUser();
  const clearAppState = useClearAppState();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useThemeContext();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess() {
        navigate("/login", { replace: true });

        clearAppState();
      },
      onError(error: unknown) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.statusText ?? "");
          console.error(error.response?.statusText);
          return;
        } else if (error instanceof Error) {
          toast.error("Server error occurred");
          console.error(error.message);
          return;
        }

        toast.error("An error occurred");
      },
    });
  };

  return (
    <div
      className={` relative flex w-[50px] flex-col items-center justify-center rounded-bl-xl rounded-tl-xl bg-gradient-to-b from-lavender-600 to-lavender-900 px-2 dark:bg-gradient-to-b dark:from-slate-500 dark:to-slate-800 `}
    >
      <div className="absolute bottom-32 h-0.5 w-full bg-gradient-to-r from-transparent via-white/50 to-transparent" />
      <button onClick={toggleTheme} className="absolute bottom-16 mx-auto mb-4">
        {theme === "dark" ? (
          <MdLightMode className="text-2xl text-white" />
        ) : (
          <MdDarkMode className="text-2xl text-white" />
        )}
      </button>
      <button
        className="absolute bottom-10 flex cursor-pointer flex-row gap-2 text-white"
        title="Logout"
        onClick={handleLogout}
      >
        <FiLogOut />
      </button>
    </div>
  );
};

export default RightSideBar;

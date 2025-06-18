import { useState } from "react";
import useLoginUser from "../api/useLoginUser";
import axios from "axios";
import LoginForm from "../components/modules/Login/LoginForm";
import toast from "react-hot-toast";
import { useUser } from "../stores/useUser";
import { useNavigate } from "react-router-dom";
import { UserDetailSchema } from "../api/useLoginUser.types";

function Login() {
  const [formDetails, setFormDetails] = useState({
    email: "",
    password: "",
  });
  const [persistLogin, setPersistLogin] = useState(true);
  const {
    mutate: submitLoginDetails,
    isPending,
    isError,
    error,
  } = useLoginUser();
  const { setUser } = useUser();
  const navigate = useNavigate();

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormDetails({
      ...formDetails,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formDetails.email || !formDetails.password) {
      toast.error("Please fill in email and password");
      return;
    }

    submitLoginDetails(formDetails, {
      onSuccess: (data) => {
        UserDetailSchema.parse(data.data);
        const refreshToken = data.data.refreshToken;
        if (persistLogin) {
          localStorage.setItem("refreshToken", refreshToken);
        }
        setUser(data.data);
        navigate("/");
      },
      onError: (error: unknown) => {
        if (axios.isAxiosError<{ errors: string }>(error)) {
          if (error.status === 500) {
            toast.error("Server error, please try again later");
            return;
          }
          toast.error(error.response?.data.errors ?? error.message);
        }
      },
    });
  }

  let errMessage = "";

  if (error && axios.isAxiosError<{ errors: string }>(error)) {
    errMessage = error.response?.data.errors ?? error.message;
  }

  return (
    <div
      className="flex h-screen w-full items-center justify-center 
             bg-[radial-gradient(circle,_#b69fd3,_#654883)]
             dark:bg-[radial-gradient(circle,_#1a1a2e,_#0f0f1e)]"
    >
      <LoginForm
        emailState={formDetails.email}
        passwordState={formDetails.password}
        isPending={isPending}
        isError={isError}
        errMessage={errMessage}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        persistLogin={persistLogin}
        setPersistLogin={setPersistLogin}
      />
    </div>
  );
}
export default Login;

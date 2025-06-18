import ButtonGradientPrimary from "../../primitives/ButtonGradientPrimary";
import InputWithLabel from "../../primitives/InputWithLabel";
import fbxLogo from "../../../assets/fbxLogo.png";
import { twMerge } from "tailwind-merge";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useState } from "react";

type LoginFormProps = {
  emailState: string;
  passwordState: string;
  isPending: boolean;
  isError: boolean;
  errMessage: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  persistLogin: boolean;
  setPersistLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

function LoginForm(props: LoginFormProps) {
  const {
    emailState,
    passwordState,
    isPending,
    isError,
    errMessage,
    handleSubmit,
    handleInputChange,
  } = props;
  const [showPass, setShowPass] = useState(false);
  return (
    <form
      className="grid w-[350px] grid-cols-1 gap-6 rounded-lg bg-white/20 px-6 py-16 2xl:w-[500px] 2xl:gap-10 2xl:py-24"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-center">
        <img src={fbxLogo} alt="" className="w-1/2" />
      </div>
      <div className="text-center">
        <h1 className="text-lg font-semibold text-lavender-700 dark:text-white/80 2xl:text-2xl 2xl:font-bold">
          CMU-Forbmax Platform
        </h1>
      </div>
      <InputWithLabel
        labelProps={{
          children: "",
          htmlFor: "email",
        }}
        inputProps={{
          name: "email",
          type: "email",
          id: "email",
          placeholder: "Email",
          value: emailState,
          onChange: handleInputChange,
        }}
      />
      <div className="relative w-full">
        <InputWithLabel
          labelProps={{
            children: "",
            htmlFor: "password",
          }}
          inputProps={{
            name: "password",
            type: showPass ? "text" : "password",
            id: "password",
            placeholder: "Password",
            value: passwordState,
            onChange: handleInputChange,
          }}
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2"
          onClick={() => {
            setShowPass(!showPass);
          }}
        >
          {!showPass && <LuEye />}
          {showPass && <LuEyeOff />}
        </button>
      </div>
      <ButtonGradientPrimary type="submit" isLoading={isPending}>
        Login
      </ButtonGradientPrimary>

      <div
        className={twMerge(
          "animate-slideUpFadeIn text-center text-xs text-fuchsia-950",
        )}
      >
        {!isError && <p className="invisible">just placeholder</p>}
        {isError && <p>{errMessage}</p>}
      </div>
    </form>
  );
}

export default LoginForm;

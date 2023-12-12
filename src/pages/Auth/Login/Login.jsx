import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import GoogleButton from "../../../components/GoogleButton/GoogleButton";
import AuthLayout from "../AuthLayout";
import Title from "../../../components/Title/Title";
import ToggleShowPassword from "../../../components/ToggleShowPassword/ToggleShowPassword";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useGetEmail from "../../../hooks/Auth/useGetEmail";
import useToast from "../../../hooks/Toaster/useToast";
import useAuth from "../../../hooks/Auth/useAuth";
import Loader from "../../../components/Loaders/Loader";

const Login = () => {
  const inputStyle = {
    borderBottom: "2px solid rgba(255, 255, 255, 0.8)",
    background: "transparent",
    fontSize: "20px",
    fontWeight: "400",
    color: "#ffffff",
    width: "100%",
    padding: "3px 4px",
    outline: "none",
  };

  const getEmail = useGetEmail;
  const toast = useToast;
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);

  const { register, handleSubmit } = useForm();

  const handleLogin = async (data) => {
    setLoggingIn(true);

    const emailUsername = data?.emailUsername;
    const password = data?.password;

    let email;

    if (emailUsername.includes(".com")) {
      email = emailUsername;
    } else {
      const getUserEmail = await getEmail(emailUsername);

      if (getUserEmail?.error) {
        setLoggingIn(false);
        return toast(
          getUserEmail?.error?.message || "Error, please try again later",
          "error"
        );
      }

      if (getUserEmail?.message === "success") {
        email = getUserEmail?.result;
      } else {
        setLoggingIn(false);
        return toast("Invalid username", "error");
      }
    }

    login(email, password)
      .then((res) => {
        if (res?.user) {
          toast(`Logged in as ${res?.user?.displayName}`, "success");
          setLoggingIn(false);
          return;
        } else {
          return toast("Error", "error");
        }
      })
      .catch((error) => {
        setLoggingIn(false);
        return toast(error?.message || "Invalid credentials", "error");
      });
  };

  return (
    <section className="page">
      <Helmet>
        <title>Login | SKISC HSC 2025</title>
      </Helmet>

      <AuthLayout title={`LOGIN`}>
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="shadow-lg text-[18px] rounded-[10px] bg-[#040722] py-8 px-6 w-full max-w-md mx-auto flex flex-col gap-[30px]"
        >
          <Title className="mb-[-20px] md:hidden">Login</Title>
          <input
            style={inputStyle}
            type="text"
            placeholder="Email or Username"
            {...register("emailUsername", { required: true })}
          />
          <div>
            <div className="relative">
              <input
                style={inputStyle}
                type={showPassword ? "text" : "password"}
                autoComplete="true"
                placeholder="Password"
                {...register("password", { required: true })}
              />
              <ToggleShowPassword
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            </div>
            <Link
              to="/reset-password"
              className="text-[#9255F5] block text-right text-[17px] mt-[3px]"
            >
              Forgot password?
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <button
              type="submit"
              className="btn w-full bg-gradient-to-r hover:bg-gradient-to-l from-[#2B33D2] to-[#7D1FC8] rounded-[10px] text-[23px] text-white font-[400] p-[8px] disabled:from-[#0F0C36] disabled:to-[#0F0C36] border-none outline-none"
              disabled={loggingIn}
            >
              {loggingIn ? <Loader /> : "Login"}
            </button>
            <div className="divider my-0">or</div>
            <GoogleButton />
            <span className="text-[#CDCDD3] block text-center">
              New to this site?{" "}
              <Link to="/register" className="text-[#9255F5]">
                Register
              </Link>
            </span>
          </div>
        </form>
      </AuthLayout>
    </section>
  );
};
export default Login;

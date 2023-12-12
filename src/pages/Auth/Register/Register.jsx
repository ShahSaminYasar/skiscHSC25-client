import { Helmet } from "react-helmet";
import AuthLayout from "../AuthLayout";
import GoogleButton from "../../../components/GoogleButton/GoogleButton";
import { Link } from "react-router-dom";
import { FaCircleInfo } from "react-icons/fa6";
import Title from "../../../components/Title/Title";
import ToggleShowPassword from "../../../components/ToggleShowPassword/ToggleShowPassword";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useAxiosPublic from "../../../hooks/Axios/useAxiosPublic";
import axios from "axios";
import useAuth from "../../../hooks/Auth/useAuth";
import useToast from "../../../hooks/Toaster/useToast";
import Loader from "../../../components/Loaders/Loader";

const Register = () => {
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

  const axiosPublic = useAxiosPublic();
  const { register: authRegister, updateUser } = useAuth();
  const toast = useToast;

  const [showPassword, setShowPassword] = useState(false);
  const [handle, setHandle] = useState("");
  const [username, setUsername] = useState("");
  const [registering, setRegistering] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm();

  const handleRegister = async (data) => {
    setRegistering(true);

    // 01. Check username
    if (username === "") {
      setRegistering(false);
      return toast("Please provide an username", "error");
    }

    // 02. Set image url (if any) or "" if not uploaded
    let image_url = "";
    if (data?.dp?.[0]) {
      const imageFile = data?.dp?.[0];
      const imgbb = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_APIKEY
        }`,
        { image: imageFile },
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );
      // console.log("IMGBB response => ", imgbb);
      if (imgbb?.data?.success === true) {
        image_url = imgbb?.data?.data?.display_url;
      } else {
        setRegistering(false);
        return toast("Couldn't upload image, please try again.", "error");
      }
    }

    // 03. Make user object
    const user = {
      name: data?.fullName,
      username: username,
      email: data?.email,
      phone: Number(data?.phoneNumber),
      dp: image_url,
    };

    // The user post operations begin
    try {
      // POST user in DB or return if already in there
      const postUser = await axiosPublic.post("/users", user);
      if (postUser?.data?.message !== "success") {
        setRegistering(false);
        return toast(
          postUser?.data?.message || "Failed to post user in DB",
          "error"
        );
      }

      // Register on Firebase ( or return if already registerd [Not possible ig yh] )
      const registerUser = await authRegister(data?.email, data?.password);
      if (!registerUser?.user) {
        setRegistering(false);
        return toast("Failed to register, please try again.", "error");
      }

      // Update user Name and DP on Firebase
      updateUser(user?.name, user?.dp)
        .then(() => {
          toast(`Registered as ${user?.name}`, "success");
          reset();
          setHandle("");
          setUsername("");
          setRegistering(false);
          return;
        })
        .catch((error) => {
          setRegistering(false);
          return toast(
            error?.message ||
              "Registered but failed to update profile, please contact support.",
            "error"
          );
        });
    } catch (error) {
      setRegistering(false);
      return toast(error?.message || "Error", "error");
    }
  };

  useEffect(() => {
    if (!handle) {
      setUsername("");
      return;
    }
    const delayTimer = setTimeout(() => {
      axiosPublic
        .get(`/username?name=${handle}`)
        .then((res) => {
          setUsername(res?.data?.result);
        })
        .catch((error) => {
          console.error(error);
        });
    }, 350);

    return () => clearTimeout(delayTimer);
  }, [handle, axiosPublic]);

  return (
    <section className="page">
      <Helmet>
        <title>Register | SKISC HSC 2025</title>
      </Helmet>

      <AuthLayout title={`REGISTER`}>
        <form
          onSubmit={handleSubmit(handleRegister)}
          className="shadow-lg text-[18px] rounded-[10px] bg-[#040722] p-5 px-6 w-full max-w-md mx-auto flex flex-col gap-[30px]"
        >
          <Title className="mb-[-20px] md:hidden">Register</Title>
          <span className="bg-transparent text-[#5329CD] text-[22px] font-light outline-none -mb-4 block w-full rounded-md p-2 text-center bg-[#0B0F2E] border-2 border-[#5329CD] shadow-sm">
            @{username || "Provide a handle"}
          </span>
          <div>
            <input
              style={inputStyle}
              type="text"
              placeholder="Full Name"
              {...register("fullName", { required: true })}
            />
            {errors.fullName?.type === "required" && (
              <p className="text-red-500 text-base font-normal block text-left my-1">
                Your name is required
              </p>
            )}
          </div>
          <div>
            <input
              style={inputStyle}
              type="text"
              placeholder="Your handle for interaction (username)"
              {...register("nickname", {
                required: true,
                onChange: (e) => setHandle(e.target.value),
              })}
            />
            {errors.nickname?.type === "required" && (
              <p className="text-red-500 text-base font-normal block text-left my-1">
                A nickname is required for your &apos;username&apos;
              </p>
            )}
          </div>
          <div>
            <input
              style={inputStyle}
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500 text-base font-normal block text-left my-1">
                An email is required
              </p>
            )}
          </div>
          <div>
            <input
              style={inputStyle}
              type="number"
              placeholder="Phone Number"
              {...register("phoneNumber", { required: true })}
            />
            {errors.phoneNumber?.type === "required" && (
              <p className="text-red-500 text-base font-normal block text-left my-1">
                Phone number is required
              </p>
            )}
          </div>
          <div>
            <label className="block text-[20px] text-white text-opacity-60 mb-2">
              Profile Picture (Not Mandatory)
            </label>
            <div className="rounded-md p-3 border-md bg-[#0B0F2E] border-[3px] border-[#3C3F58]">
              <input
                type="file"
                accept="image/*"
                className="text-white w-full"
                {...register("dp")}
              />
            </div>
          </div>
          <div>
            <div className="relative">
              <input
                style={inputStyle}
                type={showPassword ? "text" : "password"}
                autoComplete="true"
                placeholder="Password"
                {...register("password", {
                  required: true,
                  pattern:
                    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/,
                })}
              />
              <ToggleShowPassword
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            </div>
            {errors.password?.type === "required" && (
              <p className="text-red-500 text-base font-normal block text-left my-1">
                A password is required
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-500 text-base font-normal block text-left my-1">
                Password must have minimum 6 characters and must include at
                least 1 uppercase letter, 1 number, and 1 special character.
              </p>
            )}
          </div>
          <div className="relative">
            <input
              style={inputStyle}
              type="password"
              autoComplete="true"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: true,
                validate: (val) => {
                  if (watch("password") !== val) {
                    return "Paswords do not match";
                  }
                },
              })}
            />
            {errors.confirmPassword?.type === "required" && (
              <p className="text-red-500 text-base font-normal block text-left my-1">
                Retype your password to confirm
              </p>
            )}
            {errors.confirmPassword?.type === "validate" && (
              <p className="text-red-500 text-base font-normal block text-left my-1">
                Passwords do not match
              </p>
            )}
          </div>
          {isValid && (
            <p className="text-green-500 text-lg font-normal block text-left my-[-10px]">
              Perfect!
            </p>
          )}
          <div className="flex flex-col gap-4">
            <button
              type="submit"
              className="btn w-full bg-gradient-to-r hover:bg-gradient-to-l from-[#2B33D2] to-[#7D1FC8] rounded-[10px] text-[23px] text-white font-[400] p-[8px] disabled:from-[#0F0C36] disabled:to-[#0F0C36]"
              disabled={registering}
            >
              {registering ? <Loader /> : "Register"}
            </button>
            <div className="divider my-0">or</div>
            <GoogleButton />
            <span className="text-[#CDCDD3] block text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-[#9255F5]">
                Login
              </Link>
            </span>
            <span className="text-[#818390] flex w-full justify-center gap-3 items-center text-left">
              <FaCircleInfo className="text-[40px]" /> Don&apos;t worry, your
              contact details won&apos;t be visible to others.
            </span>
          </div>
        </form>
      </AuthLayout>
    </section>
  );
};
export default Register;

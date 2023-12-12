import GoogleIcon from "../../assets/GoogleIcon.png";
import useAuth from "../../hooks/Auth/useAuth";
import useToast from "../../hooks/Toaster/useToast";
import { useState } from "react";

const GoogleButton = () => {
  const { googleLogin } = useAuth();
  const toast = useToast;

  const [loggingIn, setLoggingIn] = useState(false);

  const handleGoogleLogin = () => {
    setLoggingIn(true);
    googleLogin()
      .then((res) => {
        if (res?.user) {
          return toast(`Logged in as ${res?.user?.displayName}`, "success");
          // return navigate("/");
        } else {
          toast("Unknown error occured", "error");
        }
        setLoggingIn(false);
      })
      .catch((error) => {
        toast(error?.message || "Error");
        setLoggingIn(false);
      });
  };
  return (
    <button
      onClick={handleGoogleLogin}
      type="button"
      disabled={loggingIn}
      className="btn w-full flex items-center justify-center gap-2 bg-white rounded-[10px] text-[18px] sm:text-[23px] text-[#1976D2] font-[500] p-[8px] hover:bg-[#4319ff] hover:text-white disabled:bg-[#1f1841] disabled:text-slate-400 border-none outline-none"
    >
      <img
        src={GoogleIcon}
        alt="Google Logo Icon"
        className="w-[21px] h-[21px]"
      />{" "}
      Continue with Google
    </button>
  );
};
export default GoogleButton;

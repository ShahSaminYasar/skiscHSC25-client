import { useState } from "react";
import Loader from "../../../components/Loaders/Loader";
import Title from "../../../components/Title/Title";
import useAuth from "../../../hooks/Auth/useAuth";
import useToast from "../../../hooks/Toaster/useToast";
import { Link } from "react-router-dom";

const PasswordReset = () => {
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

  const { resetPassword } = useAuth();
  const toast = useToast;

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const handleReset = (e) => {
    e.preventDefault();
    setSending(true);
    const email = e.target.email.value;
    setResetEmail(email);
    resetPassword(email)
      .then(() => {
        setSent(true);
        setSending(false);
      })
      .catch((error) => {
        console.error(error);
        toast(error?.message || "Failed to send reset email", "error");
        setSending(false);
      });
  };

  return !sent ? (
    <section className="pageCenter">
      <form
        onSubmit={handleReset}
        className="shadow-lg text-[18px] rounded-[10px] bg-[#040722] py-6 px-6 w-full max-w-md mx-auto flex flex-col gap-[30px]"
      >
        <Title className="mb-[-20px]">Reset Password</Title>
        <input
          style={inputStyle}
          type="email"
          name="email"
          placeholder="Your Email"
        />
        <button
          type="submit"
          style={{
            borderRadius: "8px",
            border: "2px solid rgba(255, 255, 255, 0.80)",
            background:
              "linear-gradient(95deg, #030A3A 0%, rgba(94, 11, 101, 0.00) 100%)",
          }}
          className="p-3 text-[18px] text-center text-white text-opacity-80"
          disabled={sending}
        >
          {sending ? <Loader /> : "Send link"}
        </button>
      </form>
    </section>
  ) : (
    <section className="pageCenter">
      <p className="text-lg text-slate-300 block text-center w-full max-w-sm">
        A reset mail was sent to your email:
        <br />
        <span className="text-slate-50 font-semibold">{resetEmail}</span>
      </p>
      <p className="text-lg text-[#5D27CC] block text-center w-full max-w-sm mt-5">
        <Link to="/login">Login page</Link>
      </p>
    </section>
  );
};
export default PasswordReset;

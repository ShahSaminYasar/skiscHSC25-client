import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/Axios/useAxiosPublic";
import useAuth from "../../../hooks/Auth/useAuth";
import Loader from "../../../components/Loaders/Loader";
import useToast from "../../../hooks/Toaster/useToast";

const Credentials = () => {
  const axiosPublic = useAxiosPublic();
  const { user, setUser } = useAuth();
  const toast = useToast;

  const [handle, setHandle] = useState("");
  const [username, setUsername] = useState("");
  const [sending, setSending] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    const form = e.target;
    if (!username) return toast("Username is required", "error");
    const phone = Number(form?.phone_input?.value);

    axiosPublic
      .put("/auth-user", { username, phone, email: user?.email })
      .then((res) => {
        setSending(false);
        if (res?.data?.message === "success") {
          setUser(res?.data?.result);
          return toast("Thank you. Please wait for verification", "success");
        } else {
          return toast(res?.data?.message || "An error occured", "error");
        }
      })
      .catch((error) => {
        setSending(false);
        return toast(
          error?.message || "An error occured. Please try again",
          "error"
        );
      });
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
    <section className="pageCenter">
      <form
        onSubmit={handleSubmit}
        className="shadow-lg text-[18px] rounded-[10px] bg-[#040722] py-8 px-6 w-full max-w-md mx-auto flex flex-col gap-[30px]"
      >
        <span className="bg-transparent text-[#5329CD] text-[22px] font-light outline-none -mb-4 block w-full rounded-md p-2 text-center bg-[#0B0F2E] border-2 border-[#5329CD] shadow-sm">
          @{username || "Provide a handle"}
        </span>
        <input
          type="text"
          style={inputStyle}
          required
          placeholder="Your handle for interaction (username)"
          name="username_input"
          defaultValue={""}
          onChange={(e) => setHandle(e.target.value)}
        />
        <input
          type="number"
          style={inputStyle}
          required
          placeholder="Phone number (Active)"
          name="phone_input"
          defaultValue={user?.phone || "Phone here"}
        />
        <button
          type="submit"
          style={{
            borderRadius: "8px",
            border: "2px solid rgba(255, 255, 255, 0.80)",
            background:
              "linear-gradient(95deg, #030A3A 0%, rgba(94, 11, 101, 0.00) 100%)",
          }}
          className="btn p-3 text-[18px] text-center text-white text-opacity-80"
          disabled={sending}
        >
          {sending ? <Loader /> : "Submit"}
        </button>
      </form>
    </section>
  );
};
export default Credentials;

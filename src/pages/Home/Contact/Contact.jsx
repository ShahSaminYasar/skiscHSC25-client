import { useState } from "react";
import Container from "../../../layouts/Container/Container";
import useAxiosSecure from "../../../hooks/Axios/useAxiosSecure";
import useToast from "../../../hooks/Toaster/useToast";
import useAuth from "../../../hooks/Auth/useAuth";
import moment from "moment";

const Contact = () => {
  const axiosSecure = useAxiosSecure();
  const toast = useToast;
  const { user } = useAuth();

  const [sending, setSending] = useState(false);

  const handleSubmitMessage = async (e) => {
    e.preventDefault();
    setSending(true);
    const form = e.target;
    const type = form.type.value;
    const message = form.message.value;
    const data = {
      type,
      message,
      from: user?.username,
      date: moment().format(),
    };
    try {
      const response = await axiosSecure.post("/messages", { message: data });
      if (response?.data?.message === "success") {
        setSending(false);
        return toast("Message sent", "success");
      } else {
        setSending(false);
        return toast(
          response?.data?.message || "Couldn't send message, please try again",
          "error"
        );
      }
    } catch (error) {
      setSending(false);
      return toast(
        error?.message || "Couldn't send message, please try again",
        "error"
      );
    }
  };
  return (
    <section className="py-20 px-3 bg-[#04071F]">
      <Container className={`grid mdd:grid-cols-2 gap-12 items-center`}>
        {/* Left - Text */}
        <div className="xss:mx-auto mdd:mx-0">
          <span className="text-[20px] font-[300] block text-white text-opacity-60 leading-[10px] mb-[10px]">
            Got any
          </span>
          <span className="text-[50px] font-[700] leading-[60px] inline-block relative">
            <span className="text-[#0291E5]">COMPLAINTS</span>
            <span className="text-[#868893]">,</span>
            <span className="block text-[#868893]">
              <span className="text-[#9255F5]">BUGS</span>,{" "}
              <span className="text-[#00ECA5]">IDEAS</span>
            </span>
            <span className="absolute text-[150px] font-[700] text-white text-opacity-10 top-[49%] -right-[17px] -translate-y-1/2">
              ?
            </span>
          </span>
          <span className="text-[20px] font-[200] block text-white text-opacity-60 leading-[10px] mt-3">
            Message us now, we&apos;re all ears!
          </span>
        </div>

        {/* Right - Form */}
        <div
          style={{
            background: "linear-gradient(290deg, #2C33D2, #7D1FC8)",
            padding: "2px",
            borderRadius: "12px",
            overflow: "hidden",
          }}
          className="block w-full max-w-md mx-auto"
        >
          <form
            onSubmit={handleSubmitMessage}
            className="bg-[#070B2A] rounded-[12px] p-4 text-[18px] flex flex-col gap-4"
          >
            {/* Category */}
            <div
              style={{
                background: "linear-gradient(290deg, #2C33D2, #7D1FC8)",
                padding: "2px",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <select
                name="type"
                className="bg-[#070B2A] rounded-[12px] p-4 block w-full"
              >
                <option value="support">Help & Support</option>
                <option value="request-feature">Request a feature</option>
                <option value="report-bug">Report a bug/glitch</option>
                <option value="complaint">Got a complaint</option>
                <option value="other">Other</option>
              </select>
            </div>
            {/* Message */}
            <div
              style={{
                background: "linear-gradient(290deg, #2C33D2, #7D1FC8)",
                padding: "2px",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <textarea
                name="message"
                placeholder="Message"
                className="bg-[#070B2A] rounded-[12px] p-4 block w-full resize-y min-h-[200px] outline-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn buttonTwo w-fit ml-auto"
              style={{ padding: "10px 25px" }}
              disabled={sending}
            >
              {sending ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
};
export default Contact;

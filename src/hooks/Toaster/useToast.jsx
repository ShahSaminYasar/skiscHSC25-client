import toast from "react-hot-toast";

const useToast = (text, type) => {
  if (type === "success")
    return toast.success(text, {
      style: {
        background: "#010313",
        border: "2px solid #61D345",
        color: "#61D345",
        fontWeight: 500,
        fontSize: "16px",
      },
    });

  if (type === "error")
    return toast.error(text, {
      style: {
        background: "#010313",
        border: "2px solid #FF4B4B",
        color: "#FF4B4B",
        fontWeight: 500,
        fontSize: "16px",
      },
    });

  if (type === "info")
    return toast(text, {
      style: {
        background: "#010313",
        border: "2px solid #0CEFE3",
        color: "#0CEFE3",
        fontWeight: 500,
        fontSize: "16px",
      },
    });
};
export default useToast;

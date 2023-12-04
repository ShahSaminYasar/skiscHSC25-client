import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const ToggleShowPassword = ({ showPassword, setShowPassword }) => {
  return (
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="text-[22px] absolute top-1/2 -translate-y-1/2 right-3"
    >
      {!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
    </button>
  );
};
export default ToggleShowPassword;

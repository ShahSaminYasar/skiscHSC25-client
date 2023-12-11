import { LuRefreshCw } from "react-icons/lu";
import useAuth from "../../../hooks/Auth/useAuth";
import LoaderPage from "../../../components/Loaders/LoaderPage";
import { Navigate } from "react-router-dom";
import VerifyingGIF from "../../../assets/verifying.gif";

const Verifying = () => {
  const { loading, user } = useAuth();

  if (loading) return <LoaderPage />;

  if (!user) return <Navigate to="/login" />;

  if (user?.verified === true) return <Navigate to="/" />;

  if (user?.username === "") return <Navigate to="/credentials" />;

  const buttonStyle = {
    borderRadius: "8px",
    border: "2px solid rgba(255, 255, 255, 0.80)",
    background:
      "linear-gradient(95deg, #030A3A 0%, rgba(94, 11, 101, 0.00) 100%)",
  };

  return (
    <section className="page text-white text-opacity-80 text-[20px] flex flex-col items-center justify-center gap-2 text-center">
      <img
        src={VerifyingGIF}
        alt="Verification ongoing"
        className="my-[-20px]"
      />
      <p>
        We are verifying your identity.
        <br />
        Come back after some time.
      </p>
      <button
        onClick={() => window.location.reload()}
        style={buttonStyle}
        className="flex flex-row gap-2 items-center py-1 px-2 mt-9"
      >
        <LuRefreshCw /> Refresh
      </button>
    </section>
  );
};
export default Verifying;

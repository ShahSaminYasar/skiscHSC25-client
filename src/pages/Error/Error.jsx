import { Link, useRouteError } from "react-router-dom";
import { Helmet } from "react-helmet";
import Container from "../../layouts/Container/Container";

const Error = () => {
  const error = useRouteError();

  return (
    <section className="min-h-screen bg-[#010313] flex flex-col items-center justify-center">
      <Helmet>
        <title>Not Found | SKISC HSC 2025</title>
      </Helmet>
      <Container
        className={
          "page min-h-screen flex flex-col items-center justify-center gap-1 text-lg text-slate-300"
        }
      >
        {/* <img src={Error404Gif} alt="" className="block w-full max-w-sm mx-auto" /> */}
        <h3 className="text-5xl md:text-6xl mdd:text-8xl block text-center font-semibold">
          {error?.status || "Error"}
        </h3>
        <p>{error?.statusText}</p>
        <p>
          Back to{" "}
          <Link to="/" className="text-indigo-700">
            Home
          </Link>
        </p>
      </Container>
    </section>
  );
};
export default Error;

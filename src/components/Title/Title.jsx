const Title = ({ children, className = "", secondary = false }) => {
  const gradientColor = {
    background: "linear-gradient(90deg, #1F37D3 -5.27%, #861DC7 80.33%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };
  return (
    <h2
      style={!secondary ? gradientColor : { color: "white" }}
      className={`block w-fit text-3xl xss:text-4xl mb-6 font-[600] ${className}`}
    >
      {children}
    </h2>
  );
};
export default Title;

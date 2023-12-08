const TitleSM = ({ children, className = "", secondary = false }) => {
  const gradientColor = {
    background: "linear-gradient(90deg, #1F37D3 -5.27%, #861DC7 80.33%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };
  return (
    <h4
      style={!secondary ? gradientColor : { color: "white" }}
      className={`block w-fit text-[32px] mb-2 mt-[34px] font-[600] ${className}`}
    >
      {children}
    </h4>
  );
};
export default TitleSM;

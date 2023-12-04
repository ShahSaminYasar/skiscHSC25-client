const Title = ({ children, className = "" }) => {
  const gradientColor = {
    background: "linear-gradient(90deg, #1F37D3 -5.27%, #861DC7 60.33%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: "600",
  };
  return (
    <h2 style={gradientColor} className={`text-[40px] mb-10 ${className}`}>
      {children}
    </h2>
  );
};
export default Title;

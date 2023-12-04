const Container = ({ children, className }) => {
  return (
    <div className={`w-full max-w-6xl mx-auto ${className}`}>{children}</div>
  );
};
export default Container;

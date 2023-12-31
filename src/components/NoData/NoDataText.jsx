const NoDataText = ({ children, className = "" }) => {
  return (
    <p
      className={`block w-ful max-w-[600px] mx-auto text-[17px] text-white text-opacity-50 text-center my-3 ${className}`}
    >
      {children}
    </p>
  );
};
export default NoDataText;

const DetailsPageTitle = ({ children, className, type }) => {
  return (
    <h2
      className={`block w-fit text-[30px] sm:text-[40px] mb-0 font-[500] ${className} text-white`}
    >
      {children} <span className="text-[#7820C9] capitalize">{type}</span>
    </h2>
  );
};
export default DetailsPageTitle;

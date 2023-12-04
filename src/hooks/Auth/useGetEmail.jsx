import useAxiosPublic from "../Axios/useAxiosPublic";

const useGetEmail = async (username) => {
  const axiosPublic = useAxiosPublic();
  try {
    const res = await axiosPublic.get(`/email?username=${username}`);
    return res?.data;
  } catch (error) {
    return { error };
  }
};
export default useGetEmail;

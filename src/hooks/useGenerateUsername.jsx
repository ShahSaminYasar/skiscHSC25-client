import useAxiosPublic from "./Axios/useAxiosPublic";

const useGenerateUsername = (name) => {
  const axios = useAxiosPublic();

  axios
    .get(`/username?name=${name}`)
    .then((res) => {
      console.log(res?.data);
      return res?.data?.result;
    })
    .catch((error) => {
      throw error;
    });
};
export default useGenerateUsername;

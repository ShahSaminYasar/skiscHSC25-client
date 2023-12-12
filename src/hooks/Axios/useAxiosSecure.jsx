import axios from "axios";

const instance = axios.create({
  baseURL: "https://skisc-hsc-25.onrender.com/api/v1",
  withCredentials: true,
});

const useAxiosSecure = () => {
  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      console.log(error);
      return error;
    }
  );
  return instance;
};

export default useAxiosSecure;

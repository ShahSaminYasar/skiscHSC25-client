import axios from "axios";

const instance = axios.create({
  baseURL: "https://skischsc25-server.vercel.app/api/v1",
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

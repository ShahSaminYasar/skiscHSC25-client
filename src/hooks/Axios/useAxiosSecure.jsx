import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000/api/v1",
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

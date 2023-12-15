import axios from "axios";
import { signOut } from "firebase/auth";
import { auth } from "../../providers/Firebase/index";

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
      if (error.response.status === 401 || error.response.status === 403) {
        return signOut(auth);
      }
    }
  );
  return instance;
};

export default useAxiosSecure;

import axios from "axios";

const instance = axios.create({
  baseURL: "https://skisc-hsc-25.onrender.com/api/v1",
  withCredentials: true,
});

const useAxiosPublic = () => {
  return instance;
};

export default useAxiosPublic;

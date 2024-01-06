import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000/api/v1", //TODO
  // baseURL: "https://skisc-hsc-25.onrender.com/api/v1",
  withCredentials: true,
});

const useAxiosPublic = () => {
  return instance;
};

export default useAxiosPublic;

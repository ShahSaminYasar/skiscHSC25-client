import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Axios/useAxiosSecure";

const useUser = (username) => {
  const axiosSecure = useAxiosSecure();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getUser", username],
    queryFn: () => axiosSecure.get(`/users?username=${username}`),
  });

  if (isLoading) return { isLoading: true };
  if (isError) return { error };

  return data?.data?.result;
};
export default useUser;

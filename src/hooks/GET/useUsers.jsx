import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Axios/useAxiosSecure";

const useUsers = (role = "", verified = true) => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getUsers", role, verified],
    queryFn: () => axiosSecure.get(`/users?role=${role}&verified=${verified}`),
  });

  if (isLoading) return { isLoading: true };

  if (isError) return { error };

  return data?.data?.result;
};
export default useUsers;

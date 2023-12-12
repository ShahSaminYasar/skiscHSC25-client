import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Axios/useAxiosSecure";

const useMessagesToAdmin = (id, limit) => {
  const axiosSecure = useAxiosSecure();

  let url = "/messages";
  if (id) {
    url = `/messages?id=${id}`;
  }
  if (limit) {
    url = `/messages?limit=${limit}`;
  }

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["getMessagesToAdmin", id, limit],
    queryFn: () => axiosSecure.get(url),
  });

  if (isLoading) return { isLoading: true };
  if (isError) return { error };

  return { refetch, data: data?.data?.result };
};
export default useMessagesToAdmin;

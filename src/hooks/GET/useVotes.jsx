import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Axios/useAxiosSecure";

const useVotes = (by, active, limit) => {
  const axiosSecure = useAxiosSecure();

  let url = "/votes";
  if (by && active && limit) {
    url = `/votes?by=${by}&active=${active}&limit=${limit}`;
  } else if (by && active) {
    url = `/votes?by=${by}&active=${active}`;
  } else if (by && limit) {
    url = `/votes?by=${by}&limit=${limit}`;
  } else if (by) {
    url = `/votes?by=${by}}`;
  } else if (active) {
    url = `/votes?active=${active}`;
  } else if (limit) {
    url = `/votes?limit=${limit}`;
  }

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["getVotes", by, active, limit],
    queryFn: () => axiosSecure.get(url),
  });

  if (isLoading) return { isLoading: true };
  if (isError) return { error };
  return { data: data?.data?.result, refetch };
};
export default useVotes;

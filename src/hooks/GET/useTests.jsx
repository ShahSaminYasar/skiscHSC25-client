import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Axios/useAxiosSecure";

const useTests = (id, limit, upcoming) => {
  const axiosSecure = useAxiosSecure();

  let url = "/tests";
  if (upcoming && limit) {
    url = `/tests?upcoming=${upcoming}&limit=${limit}`;
  } else if (upcoming) {
    url = `/tests?upcoming=${upcoming}`;
  } else if (limit) {
    url = `/tests?limit=${limit}`;
  } else if (id) {
    url = `/tests?id=${id}`;
  }

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["getTests", id, limit, upcoming],
    queryFn: () => axiosSecure.get(url),
  });

  if (isLoading) return { isLoading: true };
  if (isError) return { error };

  return { data: data?.data?.result, refetch };
};
export default useTests;

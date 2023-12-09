import useAxiosSecure from "../Axios/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const usePosts = (by, id, all = false, limit) => {
  const axiosSecure = useAxiosSecure();

  let url = `/posts?all=${all}`;
  if (by && limit) {
    url = `/posts?by=${by}&all=${all}&limit=${limit}`;
  } else if (by) {
    url = `/posts?by=${by}&all=${all}`;
  } else if (limit) {
    url = `/posts?limit=${limit}&all=${all}`;
  } else if (id) {
    url = `/posts?id=${id}&all=${all}`;
  }

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["getPosts", by, id, all, limit],
    queryFn: () => axiosSecure.get(url),
  });

  if (isLoading) return { isLoading: true };
  if (isError) return { error };

  return { refetch, data: data?.data?.result };
};
export default usePosts;

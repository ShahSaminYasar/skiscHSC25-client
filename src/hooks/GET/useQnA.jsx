import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Axios/useAxiosSecure";

const useQnA = (by, id) => {
  const axiosSecure = useAxiosSecure();

  let url = "/qna";
  if (by) {
    url = `/qna?by=${by}`;
  }
  if (id) {
    url = `/qna?id=${id}`;
  }

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["getQnA", by, id],
    queryFn: () => axiosSecure.get(url),
  });

  if (isLoading) return { isLoading: true };
  if (isError) return { error };

  return { refetch, data: data?.data?.result };
};
export default useQnA;

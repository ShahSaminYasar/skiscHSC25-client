import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Axios/useAxiosPublic";

const useHomeworks = (id, limit, nearest) => {
  const axiosPublic = useAxiosPublic();

  let url = `/homeworks`;
  if (id) {
    url = `/homeworks?id=${id}`;
  }
  if (limit && nearest) {
    url = `/homeworks?limit=${limit}&nearest=true`;
  } else if (limit) {
    url = `/homeworks?limit=${limit}`;
  } else if (nearest) {
    url = `/homeworks?nearest=true`;
  }

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["getHomeworks", id, limit, nearest],
    queryFn: () => axiosPublic.get(url),
  });

  if (isLoading) return { isLoading: true };
  if (isError) return { error };

  return { refetch, data: data?.data?.result };
};
export default useHomeworks;

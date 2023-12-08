import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Axios/useAxiosPublic";

const useHomeworks = (id) => {
  const axiosPublic = useAxiosPublic();

  let url = `/homeworks`;
  if (id) {
    url = `/homeworks?id=${id}`;
  }

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["getHomeworks", id],
    queryFn: () => axiosPublic.get(url),
  });

  if (isLoading) return { isLoading: true };
  if (isError) return { error };

  return { refetch, data: data?.data?.result };
};
export default useHomeworks;

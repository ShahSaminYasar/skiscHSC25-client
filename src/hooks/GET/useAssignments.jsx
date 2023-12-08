import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Axios/useAxiosPublic";

const useAssignments = (id) => {
  const axiosPublic = useAxiosPublic();

  let url = `/assignments`;
  if (id) {
    url = `/assignments?id=${id}`;
  }

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["getAssignments", id],
    queryFn: () => axiosPublic.get(url),
  });

  if (isLoading) return { isLoading: true };
  if (isError) return { error };

  return { refetch, data: data?.data?.result };
};
export default useAssignments;

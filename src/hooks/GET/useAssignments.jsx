import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Axios/useAxiosPublic";

const useAssignments = (id, limit, nearest) => {
  const axiosPublic = useAxiosPublic();

  let url = `/assignments`;
  if (id) {
    url = `/assignments?id=${id}`;
  }
  if (limit && nearest) {
    url = `/assignments?limit=${limit}&nearest=true`;
  } else if (limit) {
    url = `/assignments?limit=${limit}`;
  } else if (nearest) {
    url = `/assignments?nearest=true`;
  }

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["getAssignments", id, limit, nearest],
    queryFn: () => axiosPublic.get(url),
  });

  if (isLoading) return { isLoading: true };
  if (isError) return { error };

  return { refetch, data: data?.data?.result };
};
export default useAssignments;

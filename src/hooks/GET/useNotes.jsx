import useAxiosSecure from "../Axios/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useNotes = (by, id) => {
  const axiosSecure = useAxiosSecure();

  let url = "/notes";
  if (by) {
    url = `/notes?by=${by}`;
  } else if (id) {
    url = `/notes?id=${id}`;
  }

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["getNotes", by, id],
    queryFn: () => axiosSecure.get(url),
  });

  if (isLoading) return { isLoading: true };
  if (isError) return { error };

  return { refetch, data: data?.data?.result };
};
export default useNotes;

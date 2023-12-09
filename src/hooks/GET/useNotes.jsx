import useAxiosSecure from "../Axios/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useNotes = (by, id, limit, all) => {
  const axiosSecure = useAxiosSecure();

  let url = "/notes";
  if (by && all && limit) {
    url = `/notes?by=${by}&limit=${limit}&all=true`;
  } else if (by && limit) {
    url = `/notes?by=${by}&limit=${limit}`;
  } else if (limit && all) {
    url = `/notes?all=${all}&limit=${limit}`;
  } else if (by && all) {
    url = `/notes?all=${all}&by=${by}`;
  } else if (by) {
    url = `/notes?by=${by}`;
  } else if (limit) {
    url = `/notes?limit=${limit}`;
  } else if (id) {
    url = `/notes?id=${id}`;
  } else if (all) {
    url = `/notes?all=true`;
  }

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["getNotes", by, id, limit, all],
    queryFn: () => axiosSecure.get(url),
  });

  if (isLoading) return { isLoading: true };
  if (isError) return { error };

  return { refetch, data: data?.data?.result };
};
export default useNotes;

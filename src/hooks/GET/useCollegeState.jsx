import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Axios/useAxiosSecure";

const useCollegeState = () => {
    const axiosSecure = useAxiosSecure();
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ["getCollegeState"],
        queryFn: () => axiosSecure.get("/college-state")
    })

    if(isLoading) return {isLoading: true}
    if(isError) return {error}

    return data?.data?.result;
}
export default useCollegeState;
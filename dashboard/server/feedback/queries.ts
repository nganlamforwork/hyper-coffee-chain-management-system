import { axiosInstance } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useFeedbacks = () => {
  return useQuery({
    queryKey: ["feedback"],
    queryFn: () =>
      axiosInstance.get("/get-feedbacks").then((res) => res.data.feedbacks),
  });
};

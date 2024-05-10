import { axiosInstance } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useBasicAnalytics = () => {
  return useQuery({
    queryKey: ["analytics"],
    queryFn: () =>
      axiosInstance.get("/admin/analytics/basic").then((res) => res.data.basic),
  });
};

export const useOverviewAnalytics = () => {
  return useQuery({
    queryKey: ["analytics"],
    queryFn: () =>
      axiosInstance
        .get("/admin/analytics/overview")
        .then((res) => res.data.overview),
  });
};

import { axiosInstance } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useSendReply = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (replyData: any) =>
      axiosInstance.post("/admin/send-reply", replyData),
    onError: (error) => {
      toast.error("An error occurred: " + error.message);
    },
    onSettled: async (_, error) => {
      await queryClient.invalidateQueries({ queryKey: ["feedback"] });
      toast.success("Send reply to customer successfully");
    },
  });
};

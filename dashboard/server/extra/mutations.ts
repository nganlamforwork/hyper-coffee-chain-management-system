import { axiosInstance } from "@/lib/api";
import { Extra, ExtraGroup } from "@/types/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateExtraGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newExtraGroup: ExtraGroup) =>
      axiosInstance.post("/admin/create-extra-group", newExtraGroup),
    onError: (error) => {
      toast.error("An error occurred: " + error.message);
    },
    onSettled: async (_, error) => {
      await queryClient.invalidateQueries({ queryKey: ["extras"] });
      toast.success("Add new extra successfully");
    },
  });
};

export const useUpdateExtraGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedExtraGroup: ExtraGroup) =>
      axiosInstance.put("/admin/update-extra-group", updatedExtraGroup),
    onError: (error) => {
      toast.error("An error occurred: " + error.message);
    },
    onSettled: async (_, error, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["extras"] });
      await queryClient.invalidateQueries({
        queryKey: ["extras", { id: variables.id }],
      });
      toast.success("Update extra group successfully");
    },
  });
};
export const useUpdateExtraStock = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedExtra: Extra) =>
      axiosInstance.put("/admin/update-extra-stock", updatedExtra),
    onError: (error) => {
      toast.error("An error occurred: " + error.message);
    },
    onSettled: async (_, error, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["extras"] });
      await queryClient.invalidateQueries({
        queryKey: ["extras", { id: variables.id }],
      });
      toast.success("Update extra successfully");
    },
  });
};

export const useDeleteExtraGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (extraGroupId: string) =>
      axiosInstance.delete(`/admin/delete-extra-group/${extraGroupId}`),
    onError: (error) => {
      toast.error("An error occurred: " + error.message);
    },
    onSettled: async (_, error) => {
      await queryClient.invalidateQueries({ queryKey: ["extras"] });
      toast.success("Extra group deleted successfully");
    },
  });
};

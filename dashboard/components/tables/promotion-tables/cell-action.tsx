"use client";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "sonner";
import { Promotion } from "@/types/product";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CreatePromotionForm from "@/app/(main)/dashboard/(routes)/promotions/_components/create-promotion-form";
import { useDeletePromotion } from "@/server/promotion/mutations";

interface CellActionProps {
  data: Promotion;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const deletePromotion = useDeletePromotion();
  const onDelete = async () => {
    try {
      deletePromotion.mutate(data.id!);
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Error deleting account:");
    }
  };

  return (
    <Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>
            <SheetTrigger asChild>
              <div className="flex transition-all hover:bg-muted items-center gap-2 w-full rounded-md">
                <Edit className="h-4 w-4" /> Update
              </div>
            </SheetTrigger>
          </DropdownMenuItem>
          <ConfirmModal
            header="Delete this promotion?"
            description="This will delete this promotion completely"
            disabled={deletePromotion.isPending}
            onConfirm={onDelete}
          >
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Trash className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </ConfirmModal>
        </DropdownMenuContent>
      </DropdownMenu>
      <SheetContent className="sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle>Update promotion campaign</SheetTitle>
          <SheetDescription>
            Fill in all the information fields below.
          </SheetDescription>
        </SheetHeader>
        <CreatePromotionForm update={true} promotion={data} />
      </SheetContent>
    </Sheet>
  );
};

"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  useDeleteExtraGroup,
  useUpdateExtraStock,
} from "@/server/extra/mutations";
import { Extra, ExtraGroup } from "@/types/product";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import CreateExtraForm from "./create-extra-form";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { toast } from "sonner";

interface ExtrasTableProps {
  extraGroups: ExtraGroup[];
}

const ExtrasTable = ({ extraGroups }: ExtrasTableProps) => {
  console.log("🚀 ~ ExtrasTable ~ extraGroups:", extraGroups);
  const [selectedGroup, setSelectedGroup] = useState<string | undefined>(
    undefined
  );
  const updateExtraStock = useUpdateExtraStock();
  const deleteExtraGroup = useDeleteExtraGroup();
  const handleUpdateExtraStock = (newStatus: string, extra: Extra) => {
    updateExtraStock.mutate({ ...extra, status: newStatus });
  };
  const onDelete = async () => {
    deleteExtraGroup.mutateAsync(selectedGroup!);
    try {
    } catch (error) {
      console.error("Error deleting extra group:", error);
      toast.error("Error deleting extra group:");
    }
  };
  return (
    <div className="flex border rounded-lg h-screen">
      {/* First column for extra groups */}
      <div className="w-1/3 border-r">
        <h2 className="text-lg font-bold p-4">Extra Groups</h2>
        <Separator />
        <ul>
          {extraGroups?.map((group: ExtraGroup) => (
            <li
              key={group.id}
              className={`p-4 cursor-pointer border-b flex items-center justify-between ${
                selectedGroup === group.id ? "bg-secondary/50" : ""
              }`}
              onClick={() => setSelectedGroup(group.id)}
            >
              <span
                className={`text-md ${
                  selectedGroup === group.id && "font-bold"
                }`}
              >
                {group.name}
              </span>
              <div className="flex flex-row items-center gap-2">
                {selectedGroup === group.id ? (
                  <>
                    <ConfirmModal
                      header="Delete this extra group?"
                      description="This will delete this extra group completely"
                      disabled={deleteExtraGroup.isPending}
                      onConfirm={onDelete}
                    >
                      <Button
                        variant="link"
                        size="icon"
                        className="p-0 w-auto h-auto"
                      >
                        <Trash2 className="h-4 w-4" strokeWidth={2.5} />
                      </Button>
                    </ConfirmModal>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button
                          variant="link"
                          size="icon"
                          className="p-0 w-auto h-auto"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </SheetTrigger>
                      <SheetContent className="sm:max-w-2xl overflow-auto">
                        <SheetHeader>
                          <SheetTitle>UPDATE EXTRA GROUP</SheetTitle>
                          <SheetDescription>
                            Fill in all the information fields below.
                          </SheetDescription>
                        </SheetHeader>
                        <CreateExtraForm
                          update={true}
                          extraGroup={extraGroups?.find(
                            (group) => group.id === selectedGroup
                          )}
                        />
                      </SheetContent>
                    </Sheet>
                  </>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    {group.extras.length}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* Second column for extras details */}
      <div className="w-2/3">
        <h2 className="text-lg font-bold p-4">Extras Details</h2>
        <Separator />
        {selectedGroup !== null && (
          <ul>
            {extraGroups
              ?.find((group) => group.id === selectedGroup)
              ?.extras.map((extra, index) => (
                <li
                  key={index}
                  className="p-4 cursor-pointer border-b flex items-center justify-between"
                >
                  <div className="flex flex-col gap-1">
                    <p>{extra.name}</p>
                    <p className="text-sm text-muted-foreground">
                      ${extra.price}
                    </p>
                  </div>
                  <Select
                    onValueChange={(newStatus) =>
                      handleUpdateExtraStock(newStatus, extra)
                    }
                    value={extra.status}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="In stock" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in-stock">In Stock</SelectItem>
                      <SelectItem value="out-of-stock">Out of stock</SelectItem>
                    </SelectContent>
                  </Select>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ExtrasTable;

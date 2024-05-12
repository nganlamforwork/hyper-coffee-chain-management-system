"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { Feedback } from "@/types/product";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ReplyForm from "@/app/(main)/dashboard/(routes)/feedbacks/_components/reply-form";

interface CellActionProps {
  data: Feedback;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
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
                <Edit className="h-4 w-4" /> Reply
              </div>
            </SheetTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <SheetContent className="sm:max-w-2xl overflow-auto">
        <SheetHeader>
          <SheetTitle>Reply to customer</SheetTitle>
          <SheetDescription>
            Fill in all the information fields below.
          </SheetDescription>
        </SheetHeader>
        <ReplyForm feedback={data} />
      </SheetContent>
    </Sheet>
  );
};

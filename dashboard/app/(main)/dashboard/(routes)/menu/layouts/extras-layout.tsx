"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CreateExtraForm from "../_components/create-extra-form";
import ExtrasTable from "../_components/extras-table";
import { useExtraGroups } from "@/server/extra/queries";
import { Plus } from "lucide-react";

const ExtrasLayout = () => {
  const { data: extraGroups } = useExtraGroups();
  return (
    <div>
      <Sheet>
        <div className="flex-1 space-y-4">
          <div className="flex items-start justify-between">
            <SheetTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add New Extra Group
              </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-lg overflow-auto">
              <SheetHeader>
                <SheetTitle>Create NEW EXTRA GROUP</SheetTitle>
                <SheetDescription>
                  Fill in all the information fields below.
                </SheetDescription>
              </SheetHeader>
              <CreateExtraForm />
            </SheetContent>
          </div>
          <ExtrasTable extraGroups={extraGroups} />
        </div>
      </Sheet>
    </div>
  );
};

export default ExtrasLayout;

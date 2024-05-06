"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "@/components/global/icons";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { Hint } from "@/components/global/hint";
import { useAuth } from "@/providers/auth-provider";

interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
  isShowIconOnly?: boolean;
}

export function DashboardNav({
  items,
  setOpen,
  isShowIconOnly,
}: DashboardNavProps) {
  const pathname = usePathname();
  const { user } = useAuth();

  if (!items?.length) {
    return null;
  }

  // Filter items based on user's role permissions
  const filteredItems = items.filter((item) =>
    user && user.role ? item.permissions.includes(user.role) : true
  );

  return (
    <nav className="relative">
      {filteredItems.map((item) => {
        const Icon = Icons[item.icon || "arrowRight"];
        const isActive = item.href === pathname;
        return (
          <div
            className={cn(
              "relative flex cursor-default select-none items-center rounded-lg my-2 text-sm outline-none hover:bg-primary hover:text-white hover:font-bold",
              isActive && "bg-secondary font-bold"
            )}
            key={item.label}
            onClick={() => {
              if (setOpen) setOpen(false);
            }}
          >
            <Hint label={item.label} side="right" sideOffset={15}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-2 hover:bg-transparent rounded-md transition-all md:w-full px-4 py-3",
                  isShowIconOnly && "justify-center w-20 h-9"
                )}
              >
                <Icon className={cn("h-4 w-4", !isShowIconOnly && "mr-2")} />
                {!isShowIconOnly && <span>{item.label}</span>}
              </Link>
            </Hint>
          </div>
        );
      })}
    </nav>
  );
}

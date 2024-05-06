import { Logo } from "@/app/(landing)/_components/logo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { navItems } from "../constants/data";
import { DashboardNav } from "./dashboard-nav";

interface SidebarProps {
  isShowIconOnly?: boolean;
}

export default function Sidebar({ isShowIconOnly = false }: SidebarProps) {
  return (
    <div className="hidden md:flex md:flex-col shrink-0 p-4 md:gap-4 !justify-between">
      <div>
        <div className="flex items-center justify-center flex-col gap-4">
          {isShowIconOnly ? (
            <Link href="/dashboard" passHref>
              <Image
                src="/logo-light.svg"
                height={40}
                width={40}
                alt="Hyper Logo"
              />
            </Link>
          ) : (
            <AspectRatio ratio={16 / 5} className="flex items-center px-3">
              <Logo />
            </AspectRatio>
          )}
        </div>
        <Separator className="my-4" />
        <DashboardNav items={navItems} isShowIconOnly={isShowIconOnly} />
      </div>
    </div>
  );
}

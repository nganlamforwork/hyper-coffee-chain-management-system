import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useOrders } from "@/server/order/queries";
import { Order } from "@/types/product";
import { Badge } from "../ui/badge";

export function RecentSales() {
  const { data: orders } = useOrders();
  return (
    <div className="space-y-8">
      {orders &&
        orders.map((ord: Order) => {
          const statusToVariant = {
            pending: "admin",
            ready: "default",
            done: "staff",
          } as any;
          const variant = statusToVariant[ord?.status!];
          return (
            <div className="flex items-center" key={ord.id}>
              <div className="ml-4 space-y-2">
                <p className="text-sm font-medium leading-none">
                  Customer: {ord.name}
                </p>
                <Badge variant={variant}>{ord.status}</Badge>
              </div>
              <div className="ml-auto font-medium">
                +${ord.total.toFixed(2)}
              </div>
            </div>
          );
        })}
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/global/heading";
import { ShoppingCart, Plus } from "lucide-react";
import Link from "next/link";
import { OrderTable } from "@/components/tables/order-tables/order-table";
import { columns } from "@/components/tables/order-tables/column";
import { useOrders } from "@/server/order/queries";

const OrdersPage = () => {
  const { data: orders } = useOrders();
  const totalOrders = orders ? orders.length : 0;
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-start justify-between">
        <Heading
          title={`Orders (${totalOrders})`}
          description="Manage all orders of customers."
          icon={ShoppingCart}
        />
        <Button asChild>
          <Link href="/orders/new-order">
            <Plus className="mr-2 h-4 w-4" /> New Order
          </Link>
        </Button>
      </div>
      <OrderTable columns={columns} data={orders || []} />
    </div>
  );
};

export default OrdersPage;

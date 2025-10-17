"use client";

import { useEffect, useState } from "react";
import { OrderCard } from "@/components/orders/order-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { recentOrders } from "@/lib/data";
import { usePOSStore } from "@/lib/store";

export function OrdersSection() {
  const { recentOrders: storeOrders } = usePOSStore();
  const [allOrders, setAllOrders] = useState(recentOrders);

  useEffect(() => {
    // Combine store orders with demo orders for display
    setAllOrders([...storeOrders, ...recentOrders]);
  }, [storeOrders]);

  const activeOrders = allOrders.filter((order) =>
    ["pending", "preparing", "ready"].includes(order.status),
  );

  const completedOrders = allOrders.filter(
    (order) => order.status === "completed",
  );

  return (
    <div className="container mx-auto my-4">
      <Card className="overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle>Order Management</CardTitle>
          <CardDescription>View and manage customer orders</CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="active">
            <TabsList className="mb-4">
              <TabsTrigger value="active">
                Active Orders
                {activeOrders.length > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    {activeOrders.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="completed">Completed Orders</TabsTrigger>
            </TabsList>

            <TabsContent value="active">
              <ScrollArea className="h-[calc(100vh-240px)]">
                <div className="space-y-4">
                  {activeOrders.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No active orders at the moment
                    </div>
                  ) : (
                    activeOrders.map((order) => (
                      <OrderCard key={order.id} order={order} />
                    ))
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="completed">
              <ScrollArea className="h-[calc(100vh-240px)]">
                <div className="space-y-4">
                  {completedOrders.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No completed orders
                    </div>
                  ) : (
                    completedOrders.map((order) => (
                      <OrderCard key={order.id} order={order} />
                    ))
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

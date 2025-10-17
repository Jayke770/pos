import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const orders = [
  {
    id: "#ORD-001",
    customer: "John Doe",
    items: "2x Latte, 1x Croissant",
    total: "$18.50",
    status: "completed",
    time: "2 min ago",
  },
  {
    id: "#ORD-002",
    customer: "Sarah Wilson",
    items: "1x Cappuccino, 2x Muffin",
    total: "$15.75",
    status: "preparing",
    time: "5 min ago",
  },
  {
    id: "#ORD-003",
    customer: "Mike Johnson",
    items: "3x Espresso, 1x Sandwich",
    total: "$22.00",
    status: "ready",
    time: "8 min ago",
  },
  {
    id: "#ORD-004",
    customer: "Emily Brown",
    items: "1x Mocha, 1x Cookie",
    total: "$12.25",
    status: "completed",
    time: "12 min ago",
  },
  {
    id: "#ORD-005",
    customer: "David Lee",
    items: "2x Americano, 1x Bagel",
    total: "$16.50",
    status: "preparing",
    time: "15 min ago",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "preparing":
      return "bg-yellow-100 text-yellow-800";
    case "ready":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export function DashboardRecentOrders() {
  return (
    <Card className="shadow-sm border-none">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Mobile Card View */}
        <div className="block md:hidden space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium text-sm">{order.id}</div>
                  <div className="text-sm text-muted-foreground">
                    {order.customer}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className={`${getStatusColor(order.status)} text-xs`}
                  >
                    {order.status}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Print Receipt</DropdownMenuItem>
                      <DropdownMenuItem>Refund</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">{order.items}</div>
              <div className="flex justify-between items-center">
                <div className="font-medium">{order.total}</div>
                <div className="text-xs text-muted-foreground">
                  {order.time}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[100px]">Order ID</TableHead>
                <TableHead className="min-w-[120px]">Customer</TableHead>
                <TableHead className="min-w-[200px]">Items</TableHead>
                <TableHead className="min-w-[80px]">Total</TableHead>
                <TableHead className="min-w-[100px]">Status</TableHead>
                <TableHead className="min-w-[100px]">Time</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {order.items}
                  </TableCell>
                  <TableCell className="font-medium">{order.total}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={getStatusColor(order.status)}
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {order.time}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Print Receipt</DropdownMenuItem>
                        <DropdownMenuItem>Refund</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

"use client"

import { Order } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { usePOSStore } from '@/lib/store';
import { useState } from 'react';
import { OrderDetailsDialog } from '@/components/orders/order-details-dialog';
import { formatDistanceToNow } from 'date-fns';

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  const { updateOrderStatus } = usePOSStore();
  const [showDetails, setShowDetails] = useState(false);
  
  const statusMap = {
    pending: { label: 'Pending', color: 'bg-yellow-500' },
    preparing: { label: 'Preparing', color: 'bg-blue-500' },
    ready: { label: 'Ready', color: 'bg-green-500' },
    completed: { label: 'Completed', color: 'bg-gray-500' },
    cancelled: { label: 'Cancelled', color: 'bg-red-500' },
  };
  
  const getNextStatus = () => {
    switch (order.status) {
      case 'pending': return 'preparing';
      case 'preparing': return 'ready';
      case 'ready': return 'completed';
      default: return order.status;
    }
  };
  
  const canProgress = order.status !== 'completed' && order.status !== 'cancelled';
  
  const handleUpdateStatus = () => {
    if (canProgress) {
      updateOrderStatus(order.id, getNextStatus());
    }
  };
  
  const timeAgo = formatDistanceToNow(new Date(order.timestamp), { addSuffix: true });
  
  return (
    <>
      <Card>
        <CardHeader className="pb-2 pt-4 px-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{order.id}</h3>
              <p className="text-sm text-muted-foreground">
                {order.customerName ? `${order.customerName} • ` : ''}{timeAgo}
              </p>
            </div>
            <Badge 
              variant="outline" 
              className={`${statusMap[order.status].color} text-white border-0`}
            >
              {statusMap[order.status].label}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="px-4 py-2">
          <ul className="text-sm space-y-1">
            {order.items.slice(0, 2).map((item, index) => (
              <li key={index} className="flex justify-between">
                <span>{item.quantity} × {item.name}</span>
                <span>${item.totalPrice.toFixed(2)}</span>
              </li>
            ))}
            {order.items.length > 2 && (
              <li className="text-muted-foreground text-xs">
                + {order.items.length - 2} more items
              </li>
            )}
          </ul>
        </CardContent>
        
        <CardFooter className="flex justify-between pt-2 pb-4 px-4">
          <div className="text-sm font-medium">
            Total: ${order.total.toFixed(2)}
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowDetails(true)}
            >
              Details
            </Button>
            {canProgress && (
              <Button 
                variant="default" 
                size="sm"
                onClick={handleUpdateStatus}
              >
                {getNextStatus() === 'preparing' && 'Start'}
                {getNextStatus() === 'ready' && 'Ready'}
                {getNextStatus() === 'completed' && 'Complete'}
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
      
      <OrderDetailsDialog 
        order={order} 
        open={showDetails} 
        onClose={() => setShowDetails(false)} 
      />
    </>
  );
}
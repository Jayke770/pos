"use client"

import { Order } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { OrderReceipt } from '@/components/orders/order-receipt';

interface OrderDetailsDialogProps {
  order: Order;
  open: boolean;
  onClose: () => void;
}

export function OrderDetailsDialog({ order, open, onClose }: OrderDetailsDialogProps) {
  const statusMap = {
    pending: { label: 'Pending', color: 'bg-yellow-500' },
    preparing: { label: 'Preparing', color: 'bg-blue-500' },
    ready: { label: 'Ready for Pickup', color: 'bg-green-500' },
    completed: { label: 'Completed', color: 'bg-gray-500' },
    cancelled: { label: 'Cancelled', color: 'bg-red-500' },
  };
  
  const paymentMethodMap = {
    cash: 'Cash',
    card: 'Card',
    mobile: 'Mobile Payment',
  };
  
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center justify-between">
            <span>Order {order.id}</span>
            <Badge 
              variant="outline" 
              className={`${statusMap[order.status].color} text-white border-0`}
            >
              {statusMap[order.status].label}
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="flex-1">
          <div className="space-y-6 p-1">
            <OrderReceipt order={order} />
          </div>
        </ScrollArea>
        
        <div className="pt-4 flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
"use client";

import { Banknote, Check, CreditCard, Smartphone } from "lucide-react";
import { useState } from "react";
import { OrderReceipt } from "@/components/orders/order-receipt";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { usePOSStore } from "@/lib/store";
import type { PaymentMethod } from "@/lib/types";

interface CheckoutDialogProps {
	open: boolean;
	onClose: () => void;
}

export function CheckoutDialog({ open, onClose }: CheckoutDialogProps) {
	const { cart, createOrder } = usePOSStore();
	const [customerName, setCustomerName] = useState("");
	const [notes, setNotes] = useState("");
	const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
	const [orderComplete, setOrderComplete] = useState(false);
	const [currentOrder, setCurrentOrder] = useState<ReturnType<
		typeof createOrder
	> | null>(null);

	const subtotal = cart.reduce((total, item) => total + item.totalPrice, 0);
	const tax = subtotal * 0.0825; // 8.25% tax
	const total = subtotal + tax;

	const handleCheckout = () => {
		if (cart.length === 0) return;

		const order = createOrder(
			paymentMethod,
			customerName.trim() || undefined,
			notes.trim() || undefined,
		);

		setCurrentOrder(order);
		setOrderComplete(true);

		// toast({
		//   title: "Order Submitted",
		//   description: `Order #${order.id.replace('ORD-', '')} has been created`,
		//   variant: "default",
		// });
	};

	const handleClose = () => {
		setCustomerName("");
		setNotes("");
		setPaymentMethod("card");
		setOrderComplete(false);
		setCurrentOrder(null);
		onClose();
	};

	return (
		<Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
			<DialogContent className="max-w-md mx-auto">
				{!orderComplete ? (
					<>
						<DialogHeader>
							<DialogTitle className="text-xl">Checkout</DialogTitle>
							<DialogDescription>
								Complete order details and process payment
							</DialogDescription>
						</DialogHeader>

						<div className="space-y-4 py-4">
							<div className="space-y-2">
								<Label htmlFor="customerName">Customer Name (Optional)</Label>
								<Input
									id="customerName"
									value={customerName}
									onChange={(e) => setCustomerName(e.target.value)}
									placeholder="For order pickup"
								/>
							</div>

							<div className="space-y-2">
								<Label>Payment Method</Label>
								<RadioGroup
									value={paymentMethod}
									onValueChange={(value) =>
										setPaymentMethod(value as PaymentMethod)
									}
									className="grid grid-cols-3 gap-2"
								>
									<PaymentOption
										value="card"
										label="Card"
										icon={<CreditCard className="h-4 w-4" />}
										selected={paymentMethod === "card"}
									/>

									<PaymentOption
										value="cash"
										label="Cash"
										icon={<Banknote className="h-4 w-4" />}
										selected={paymentMethod === "cash"}
									/>

									<PaymentOption
										value="mobile"
										label="Mobile"
										icon={<Smartphone className="h-4 w-4" />}
										selected={paymentMethod === "mobile"}
									/>
								</RadioGroup>
							</div>

							<div className="space-y-2">
								<Label htmlFor="notes">Order Notes (Optional)</Label>
								<Textarea
									id="notes"
									value={notes}
									onChange={(e) => setNotes(e.target.value)}
									placeholder="Special instructions for this order..."
									className="resize-none"
								/>
							</div>

							<div className="space-y-1 pt-2">
								<div className="flex justify-between text-sm">
									<span className="text-muted-foreground">Subtotal</span>
									<span>${subtotal.toFixed(2)}</span>
								</div>
								<div className="flex justify-between text-sm">
									<span className="text-muted-foreground">Tax (8.25%)</span>
									<span>${tax.toFixed(2)}</span>
								</div>
								<div className="flex justify-between font-medium text-base pt-2 border-t mt-2">
									<span>Total</span>
									<span>${total.toFixed(2)}</span>
								</div>
							</div>
						</div>

						<DialogFooter>
							<Button variant="outline" onClick={handleClose}>
								Cancel
							</Button>
							<Button onClick={handleCheckout} disabled={cart.length === 0}>
								Complete Order
							</Button>
						</DialogFooter>
					</>
				) : (
					<>
						<DialogHeader>
							<DialogTitle className="flex items-center justify-center text-xl mb-2">
								<div className="bg-primary/10 p-3 rounded-full mr-2">
									<Check className="h-6 w-6 text-primary" />
								</div>
								Order Complete
							</DialogTitle>
						</DialogHeader>

						{currentOrder && (
							<div className="py-4">
								<OrderReceipt order={currentOrder} />
							</div>
						)}

						<DialogFooter>
							<Button onClick={handleClose}>Done</Button>
						</DialogFooter>
					</>
				)}
			</DialogContent>
		</Dialog>
	);
}

function PaymentOption({
	value,
	label,
	icon,
	selected,
}: {
	value: string;
	label: string;
	icon: React.ReactNode;
	selected: boolean;
}) {
	return (
		<div className="relative">
			<RadioGroupItem value={value} id={value} className="sr-only" />
			<Label
				htmlFor={value}
				className={`
          flex flex-col items-center justify-center p-3 border rounded-lg cursor-pointer
          ${selected ? "border-primary bg-primary/5" : "border-input"}
          hover:bg-accent hover:text-accent-foreground transition-colors
        `}
			>
				{icon}
				<span className="mt-1 text-xs">{label}</span>
			</Label>
		</div>
	);
}

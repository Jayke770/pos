"use client";

import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import type { CartItem, Order } from "@/lib/types";

interface OrderReceiptProps {
	order: Order;
}

export function OrderReceipt({ order }: OrderReceiptProps) {
	const paymentMethodMap = {
		cash: "Cash",
		card: "Card",
		mobile: "Mobile Payment",
	};

	return (
		<div className="space-y-4 text-sm">
			<div>
				<h3 className="font-semibold text-base mb-1">Order Information</h3>
				<div className="grid grid-cols-2 gap-y-1">
					<span className="text-muted-foreground">Date:</span>
					<span>{format(new Date(order.timestamp), "MMM dd, yyyy")}</span>

					<span className="text-muted-foreground">Time:</span>
					<span>{format(new Date(order.timestamp), "HH:mm:ss")}</span>

					{order.customerName && (
						<>
							<span className="text-muted-foreground">Customer:</span>
							<span>{order.customerName}</span>
						</>
					)}

					<span className="text-muted-foreground">Payment Method:</span>
					<span>{paymentMethodMap[order.paymentMethod]}</span>
				</div>
			</div>

			<Separator />

			<div>
				<h3 className="font-semibold text-base mb-2">Order Items</h3>
				<div className="space-y-2">
					{order.items.map((item, index) => (
						<OrderItemCard key={index} item={item} />
					))}
				</div>
			</div>

			<Separator />

			<div>
				<div className="space-y-1">
					<div className="flex justify-between">
						<span className="text-muted-foreground">Subtotal</span>
						<span>${order.subtotal.toFixed(2)}</span>
					</div>
					<div className="flex justify-between">
						<span className="text-muted-foreground">Tax</span>
						<span>${order.tax.toFixed(2)}</span>
					</div>
					<div className="flex justify-between font-semibold text-base pt-1">
						<span>Total</span>
						<span>${order.total.toFixed(2)}</span>
					</div>
				</div>
			</div>

			{order.notes && (
				<>
					<Separator />
					<div>
						<h3 className="font-semibold text-base mb-1">Notes</h3>
						<p className="text-muted-foreground">{order.notes}</p>
					</div>
				</>
			)}
		</div>
	);
}

function OrderItemCard({ item }: { item: CartItem }) {
	return (
		<div className="border border-border rounded-md p-3">
			<div className="flex justify-between">
				<div className="flex items-start gap-2">
					<span className="bg-muted text-muted-foreground text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center mt-0.5">
						{item.quantity}
					</span>
					<div>
						<h4 className="font-medium">{item.name}</h4>

						{item.options.length > 0 && (
							<div className="mt-1">
								{item.options.flatMap((opt) => {
									const product = products.find((p) => p.id === item.productId);
									const customization = product?.customizations?.find(
										(c) => c.id === opt.customizationId,
									);

									if (!customization) return [];

									return opt.optionIds
										.map((optId) => {
											const option = customization.options.find(
												(o) => o.id === optId,
											);
											if (!option) return null;

											return (
												<div
													key={optId}
													className="flex justify-between text-xs text-muted-foreground"
												>
													<span>
														{customization.name}: {option.name}
													</span>
													{option.price > 0 && (
														<span>+${option.price.toFixed(2)}</span>
													)}
												</div>
											);
										})
										.filter(Boolean);
								})}
							</div>
						)}

						{item.notes && (
							<p className="text-xs italic text-muted-foreground mt-1">
								"{item.notes}"
							</p>
						)}
					</div>
				</div>
				<span className="font-medium">${item.totalPrice.toFixed(2)}</span>
			</div>
		</div>
	);
}

// Import products data to resolve options
import { products } from "@/lib/data";

export type Category = {
	id: string;
	name: string;
	image?: string;
};

export type ProductOption = {
	id: string;
	name: string;
	price: number;
};

export type ProductCustomization = {
	id: string;
	name: string;
	options: ProductOption[];
	required?: boolean;
	multiSelect?: boolean;
};

export type Product = {
	id: string;
	name: string;
	description: string;
	price: number;
	image: string;
	categoryId: string;
	popular?: boolean;
	customizations?: ProductCustomization[];
};

export type CartItem = {
	id: string;
	productId: string;
	name: string;
	price: number;
	quantity: number;
	options: { customizationId: string; optionIds: string[] }[];
	notes?: string;
	totalPrice: number;
};

export type PaymentMethod = "cash" | "card" | "mobile";

export type Order = {
	id: string;
	items: CartItem[];
	total: number;
	subtotal: number;
	tax: number;
	status: "pending" | "preparing" | "ready" | "completed" | "cancelled";
	paymentMethod: PaymentMethod;
	paymentStatus: "pending" | "paid";
	customerName?: string;
	notes?: string;
	timestamp: Date;
	completedAt?: Date;
};

export type DailySales = {
	date: string;
	total: number;
	orders: number;
};

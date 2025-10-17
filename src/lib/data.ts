import type { Category, DailySales, Order, Product } from "@/lib/types";

export const categories: Category[] = [
  { id: "coffee", name: "Coffee" },
  { id: "espresso", name: "Espresso" },
  { id: "tea", name: "Tea" },
  { id: "cold-brew", name: "Cold Brew" },
  { id: "pastries", name: "Pastries" },
  { id: "sandwiches", name: "Sandwiches" },
];

export const products: Product[] = [
  {
    id: "drip-coffee",
    name: "House Drip Coffee",
    description: "Our signature house blend, freshly brewed",
    price: 3.25,
    image: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg",
    categoryId: "coffee",
    popular: true,
    customizations: [
      {
        id: "size",
        name: "Size",
        required: true,
        options: [
          { id: "small", name: "Small", price: 0 },
          { id: "medium", name: "Medium", price: 0.75 },
          { id: "large", name: "Large", price: 1.5 },
        ],
      },
      {
        id: "milk",
        name: "Milk",
        options: [
          { id: "none", name: "None", price: 0 },
          { id: "whole", name: "Whole Milk", price: 0 },
          { id: "skim", name: "Skim Milk", price: 0 },
          { id: "oat", name: "Oat Milk", price: 0.75 },
          { id: "almond", name: "Almond Milk", price: 0.75 },
        ],
      },
      {
        id: "syrups",
        name: "Syrups",
        multiSelect: true,
        options: [
          { id: "vanilla", name: "Vanilla", price: 0.5 },
          { id: "caramel", name: "Caramel", price: 0.5 },
          { id: "hazelnut", name: "Hazelnut", price: 0.5 },
        ],
      },
    ],
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    description: "Espresso with steamed milk and foam",
    price: 4.5,
    image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg",
    categoryId: "espresso",
    popular: true,
    customizations: [
      {
        id: "size",
        name: "Size",
        required: true,
        options: [
          { id: "small", name: "Small", price: 0 },
          { id: "medium", name: "Medium", price: 0.75 },
          { id: "large", name: "Large", price: 1.5 },
        ],
      },
      {
        id: "milk",
        name: "Milk",
        options: [
          { id: "whole", name: "Whole Milk", price: 0 },
          { id: "skim", name: "Skim Milk", price: 0 },
          { id: "oat", name: "Oat Milk", price: 0.75 },
          { id: "almond", name: "Almond Milk", price: 0.75 },
        ],
      },
    ],
  },
  {
    id: "cold-brew",
    name: "Cold Brew",
    description: "Smooth, slow-brewed coffee served cold",
    price: 4.75,
    image: "https://images.pexels.com/photos/2638019/pexels-photo-2638019.jpeg",
    categoryId: "cold-brew",
    customizations: [
      {
        id: "size",
        name: "Size",
        required: true,
        options: [
          { id: "small", name: "Small", price: 0 },
          { id: "medium", name: "Medium", price: 0.75 },
          { id: "large", name: "Large", price: 1.5 },
        ],
      },
      {
        id: "milk",
        name: "Milk",
        options: [
          { id: "none", name: "None", price: 0 },
          { id: "whole", name: "Whole Milk", price: 0 },
          { id: "skim", name: "Skim Milk", price: 0 },
          { id: "oat", name: "Oat Milk", price: 0.75 },
          { id: "almond", name: "Almond Milk", price: 0.75 },
        ],
      },
    ],
  },
  {
    id: "chai-latte",
    name: "Chai Latte",
    description: "Spiced tea concentrate with steamed milk",
    price: 4.25,
    image: "https://images.pexels.com/photos/5946978/pexels-photo-5946978.jpeg",
    categoryId: "tea",
    customizations: [
      {
        id: "size",
        name: "Size",
        required: true,
        options: [
          { id: "small", name: "Small", price: 0 },
          { id: "medium", name: "Medium", price: 0.75 },
          { id: "large", name: "Large", price: 1.5 },
        ],
      },
      {
        id: "milk",
        name: "Milk",
        options: [
          { id: "whole", name: "Whole Milk", price: 0 },
          { id: "skim", name: "Skim Milk", price: 0 },
          { id: "oat", name: "Oat Milk", price: 0.75 },
          { id: "almond", name: "Almond Milk", price: 0.75 },
        ],
      },
    ],
  },
  {
    id: "croissant",
    name: "Butter Croissant",
    description: "Flaky, buttery French pastry",
    price: 3.5,
    image: "https://images.pexels.com/photos/3892469/pexels-photo-3892469.jpeg",
    categoryId: "pastries",
  },
  {
    id: "avocado-toast",
    name: "Avocado Toast",
    description: "Sourdough toast with smashed avocado, salt, and pepper",
    price: 8.5,
    image: "https://images.pexels.com/photos/1351238/pexels-photo-1351238.jpeg",
    categoryId: "sandwiches",
    customizations: [
      {
        id: "add-ons",
        name: "Add-ons",
        multiSelect: true,
        options: [
          { id: "egg", name: "Fried Egg", price: 1.5 },
          { id: "tomato", name: "Tomato", price: 0.75 },
          { id: "feta", name: "Feta Cheese", price: 1.0 },
        ],
      },
    ],
  },
];

export const recentOrders: Order[] = [
  {
    id: "ORD-001",
    items: [
      {
        id: "item-1",
        productId: "cappuccino",
        name: "Cappuccino",
        price: 4.5,
        quantity: 1,
        options: [
          { customizationId: "size", optionIds: ["medium"] },
          { customizationId: "milk", optionIds: ["oat"] },
        ],
        totalPrice: 6.0,
      },
    ],
    total: 6.0,
    subtotal: 5.25,
    tax: 0.75,
    status: "completed",
    paymentMethod: "card",
    paymentStatus: "paid",
    timestamp: new Date(Date.now() - 15 * 60000),
    completedAt: new Date(Date.now() - 10 * 60000),
  },
  {
    id: "ORD-002",
    items: [
      {
        id: "item-1",
        productId: "drip-coffee",
        name: "House Drip Coffee",
        price: 3.25,
        quantity: 2,
        options: [{ customizationId: "size", optionIds: ["large"] }],
        totalPrice: 9.5,
      },
    ],
    total: 9.5,
    subtotal: 8.5,
    tax: 1.0,
    status: "ready",
    paymentMethod: "cash",
    paymentStatus: "paid",
    customerName: "Alex",
    timestamp: new Date(Date.now() - 5 * 60000),
  },
  {
    id: "ORD-003",
    items: [
      {
        id: "item-1",
        productId: "chai-latte",
        name: "Chai Latte",
        price: 4.25,
        quantity: 1,
        options: [{ customizationId: "size", optionIds: ["small"] }],
        totalPrice: 4.25,
      },
      {
        id: "item-2",
        productId: "croissant",
        name: "Butter Croissant",
        price: 3.5,
        quantity: 1,
        options: [],
        totalPrice: 3.5,
      },
    ],
    total: 7.75,
    subtotal: 7.75,
    tax: 0,
    status: "preparing",
    paymentMethod: "card",
    paymentStatus: "paid",
    customerName: "Sam",
    timestamp: new Date(),
  },
];

export const salesData: DailySales[] = [
  { date: "2025-05-01", total: 1250.75, orders: 178 },
  { date: "2025-05-02", total: 1345.5, orders: 195 },
  { date: "2025-05-03", total: 1575.25, orders: 210 },
  { date: "2025-05-04", total: 1190.0, orders: 165 },
  { date: "2025-05-05", total: 1320.5, orders: 184 },
  { date: "2025-05-06", total: 1400.75, orders: 192 },
  { date: "2025-05-07", total: 1480.25, orders: 204 },
];

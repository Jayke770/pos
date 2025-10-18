CREATE TABLE "inventory_categories" (
	"category" text NOT NULL,
	"storeId" uuid NOT NULL,
	"totalProducts" numeric DEFAULT 0,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "inventory_categories_category_unique" UNIQUE("category")
);
--> statement-breakpoint
CREATE TABLE "inventory" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"unit" text NOT NULL,
	"categoryId" uuid NOT NULL,
	"name" text NOT NULL,
	"cost" numeric NOT NULL,
	"stocks" numeric NOT NULL,
	"addToPos" boolean DEFAULT false,
	"description" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "product_categories" (
	"category" text NOT NULL,
	"storeId" uuid NOT NULL,
	"totalProducts" numeric DEFAULT 0,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "product_categories_category_unique" UNIQUE("category")
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"categoryId" uuid NOT NULL,
	"totalSold" numeric DEFAULT 0,
	"addons" jsonb DEFAULT '[]',
	"variants" jsonb DEFAULT '[]',
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_categoryId_inventory_categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."inventory_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_product_categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."product_categories"("id") ON DELETE no action ON UPDATE no action;
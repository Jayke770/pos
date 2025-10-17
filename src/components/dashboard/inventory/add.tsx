"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import axios from "axios";
import { format } from "date-fns";
import { CalendarIcon, Plus } from "lucide-react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { itemTypes } from "@/lib/config";
import type { IApiResponse } from "@/types";

// Common units
const commonUnits = [
  "kg",
  "g",
  "L",
  "ml",
  "pcs",
  "bottles",
  "bags",
  "boxes",
  "loaves",
  "shots",
  "pumps",
  "cups",
  "oz",
  "lbs",
];

// Zod validation schema
const inventorySchema = z.object({
  name: z.string().min(1, "Item name is required"),
  type: z.string().min(1, "Type is required"),
  description: z.string().optional(),
  unit: z.string().min(1, "Unit is required"),
  expiryDate: z.date({ message: "Expiry Date is required" }),
  contentPerUnit: z.number().min(1, "Current Content  must be greater than 0"),
  stocks: z.number().min(1, "Current stock  must be greater than 0"),
  lowStockThreshold: z
    .number()
    .gt(0, "Low stock threshold must be greater than 0"),
});
type InventoryFormData = z.infer<typeof inventorySchema>;
export function AddInventoryDialog() {
  const [open, setOpen] = useState(false);
  const [_isSubmittingForm, setIsSubmittingForm] = useState<boolean>(false);
  const newInventoryForm = useForm({
    resolver: zodResolver(inventorySchema),
    defaultValues: {
      name: "",
      type: "",
      description: "",
      unit: "",
    },
    mode: "onChange",
  });
  const onToggleIsSubmitting = useCallback(
    () => setIsSubmittingForm((e) => !e),
    [],
  );
  const onAddInventory = (data: InventoryFormData) => {
    onToggleIsSubmitting;
    toast.promise(
      // biome-ignore lint/suspicious/noAsyncPromiseExecutor: <todo>
      new Promise<string>(async (resolve, reject) => {
        try {
          const response = await axios.post("/api/inventory", {
            ...data,
            action: "create",
          });
          if (response?.status !== 200) reject("Failed to save inventory");
          const result = response.data as IApiResponse;
          result?.status ? resolve(result.message) : reject(result.message);
        } catch (_e) {
          reject("Something went wrong");
        }
      }),
      {
        loading: "Saving...",
        error: (e) => e,
        success: (e) => {
          newInventoryForm.reset();
          return e;
        },
        onAutoClose: () => {
          onToggleIsSubmitting();
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Inventory
        </Button>
      </DialogTrigger>
      <DialogContent className=" max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Inventory Item</DialogTitle>
          <VisuallyHidden>
            <DialogDescription />
          </VisuallyHidden>
        </DialogHeader>

        <Form {...newInventoryForm}>
          <form
            onSubmit={newInventoryForm.handleSubmit(onAddInventory)}
            className="space-y-6"
          >
            {/* Item Type */}
            <FormField
              control={newInventoryForm.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className=" w-full">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {itemTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Item Name */}
            <FormField
              control={newInventoryForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Coffee Beans, Cup" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={newInventoryForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Optional description or notes about this item"
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={newInventoryForm.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant={"outline"}>
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick an expiry date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      align="start"
                      className=" w-auto border-none shadow-none p-0"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        startMonth={
                          new Date(
                            new Date().getFullYear(),
                            new Date().getMonth(),
                          )
                        }
                        endMonth={new Date(new Date().getFullYear() + 100, 12)}
                        className="rounded-md border shadow-sm"
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            {/* Unit and Current Stock */}

            <FormField
              control={newInventoryForm.control}
              name="unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className=" w-full">
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {commonUnits.map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={newInventoryForm.control}
              name="contentPerUnit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content Per Unit</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) =>
                        field.onChange(Number(e.target.value || 0))
                      }
                      placeholder="e.g. 100"
                      inputMode="decimal"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={newInventoryForm.control}
              name="stocks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input
                      inputMode="decimal"
                      {...field}
                      onChange={(e) =>
                        field.onChange(Number(e.target.value || 0))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={newInventoryForm.control}
              name="lowStockThreshold"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Low Stock Alert</FormLabel>
                  <FormControl>
                    <Input
                      inputMode="decimal"
                      {...field}
                      onChange={(e) =>
                        field.onChange(Number(e.target.value || 0))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2 pt-4 border-t">
              <Button
                type="submit"
                className="flex-1"
                disabled={!newInventoryForm.formState.isValid}
              >
                Add to Inventory
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

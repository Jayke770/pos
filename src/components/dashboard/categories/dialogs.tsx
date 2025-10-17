"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose, DialogTitle } from "@radix-ui/react-dialog";
import axios from "axios";
import { AlertCircleIcon, Loader2, Plus } from "lucide-react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useShallow } from "zustand/react/shallow";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
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
import { Label } from "@/components/ui/label";
import { useCategoryState } from "@/hooks/dashboard/useCategoryState";
import type { IApiResponse } from "@/types";

const AddNewCategorySchema = z.object({
  category: z.string().min(3, { message: "Category name is required" }),
});
export function AddCategory({
  updateCategories,
}: {
  updateCategories: () => void;
}) {
  const [isSubmittingForm, setIsSubmittingForm] = useState<boolean>(false);
  const onToggleIsSubmitting = useCallback(
    () => setIsSubmittingForm((e) => !e),
    [],
  );
  const addForm = useForm<z.infer<typeof AddNewCategorySchema>>({
    resolver: zodResolver(AddNewCategorySchema),
    defaultValues: {
      category: "",
    },
  });
  const onSubmit = (data: z.infer<typeof AddNewCategorySchema>) => {
    onToggleIsSubmitting();
    toast.promise(
      new Promise<string>(async (resolve, reject) => {
        try {
          const response = await axios.post("/api/categories", {
            ...data,
            action: "create",
          });
          if (response?.status !== 200) reject("Failed to save category");
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
          updateCategories();
          return e;
        },
        onAutoClose: () => {
          onToggleIsSubmitting();
          addForm.reset();
        },
      },
    );
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className=" flex items-center gap-2 cursor-pointer">
          <Plus className="h-4 w-4" />
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogDescription>
            Enter a name for your new category and save it to your list.
          </DialogDescription>
        </DialogHeader>
        <Form {...addForm}>
          <form
            onSubmit={addForm.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
          >
            <FormField
              control={addForm.control}
              name="category"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="eg, Coffee" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className=" flex gap-2 w-full">
              <DialogClose asChild>
                <Button
                  disabled={isSubmittingForm}
                  variant={"outline"}
                  className="flex-1"
                >
                  Close
                </Button>
              </DialogClose>
              <Button
                disabled={isSubmittingForm}
                className=" cursor-pointer flex-1"
              >
                {isSubmittingForm ? (
                  <>
                    <Loader2 className={"size-4 animate-spin"} />
                    Saving...
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
export function EditCategory({
  updateCategories,
}: {
  updateCategories: () => void;
}) {
  const state = useCategoryState(useShallow((state) => state));
  const [isSubmittingForm, setIsSubmittingForm] = useState<boolean>(false);
  const onToggleIsSubmitting = useCallback(
    () => setIsSubmittingForm((e) => !e),
    [],
  );
  const editForm = useForm<z.infer<typeof AddNewCategorySchema>>({
    resolver: zodResolver(AddNewCategorySchema),
    defaultValues: {
      category: state?.category?.category || "",
    },
  });
  const onSubmit = (data: z.infer<typeof AddNewCategorySchema>) => {
    onToggleIsSubmitting();
    toast.promise(
      // biome-ignore lint/suspicious/noAsyncPromiseExecutor: <no need>
      new Promise<string>(async (resolve, reject) => {
        try {
          const response = await axios.post("/api/categories", {
            ...data,
            id: state?.category?.id,
            action: "update",
          });
          if (response?.status !== 200) reject("Failed to update category");
          const result = response.data as IApiResponse;
          result?.status ? resolve(result.message) : reject(result.message);
        } catch (_e) {
          reject("Something went wrong");
        }
      }),
      {
        loading: "Updating...",
        error: (e) => e,
        success: (e) => {
          updateCategories();
          return e;
        },
        onAutoClose: () => {
          onToggleIsSubmitting();
          editForm.reset();
          state.onUpdateCategory({ action: undefined });
        },
      },
    );
  };
  const onOpenChange = useCallback(
    (open: boolean) =>
      state.onUpdateCategory({ action: open ? "edit" : undefined }),
    [state.onUpdateCategory, state],
  );
  return (
    <Dialog open={state?.action === "edit"} onOpenChange={onOpenChange}>
      <DialogContent className=" hackdog">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>
            Update the category name and save your changes.
          </DialogDescription>
        </DialogHeader>
        <Form {...editForm}>
          <form
            onSubmit={editForm.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
          >
            <FormField
              control={editForm.control}
              name="category"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="eg, Coffee" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className=" flex gap-2 w-full">
              <DialogClose asChild>
                <Button
                  disabled={isSubmittingForm}
                  variant={"outline"}
                  className="flex-1"
                >
                  Close
                </Button>
              </DialogClose>
              <Button
                disabled={isSubmittingForm}
                className=" cursor-pointer flex-1"
              >
                {isSubmittingForm ? (
                  <>
                    <Loader2 className={"size-4 animate-spin"} />
                    Updating...
                  </>
                ) : (
                  "Update"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
export function DeleteCategory({
  updateCategories,
}: {
  updateCategories: () => void;
}) {
  const state = useCategoryState(useShallow((state) => state));
  const [isSubmittingForm, setIsSubmittingForm] = useState<boolean>(false);
  const onToggleIsSubmitting = useCallback(
    () => setIsSubmittingForm((e) => !e),
    [],
  );
  const onDelete = () => {
    onToggleIsSubmitting();
    toast.promise(
      // biome-ignore lint/suspicious/noAsyncPromiseExecutor: <todo>
      new Promise<string>(async (resolve, reject) => {
        try {
          const response = await axios.post("/api/categories", {
            id: state?.category?.id,
            action: "delete",
          });
          if (response?.status !== 200) reject("Failed to save category");
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
          updateCategories();
          return e;
        },
        onAutoClose: () => {
          onToggleIsSubmitting();
          state.onUpdateCategory({ action: undefined });
        },
      },
    );
  };
  const onOpenChange = useCallback(
    (open: boolean) =>
      state.onUpdateCategory({ action: open ? "edit" : undefined }),
    [state.onUpdateCategory, state],
  );
  return (
    <Dialog open={state?.action === "delete"} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Category</DialogTitle>
          <DialogDescription>
            <Alert variant={"destructive"} className=" items-center">
              <AlertCircleIcon className=" size-10" />
              <AlertDescription>
                You can only delete this category if there are no products
                associated with it.
              </AlertDescription>
            </Alert>
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="category">Name</Label>
            <Input id="category" disabled value={state?.category?.category} />
          </div>
          <div className=" flex gap-2 w-full">
            <DialogClose asChild>
              <Button
                disabled={isSubmittingForm}
                variant={"outline"}
                className="flex-1"
              >
                Close
              </Button>
            </DialogClose>
            <Button
              onClick={onDelete}
              type="button"
              disabled={isSubmittingForm}
              variant={"destructive"}
              className=" cursor-pointer flex-1"
            >
              {isSubmittingForm ? (
                <>
                  <Loader2 className={"size-4 animate-spin"} />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

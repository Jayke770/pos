"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircleIcon, Loader2, Plus } from "lucide-react";
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { DialogClose, DialogTitle } from "@radix-ui/react-dialog";
import { useState, useCallback, useMemo } from "react";
import { toast } from "sonner";
import axios from 'axios'
import { IApiResponse, ICategory } from "@/types";
import { useShallow } from 'zustand/react/shallow'
import { useCategoryState } from "@/hooks/dashboard/useCategoryState";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
const AddNewCategorySchema = z.object({
    category: z.string().min(3, { message: "Category name is required" })
})
export function AddCategory({ updateCategories }: { updateCategories: () => void }) {
    const [isSubmittingForm, setIsSubmittingForm] = useState<boolean>(false)
    const onToggleIsSubmitting = useCallback(() => setIsSubmittingForm(e => !e), [isSubmittingForm])
    const addForm = useForm<z.infer<typeof AddNewCategorySchema>>({
        resolver: zodResolver(AddNewCategorySchema),
        defaultValues: {
            category: ""
        },
    })
    const onSubmit = (data: z.infer<typeof AddNewCategorySchema>) => {
        onToggleIsSubmitting()
        toast.promise(new Promise<string>(async (resolve, reject) => {
            try {
                const response = await axios.post("/api/categories", data)
                if (response?.status !== 200) reject("Failed to save category")
                const result = response.data as IApiResponse
                result?.status ? resolve(result.message) : reject(result.message)
            } catch (e) {
                reject("Something went wrong")
            }
        }), {
            loading: "Saving...",
            error: e => e,
            success: e => e,
            onAutoClose: () => {
                onToggleIsSubmitting()
                addForm.reset()
                updateCategories()
            }
        })
    }
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
                    <DialogDescription>Enter a name for your new category and save it to your list.</DialogDescription>
                </DialogHeader>
                <Form {...addForm}>
                    <form onSubmit={addForm.handleSubmit(onSubmit)} className="space-y-4 py-4">
                        <FormField
                            control={addForm.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="eg, Coffee" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <div className=" flex gap-2 w-full">
                            <DialogClose asChild>
                                <Button
                                    disabled={isSubmittingForm}
                                    variant={"outline"}
                                    className="flex-1">
                                    Close
                                </Button>
                            </DialogClose>
                            <Button
                                disabled={isSubmittingForm}
                                className=" cursor-pointer flex-1">
                                {isSubmittingForm ? (
                                    <>
                                        <Loader2 className={"size-4 animate-spin"} />
                                        Saving...
                                    </>
                                ) : "Save"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
export function EditCategory({ updateCategories }: { updateCategories: () => void }) {
    const state = useCategoryState(useShallow(state => state))
    const [isSubmittingForm, setIsSubmittingForm] = useState<boolean>(false)
    const onToggleIsSubmitting = useCallback(() => setIsSubmittingForm(e => !e), [isSubmittingForm])
    const editForm = useForm<z.infer<typeof AddNewCategorySchema>>({
        resolver: zodResolver(AddNewCategorySchema),
        defaultValues: {
            category: state?.category?.category || ""
        },
    })
    const onSubmit = (data: z.infer<typeof AddNewCategorySchema>) => {
        onToggleIsSubmitting()
        toast.promise(new Promise<string>(async (resolve, reject) => {
            try {
                const response = await axios.post("/api/categories", { ...data, id: state?.category?.id, action: "update" })
                if (response?.status !== 200) reject("Failed to update category")
                const result = response.data as IApiResponse
                result?.status ? resolve(result.message) : reject(result.message)
            } catch (e) {
                reject("Something went wrong")
            }
        }), {
            loading: "Updating...",
            error: e => e,
            success: e => e,
            onAutoClose: () => {
                onToggleIsSubmitting()
                editForm.reset()
                updateCategories()
                state.onUpdateCategory({ action: undefined })
            }
        })
    }
    const onOpenChange = useCallback((open: boolean) => state.onUpdateCategory({ action: open ? "edit" : undefined }), [state.onUpdateCategory])
    return (
        <Dialog open={state?.action === "edit"} onOpenChange={onOpenChange}>
            <DialogContent className=" hackdog">
                <DialogHeader>
                    <DialogTitle>Edit Category</DialogTitle>
                    <DialogDescription>Update the category name and save your changes.</DialogDescription>
                </DialogHeader>
                <Form {...editForm}>
                    <form onSubmit={editForm.handleSubmit(onSubmit)} className="space-y-4 py-4">
                        <FormField
                            control={editForm.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="eg, Coffee" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <div className=" flex gap-2 w-full">
                            <DialogClose asChild>
                                <Button
                                    disabled={isSubmittingForm}
                                    variant={"outline"}
                                    className="flex-1">
                                    Close
                                </Button>
                            </DialogClose>
                            <Button
                                disabled={isSubmittingForm}
                                className=" cursor-pointer flex-1">
                                {isSubmittingForm ? (
                                    <>
                                        <Loader2 className={"size-4 animate-spin"} />
                                        Updating...
                                    </>
                                ) : "Update"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
export function DeleteCategory({ updateCategories }: { updateCategories: () => void }) {
    const state = useCategoryState(useShallow(state => state))
    const [isSubmittingForm, setIsSubmittingForm] = useState<boolean>(false)
    const onToggleIsSubmitting = useCallback(() => setIsSubmittingForm(e => !e), [isSubmittingForm])
    const onDelete = () => {
        onToggleIsSubmitting()
        toast.promise(new Promise<string>(async (resolve, reject) => {
            try {
                const response = await axios.post("/api/categories", { id: state?.category?.id, action: "delete" })
                if (response?.status !== 200) reject("Failed to save category")
                const result = response.data as IApiResponse
                result?.status ? resolve(result.message) : reject(result.message)
            } catch (e) {
                reject("Something went wrong")
            }
        }), {
            loading: "Saving...",
            error: e => e,
            success: e => e,
            onAutoClose: () => {
                onToggleIsSubmitting()
                updateCategories()
                state.onUpdateCategory({ action: undefined })
            }
        })
    }
    const onOpenChange = useCallback((open: boolean) => state.onUpdateCategory({ action: open ? "edit" : undefined }), [state.onUpdateCategory])
    return (
        <Dialog open={state?.action === "delete"} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Category</DialogTitle>
                    <DialogDescription>
                        <Alert variant={"destructive"} className=" items-center">
                            <AlertCircleIcon className=" size-10" />
                            <AlertDescription>
                                You can only delete this category if there are no products associated with it.
                            </AlertDescription>
                        </Alert>
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="category">Name</Label>
                        <Input
                            id="category"
                            disabled
                            value={state?.category?.category} />
                    </div>
                    <div className=" flex gap-2 w-full">
                        <DialogClose asChild>
                            <Button
                                disabled={isSubmittingForm}
                                variant={"outline"}
                                className="flex-1">
                                Close
                            </Button>
                        </DialogClose>
                        <Button
                            onClick={onDelete}
                            type="button"
                            disabled={isSubmittingForm}
                            variant={"destructive"}
                            className=" cursor-pointer flex-1">
                            {isSubmittingForm ? (
                                <>
                                    <Loader2 className={"size-4 animate-spin"} />
                                    Deleting...
                                </>
                            ) : "Delete"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
} 

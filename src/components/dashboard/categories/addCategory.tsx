"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResponsiveModal, ResponsiveModalClose, ResponsiveModalContent, ResponsiveModalFooter, ResponsiveModalHeader, ResponsiveModalTitle, ResponsiveModalTrigger } from "@/components/ui/responsive-modal";
import { Loader2, Plus } from "lucide-react";
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useState, useCallback } from "react";
import { toast } from "sonner";
import axios from 'axios'
import { IApiResponse } from "@/types";
import { cn } from "@/lib/utils";
const AddNewCategorySchema = z.object({
    category: z.string().min(3, { message: "Category name is required" })
})
export function AddCategory() {
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
                            <ResponsiveModalClose asChild>
                                <Button
                                    disabled={isSubmittingForm}
                                    variant={"outline"}
                                    className="flex-1">
                                    Close
                                </Button>
                            </ResponsiveModalClose>
                            <Button
                                disabled={isSubmittingForm}
                                className=" cursor-pointer flex-1">
                                {isSubmittingForm ? (
                                    <>
                                        <Loader2 className={"size-4 animate-spin"} />
                                        Saving
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
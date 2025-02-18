"use client"

import { useDispatch, useSelector } from 'react-redux';
import { createPropertyAction } from '../../redux/action/createProperty';
import { updatePropertyAction } from '../../redux/action/updateProperty';
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { SideBar } from "@/AppComponent/sideBar"
import { ModeToggle } from '@/AppComponent/mode-toggle'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { AppDispatch, RootState } from '../../redux/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { useState, useEffect } from 'react';


const formSchema = z.object({
    title: z.string().min(2, { message: "Title must be at least 2 characters." }).max(50, { message: "Title must be at most 50 characters." }),
    description: z.string().min(10, { message: "Description must be at least 10 characters." }).max(2545000),
    pricePerNight: z.preprocess((val) => String(val), z.string().min(1, { message: "pricePerNight can't be empty." }).max(50, { message: "pricePerNight must be at most 50 characters." })),
    location: z.string().min(5, { message: "location must be at least 5 characters." }).max(50, { message: "location must be at most 50 characters." }),
    propertyImage: z.union([
        z.string().url("Invalid image URL"), // Existing image URL (when editing)
        z.instanceof(File, { message: "Please select a valid image file" }) // New file (when uploading)
    ]).optional(),

})

export default function CreateandUpdateProperty() {
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "15rem",
                } as React.CSSProperties
            }
        >
            <SideBar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 px-4 justify-between mb-4">
                    <SidebarTrigger className="-ml-1 dark:text-white" />
                    <ModeToggle />
                </header>
                <CreatePropertyContent />
            </SidebarInset>
        </SidebarProvider>
    )
}

export const CreatePropertyContent = () => {
    const location = useLocation();
    const propertyToEdit = location.state?.propertyToEdit

    const creatingProperty = useSelector((state: RootState) => state.createProperty.loading);
    const updatingProperty = useSelector((state: RootState) => state.updateProperty.loading);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const loading = creatingProperty || updatingProperty

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate()
    const { toast } = useToast()


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: propertyToEdit ?? {
            title: "",
            description: "",
            pricePerNight: "",
            location: "",
            propertyImage: null,
        },
    })

    useEffect(() => {
        if (propertyToEdit?.propertyImage) {
            setImagePreview(propertyToEdit.propertyImage);
            form.setValue("propertyImage", propertyToEdit.propertyImage);
        }
    }, [propertyToEdit, form])

    const onCreateProperty = async (values: z.infer<typeof formSchema>) => {
        try {
            let formDataToSend = {
                ...values,
                propertyImage: values.propertyImage instanceof File ? values.propertyImage : null,
            };
            const resultAction = await dispatch(createPropertyAction(formDataToSend));
            unwrapResult(resultAction);
            const successMessage = resultAction.payload?.message || 'Property created successfully!';
            toast({
                description: successMessage,
            });
            form.reset()
            navigate("/admin/property")
        } catch (error: any) {
            const errorMessage = error?.message || 'Failed to create property';
            toast({
                variant: "destructive",
                description: errorMessage,
            })
        }
    }

    const onUpdateProperty = async (values: z.infer<typeof formSchema>) => {
        if (!propertyToEdit?.id) {
            toast({
                variant: "destructive",
                description: "Property ID is missing.",
            });
            return;
        }
         
        let formDataToSend = {
            id: { id: propertyToEdit.id },
            formData: {
                ...values,
                propertyImage: values.propertyImage instanceof File ? values.propertyImage : null
            }
        };
        try {
            const resultAction = await dispatch(updatePropertyAction(formDataToSend));
            unwrapResult(resultAction);
            const successMessage = resultAction.payload?.message || 'Property Updated successfully!';
            toast({
                description: successMessage,
            });
            form.reset()
            navigate("/admin/property")
        } catch (error: any) {
            const errorMessage = error?.message || 'Failed to update property!';
            toast({
                variant: "destructive",
                description: errorMessage,
            })
        }
    }

    const handleSubmit = form.handleSubmit(propertyToEdit ? onUpdateProperty : onCreateProperty)

    return (
        <div>
            <h1 className="text-xl dark:text-white ml-8 font-bold">{propertyToEdit ? "Update Property" : "Create Property"}</h1>
            <Form {...form}>
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="flex flex-1 flex-col gap-4 py-4 px-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Title of the property" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="pricePerNight"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>PricePerNight</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Price of the property per night" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Location</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Location of the property" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="propertyImage"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Property Image</FormLabel>
                                    <FormControl>
                                        <div className="space-y-2">
                                            {imagePreview && (
                                                <img
                                                    src={imagePreview}
                                                    alt="Cover Preview"
                                                    className="mt-2 w-32 h-32 object-cover rounded"
                                                />
                                            )}
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0] || null;
                                                    field.onChange(file); // Update form value

                                                    if (file) {
                                                        const fileURL = URL.createObjectURL(file);
                                                        setImagePreview(fileURL); // Replace input with new file preview
                                                    }
                                                }}
                                                onBlur={field.onBlur}
                                                name={field.name}
                                                ref={field.ref}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea className="h-[20vh] resize-none" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button type="submit" className="ml-8" disabled={loading} >
                        {loading ? <Loader2 className='animate-spin' /> : (propertyToEdit ? "Update" : "Create")}
                    </Button>
                </form>
            </Form>
        </div>
    )
}
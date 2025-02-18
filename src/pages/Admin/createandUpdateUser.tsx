"use client"

import { useDispatch, useSelector } from 'react-redux';
import { createUserAction } from '../../redux/action/createUser';
import { updateUserAction } from '../../redux/action/updateUser';
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { AppDispatch, RootState } from '../../redux/store';
import { useNavigate, useLocation } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';

const formSchema = z.object({
    name: z.string().min(1, { message: "Name must be at least 1 character." }).max(50, { message: "Name must be at most 50 characters." }),
    email: z.string().email({ message: "Invalid email address" }),
    phoneNumber: z.string().min(10, { message: "Phone NUmber must be at least 10 characters." }).max(15, { message: "Name must be at most 15 characters." }),
    role: z.string().nonempty({ message: "Role is required." }),
})

export default function CreateandUpdateUser() {
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
                <CreateBlogContent />
            </SidebarInset>
        </SidebarProvider>
    )
}

export const CreateBlogContent = () => {
    const creatingUser = useSelector((state: RootState) => state.createUser.loading);
    const updatingUser = useSelector((state: RootState) => state.updateUser.loading);
    const loading = creatingUser || updatingUser
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate()
    const { toast } = useToast()

    const location = useLocation()
    const userToEdit = location.state?.userToEdit;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: userToEdit ?? {
            name: "",
            email: "",
            role: "",
            phoneNumber: "",
        },
    })

    const onCreateUser = async (values: z.infer<typeof formSchema>) => {
        try {
            const resultAction = await dispatch(createUserAction(values));
            unwrapResult(resultAction);
            const successMessage = resultAction.payload?.message || 'User created successfully!';
            toast({
                description: successMessage,
            });
            form.reset()
            navigate("/admin/users")
        } catch (error: any) {
            const errorMessage = error?.message || 'Failed to create user';
            toast({
                variant: "destructive",
                description: errorMessage,
            })
        }
    }

    const onEditUser = async (values: z.infer<typeof formSchema>) => {
        if (!userToEdit?.uuid) {
            toast({
                variant: "destructive",
                description: "User ID is missing.",
            });
            return;
        }

        try {
            const resultAction = await dispatch(
                updateUserAction({
                    id: { uuid: userToEdit.uuid },
                    formData: values,
                }));
            unwrapResult(resultAction);
            const successMessage = resultAction.payload?.message || 'User updated successfully!';
            toast({
                description: successMessage,
            });
            navigate("/admin/users")
        } catch (error: any) {
            const errorMessage = error?.message || 'Failed to update user';
            toast({
                variant: "destructive",
                description: errorMessage,
            })
        }
    }

    const handleSubmit = form.handleSubmit(userToEdit ? onEditUser : onCreateUser)

    return (
        <div>
            <h1 className="text-xl dark:text-white ml-8 font-bold">{userToEdit ? "Update User" : "Create User"}</h1>
            <Form {...form}>
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="flex flex-1 flex-col gap-4 py-4 px-8">

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Name of the user" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter user email address"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input type="Number" placeholder="Enter user phone number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <FormControl>
                                        <Select
                                            value={field.value}
                                            onValueChange={(value) => field.onChange(value)}
                                        >
                                            <SelectTrigger >
                                                <SelectValue placeholder="Select Role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="admin">Admin</SelectItem>
                                                <SelectItem value="author">Author</SelectItem>
                                            </SelectContent>
                                        </Select>

                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button type="submit" className="ml-8" disabled={loading}>
                        {loading ? <Loader2 className='animate-spin' /> : (userToEdit ? "Update" : "Create")}
                    </Button>
                </form>
            </Form>
        </div>
    )
}
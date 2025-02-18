import React, { useEffect, useMemo, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchUsersAction } from "../../redux/action/users"
import { deleteUserAction } from "../../redux/action/deleteUser"
import { setCurrentPage } from "../../redux/slice/users"
import { SidebarProvider, SidebarTrigger, SidebarInset, } from "@/components/ui/sidebar"
import { SideBar } from "@/AppComponent/sideBar"
import { ModeToggle } from '@/AppComponent/mode-toggle'
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Loader2, Pen, Trash2 } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { User } from '../../types/types';
import Pagination from "@/AppComponent/pagination"
import { AppDispatch, RootState } from '../../redux/store';
import Search from "@/AppComponent/search"
import { unwrapResult } from '@reduxjs/toolkit';
import { useToast } from "@/hooks/use-toast"

export default function Users() {
    return (
        <div>
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
                    <UsersContent />
                </SidebarInset>
            </SidebarProvider>

        </div>
    )
}

export const UsersContent = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<User | null>(null)

    const dispatch = useDispatch<AppDispatch>();
    const { toast } = useToast()
    const  navigate = useNavigate();

    const { usersByPage, currentPage, totalPages, status, } = useSelector((state: RootState) => state.users);
    const loading = useSelector((state: RootState) => state.deleteUser.loading);

    // Get cached users for the current page
    const users = usersByPage[currentPage] || []

    useEffect(() => {
        if (!usersByPage[currentPage]) {
            dispatch(fetchUsersAction(currentPage))
        }
    }, [dispatch, currentPage, usersByPage]);

    const filteredUsers = useMemo(() => {
        return users.filter((user: User) =>
            Object.values(user)
                .join(" ")
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
        )
    }, [users, searchQuery])

    const handleSearch = (value: string) => {
        setSearchQuery(value);
    };

    //handle page change
    const handlePageChange = (page: number) => {
        dispatch(setCurrentPage(page));
    }

    const handleDeleteUser = (user: User) => {
        setUserToDelete(user)
        setIsDialogOpen(true);
    };

    const handleCancel = () => {
        setUserToDelete(null);
        setIsDialogOpen(false);
    };

    const handleConfirmDelete = async (userId: any) => {
        if (userToDelete) {
            try {
                const resultAction = await dispatch(deleteUserAction(userId));
                unwrapResult(resultAction);
                const successMessage = resultAction.payload?.message;
                toast({
                    description: successMessage,
                });
            } catch (error: any) {
                const errorMessage = error?.message || 'Failed to delete user';
                toast({
                    variant: "destructive",
                    description: errorMessage,
                })
            }
            finally {
                setUserToDelete(null);
                setIsDialogOpen(false);
            }
        }
    };

    const handleEditUser = (user: User) => {
        navigate ("/authorized/createUser", {state:{userToEdit:user}})
    }

    return (
        <div className="ml-8 mr-12 stick">
            <div className="flex justify-between">
                <h1 className="text-3xl dark:text-white  font-bold">Users</h1>
                <Search query={searchQuery} onSearch={handleSearch} />
                <Link to="/authorized/createUser">
                    <Button className="">Create User</Button>
                </Link>

            </div>
            <div className="mt-12 dark:text-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone Number</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead className="text-center" >Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {status === "loading" ? (
                            <TableRow>
                                <TableCell colSpan={5}>
                                    <div className="flex items-center justify-center h-40">
                                        <span className="text-lg dark:text-white flex">
                                            <Loader2 className="animate-spin" />
                                            <p className="pl-2">Loading...</p>
                                        </span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : filteredUsers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5}>
                                    <div className="flex items-center justify-center h-40">
                                        <span className="text-lg dark:text-white">No results found</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredUsers.map((user: User) => (
                                <TableRow key={user.uuid}>
                                    <TableCell>{user.name.charAt(0).toUpperCase() + user.name.slice(1)}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phoneNumber}</TableCell>
                                    <TableCell >{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</TableCell>
                                    <TableCell className="text-center">
                                        <div className="flex gap-2 items-center justify-center">
                                            <Pen className="cursor-pointer h-[1.3em]" onClick={ () => handleEditUser(user)} />
                                            <Trash2 className="cursor-pointer h-[1.3em]" onClick={() => handleDeleteUser(user)} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageCHange={handlePageChange}
                />
            </div>
            {isDialogOpen && userToDelete &&  (
                <Dialog open={isDialogOpen} onOpenChange={handleCancel}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-center">Are you sure you want to delete {userToDelete.name} ?</DialogTitle>
                            <DialogDescription className="pt-4 justify-center flex ">
                                <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                                <Button variant="destructive" className="ml-4" disabled={loading} onClick={() => handleConfirmDelete(userToDelete.uuid)}>
                                    {loading ? <Loader2 className='animate-spin' /> : 'Confirm'}
                                </Button>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    )
}
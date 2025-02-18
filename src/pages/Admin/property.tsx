import React, { useEffect, useMemo, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchPropertiesAction } from "../../redux/action/property"
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
import { AppDispatch, RootState } from '../../redux/store';
import Search from "@/AppComponent/search"
import { Properties } from "../../types/types"
import { unwrapResult } from '@reduxjs/toolkit';
import { useToast } from "@/hooks/use-toast"
import { deletePropertyAction } from "@/redux/action/deleteProperty"

export default function allProperty() {
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
                    <PropertyContent />
                </SidebarInset>
            </SidebarProvider>

        </div>
    )
}

export const PropertyContent = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [PropertyToDelete, setPropertyToDelete] = useState<Properties | null>(null)

    const dispatch = useDispatch<AppDispatch>();
    const { toast } = useToast()
    const navigate = useNavigate()
    const { properties,status, } = useSelector((state: RootState) => state.propetiess);
    const loading = useSelector((state: RootState) => state.deleteProperty.loading);

    const property = Object.values(properties).flat() || [];

    useEffect(() => {
        dispatch(fetchPropertiesAction());
        
    }, [dispatch]);

    const filteredPropeties = useMemo(() => {
        return property.filter((property: Properties) =>
            Object.values(property)
                .join(" ")
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
        );
    }, [property, searchQuery])

    const handleSearch = (value: string) => {
        setSearchQuery(value);
    }

    const handledeleteProperty = (property: Properties) => {
        setPropertyToDelete(property)
        setIsDialogOpen(true);
    };

    const handleCancel = () => {
        setPropertyToDelete(null);
        setIsDialogOpen(false);
    };

    const handleConfirmDelete = async (propertyId: any) => {
        if (PropertyToDelete) {
            try {
                const resultAction = await dispatch(deletePropertyAction(propertyId));
                unwrapResult(resultAction);
                const successMessage = resultAction.payload?.message;
                toast({
                    description: successMessage,
                });
            } catch (error: any) {
                const errorMessage = error?.message || 'Failed to delete property';
                toast({
                    variant: "destructive",
                    description: errorMessage,
                })
            }
            finally {
                setPropertyToDelete(null);
                setIsDialogOpen(false);
            }
        }
    };

    const handleEditProperty = (property:Properties) =>{
        navigate("/authorized/createProperty", {state:{ propertyToEdit: property}});
    }

    return (
        <div className="ml-8 mr-12">
            <div className="flex justify-between">
                <h1 className="text-3xl dark:text-white  font-bold">Properties</h1>
                <Search query={searchQuery} onSearch={handleSearch} />
                <Link to="/authorized/createProperty">
                    <Button className="">Create Property</Button>
                </Link>
            </div>
            <div className="mt-12 dark:text-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Price/Night</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead className="text-center">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {status === "loading" ? (
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <div className="flex items-center justify-center h-40">
                                        <span className="text-lg dark:text-white flex">
                                            <Loader2 className="animate-spin" />
                                            <p className="pl-2">Loading...</p>
                                        </span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : filteredPropeties.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5}>
                                    <div className="flex items-center justify-center h-40">
                                        <span className="text-md dark:text-white">No results found</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredPropeties.map((property: Properties) => (
                                <TableRow key={property.id}>
                                    <TableCell>{property.title}</TableCell>
                                    <TableCell >{property.description
                                        ? `${property.description.slice(0, 10)}...`
                                        : property.description}
                                    </TableCell>
                                    <TableCell>{property.pricePerNight}</TableCell>
                                    <TableCell>{property.location}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2 items-center justify-center">
                                            <Pen className="cursor-pointer h-[1.3em]" onClick={() => handleEditProperty(property)} />
                                            <Trash2 className="cursor-pointer h-[1.3em]" onClick={() => handledeleteProperty(property)}/>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
            {isDialogOpen && PropertyToDelete && (
                <Dialog open={isDialogOpen} onOpenChange={handleCancel}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-center">Are you sure you want to delete {PropertyToDelete.title} ?</DialogTitle>
                            <DialogDescription className="pt-4 justify-center flex ">
                                <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                                <Button variant="destructive" className="ml-4" disabled={loading} onClick={() => handleConfirmDelete(PropertyToDelete.id)}>
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
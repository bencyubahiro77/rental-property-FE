import { ChevronUp, Home, Book, Users, User2 } from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Menu items.
const items = [
  // {
  //   title: "Home",
  //   url: "/admin",
  //   icon: Home,
  //   allowedRoles: ['admin']
  // },
  {
    title: "Property",
    url: "/admin/property",
    icon: Book,
    allowedRoles: ['Admin', 'Hosts']
  },
  {
    title: "Booking",
    url: "/admin/Booking",
    icon: Users,
    allowedRoles: ['Admin',"Hosts"]
  },
]

export function SideBar() {
  const location = useLocation();
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userRole = user ? user.role : null;

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-2xl justify-center mb-4 mt-4 font-extrabold">Rental Property</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                // Check if the user's role matches the allowed roles for the item
                if (!item.allowedRoles.includes(userRole)) {
                  return null
                }
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem
                    className={`py-2 ${isActive ? "bg-black dark:bg-color1 text-white rounded-lg " : ""}`}
                    key={item.title}
                  >
                    <SidebarMenuButton
                      className="text-lg pl-4 font-semibold opacity-100 hover:bg-inherit hover:text-white rounded-lg dark:hover:text-white"
                      asChild
                    >
                      <Link to={item.url} className={`${isActive ? "hover:text-white":"hover:text-black" }`} >
                        <item.icon className="mr-4" />
                        <span >{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <LogoutSideBar />
    </Sidebar>
  )
}

export function LogoutSideBar() {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null
  const navigate = useNavigate()

  const signOut = () => {
    localStorage.clear()
    navigate("/")
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton >
          <User2 /> {user.firstName} {user.lastName}
          <ChevronUp className="ml-auto" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44">
        <DropdownMenuItem className="cursor-pointer">
          <span>Account</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={signOut} className="cursor-pointer">
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

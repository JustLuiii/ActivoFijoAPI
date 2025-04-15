import { Package } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { Link, useLocation } from "react-router"
import { OPTION_SIDE_BAR } from "@/constants/routers";

export const MainSidebar = () => {

    const pathname = useLocation().pathname;

    const navItems = OPTION_SIDE_BAR(pathname);

    return (
        <Sidebar>
            <SidebarHeader className="flex items-center px-4 py-5">
                <Link to="/" className="flex items-center gap-2 font-semibold">
                    <Package className="h-6 w-6" />
                    <span>Gestión Activo Fijo</span>
                </Link>
            </SidebarHeader>
            <SidebarContent>
                {navItems.map((section) => (
                    <SidebarGroup key={section.title}>
                        <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {section.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild isActive={item.isActive} tooltip={item.title}>
                                            <Link to={item.href}>
                                                <item.icon className="h-4 w-4" />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}


import { Building2, Users, Boxes, Package, LayoutDashboard } from "lucide-react"

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

export const MainSidebar = () => {

    const pathname = useLocation().pathname;

    const navItems = [
        {
            title: '',
            items: [
                {
                    title: 'DashBoard',
                    icon: LayoutDashboard,
                    href: "/",
                    isActive: pathname?.endsWith("/")
                }
            ]
        },
        {
            title: "Gestión",
            items: [
                {
                    title: "Departamentos",
                    icon: Building2,
                    href: "/departments",
                    isActive: pathname?.startsWith("/departments"),
                },
                {
                    title: "Empleados",
                    icon: Users,
                    href: "/employees",
                    isActive: pathname?.startsWith("/employees"),
                },
                {
                    title: "Tipos de Activos",
                    icon: Boxes,
                    href: "/asset-types",
                    isActive: pathname?.startsWith("/asset-types"),
                },
                {
                    title: "Activos Fijos",
                    icon: Package,
                    href: "/assets",
                    isActive: pathname?.startsWith("/assets"),
                },
            ],
        },

    ]

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


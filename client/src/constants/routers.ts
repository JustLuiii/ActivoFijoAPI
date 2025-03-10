import { Boxes, Building2, LayoutDashboard, Package, Users } from "lucide-react";


export const optionsSideBar = (pathname: string) => ([
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

]);
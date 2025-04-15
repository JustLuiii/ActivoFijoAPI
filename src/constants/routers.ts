import { Boxes, Building2, Calculator, LayoutDashboard, Package, Users } from "lucide-react";


export const OPTION_SIDE_BAR = (pathname: string) => ([
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
            {
                title: "Usuarios",
                icon: Package,
                href: "/users",
                isActive: pathname?.startsWith("/users"),
            },
            {
                title: "Entradas contable",
                icon: Building2,
                href: "/accountant-entrys",
                isActive: pathname?.startsWith("/accountant-entrys"),
            }
        ],
    },
    {
        title: 'Herramientas',
        items: [
            {
                title: "Calcular Depreciación",
                icon: Calculator,
                href: "/calculate-depreciation",
                isActive: pathname?.startsWith("/calculate-depreciation"),
            }
        ]
    }

]);
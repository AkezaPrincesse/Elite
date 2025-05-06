"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Building2,
  LayoutDashboard,
  Users,
  FileText,
  DollarSign,
  Wrench,
  Settings,
  FileBarChart,
  Home,
  User,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"

interface AppSidebarProps {
  userRole: string | null
}

export function AppSidebar({ userRole }: AppSidebarProps) {
  const pathname = usePathname()

  // Define navigation items based on user role
  const getNavItems = () => {
    const commonItems = [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
    ]

    const adminItems = [
      {
        title: "Properties",
        href: "/properties",
        icon: Building2,
      },
      {
        title: "Tenants",
        href: "/tenants",
        icon: Users,
      },
      {
        title: "Leases",
        href: "/leases",
        icon: FileText,
      },
      {
        title: "Payments",
        href: "/payments",
        icon: DollarSign,
      },
      {
        title: "Maintenance",
        href: "/maintenance",
        icon: Wrench,
      },
      {
        title: "Users",
        href: "/users",
        icon: User,
      },
      {
        title: "Reports",
        href: "/reports",
        icon: FileBarChart,
      },
      {
        title: "Settings",
        href: "/settings",
        icon: Settings,
      },
    ]

    const agentItems = [
      {
        title: "Properties",
        href: "/properties",
        icon: Building2,
      },
      {
        title: "Tenants",
        href: "/tenants",
        icon: Users,
      },
      {
        title: "Leases",
        href: "/leases",
        icon: FileText,
      },
      {
        title: "Payments",
        href: "/payments",
        icon: DollarSign,
      },
      {
        title: "Maintenance",
        href: "/maintenance",
        icon: Wrench,
      },
      {
        title: "Reports",
        href: "/reports",
        icon: FileBarChart,
      },
    ]

    const tenantItems = [
      {
        title: "My Property",
        href: "/my-property",
        icon: Home,
      },
      {
        title: "My Lease",
        href: "/my-lease",
        icon: FileText,
      },
      {
        title: "Payments",
        href: "/payments",
        icon: DollarSign,
      },
      {
        title: "Maintenance Requests",
        href: "/maintenance",
        icon: Wrench,
      },
      {
        title: "Profile",
        href: "/profile",
        icon: User,
      },
    ]

    if (userRole === "admin") {
      return [...commonItems, ...adminItems]
    } else if (userRole === "agent") {
      return [...commonItems, ...agentItems]
    } else {
      return [...commonItems, ...tenantItems]
    }
  }

  const navItems = getNavItems()

  return (
    <Sidebar>
      <SidebarHeader className="border-b py-4">
        <div className="flex items-center px-4">
          <Building2 className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-semibold">REMS</span>
          <div className="ml-auto md:hidden">
            <SidebarTrigger />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href}>
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="text-xs text-muted-foreground">Real Estate Management System v1.0</div>
      </SidebarFooter>
    </Sidebar>
  )
}

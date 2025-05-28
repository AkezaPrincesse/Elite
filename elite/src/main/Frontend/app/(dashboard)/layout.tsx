"use client"

import type React from "react"
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/toaster"
import { UserNav } from "@/components/user-nav"

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()
  const pathname = usePathname()
  const [userRole, setUserRole] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real application, you would verify the user's session with your backend
    const role = localStorage.getItem("userRole")
    setUserRole(role)
    setIsLoading(false)

    if (!role && pathname !== "/login") {
      router.push("/login")
    }
  }, [pathname, router])

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar userRole={userRole} />
        <div className="flex-1">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
            <div className="flex-1" />
            <UserNav userRole={userRole} />
          </header>
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  )
}

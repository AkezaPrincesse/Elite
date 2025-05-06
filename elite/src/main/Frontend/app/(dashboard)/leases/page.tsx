"use client"
import { Search, Filter, ArrowUpDown, MoreHorizontal, FileSignature } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LeasesPage() {
  // Sample leases data
  const leases = [
    {
      id: "L-2023-001",
      tenant: "John Smith",
      property: "Sunset Apartments #304",
      startDate: "2023-01-01",
      endDate: "2025-12-31",
      monthlyRent: 1200,
      status: "active",
    },
    {
      id: "L-2023-002",
      tenant: "Sarah Johnson",
      property: "Oakwood Residences #102",
      startDate: "2023-03-15",
      endDate: "2025-03-15",
      monthlyRent: 1500,
      status: "active",
    },
    {
      id: "L-2023-003",
      tenant: "Michael Brown",
      property: "Riverside Condos #215",
      startDate: "2022-09-01",
      endDate: "2025-08-31",
      monthlyRent: 1800,
      status: "active",
    },
    {
      id: "L-2023-004",
      tenant: "Emily Davis",
      property: "Pine Street Houses #3",
      startDate: "2023-01-15",
      endDate: "2025-01-15",
      monthlyRent: 2200,
      status: "active",
    },
    {
      id: "L-2023-005",
      tenant: "David Wilson",
      property: "Maple Court Apartments #112",
      startDate: "2022-11-01",
      endDate: "2025-10-31",
      monthlyRent: 1350,
      status: "pending",
    },
    {
      id: "L-2022-006",
      tenant: "Jennifer Taylor",
      property: "Cedar Heights #205",
      startDate: "2022-12-01",
      endDate: "2025-11-30",
      monthlyRent: 1650,
      status: "expired",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            Active
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
            Pending
          </Badge>
        )
      case "expired":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
            Expired
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Leases</h2>
          <p className="text-muted-foreground">Manage your property lease agreements</p>
        </div>
        <Button>
          <FileSignature className="mr-2 h-4 w-4" /> Create Lease
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex w-full items-center space-x-2 md:w-auto">
          <Input placeholder="Search leases..." className="h-9 md:w-[300px]" />
          <Button variant="outline" size="sm" className="h-9 px-2 lg:px-3">
            <Search className="h-4 w-4" />
            <span className="sr-only md:not-sr-only md:ml-2">Search</span>
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Status</DropdownMenuItem>
              <DropdownMenuItem>Property</DropdownMenuItem>
              <DropdownMenuItem>Tenant</DropdownMenuItem>
              <DropdownMenuItem>End Date</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Lease ID</DropdownMenuItem>
              <DropdownMenuItem>Tenant Name</DropdownMenuItem>
              <DropdownMenuItem>Start Date</DropdownMenuItem>
              <DropdownMenuItem>End Date</DropdownMenuItem>
              <DropdownMenuItem>Monthly Rent</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Leases</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lease ID</TableHead>
                  <TableHead>Tenant</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Monthly Rent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leases.map((lease) => (
                  <TableRow key={lease.id}>
                    <TableCell className="font-medium">{lease.id}</TableCell>
                    <TableCell>{lease.tenant}</TableCell>
                    <TableCell>{lease.property}</TableCell>
                    <TableCell>{lease.startDate}</TableCell>
                    <TableCell>{lease.endDate}</TableCell>
                    <TableCell>${lease.monthlyRent}</TableCell>
                    <TableCell>{getStatusBadge(lease.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Print</DropdownMenuItem>
                          <DropdownMenuItem>Renew</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Terminate</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="active" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lease ID</TableHead>
                  <TableHead>Tenant</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Monthly Rent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leases
                  .filter((lease) => lease.status === "active")
                  .map((lease) => (
                    <TableRow key={lease.id}>
                      <TableCell className="font-medium">{lease.id}</TableCell>
                      <TableCell>{lease.tenant}</TableCell>
                      <TableCell>{lease.property}</TableCell>
                      <TableCell>{lease.startDate}</TableCell>
                      <TableCell>{lease.endDate}</TableCell>
                      <TableCell>${lease.monthlyRent}</TableCell>
                      <TableCell>{getStatusBadge(lease.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="pending" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lease ID</TableHead>
                  <TableHead>Tenant</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Monthly Rent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leases
                  .filter((lease) => lease.status === "pending")
                  .map((lease) => (
                    <TableRow key={lease.id}>
                      <TableCell className="font-medium">{lease.id}</TableCell>
                      <TableCell>{lease.tenant}</TableCell>
                      <TableCell>{lease.property}</TableCell>
                      <TableCell>{lease.startDate}</TableCell>
                      <TableCell>{lease.endDate}</TableCell>
                      <TableCell>${lease.monthlyRent}</TableCell>
                      <TableCell>{getStatusBadge(lease.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="expired" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lease ID</TableHead>
                  <TableHead>Tenant</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Monthly Rent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leases
                  .filter((lease) => lease.status === "expired")
                  .map((lease) => (
                    <TableRow key={lease.id}>
                      <TableCell className="font-medium">{lease.id}</TableCell>
                      <TableCell>{lease.tenant}</TableCell>
                      <TableCell>{lease.property}</TableCell>
                      <TableCell>{lease.startDate}</TableCell>
                      <TableCell>{lease.endDate}</TableCell>
                      <TableCell>${lease.monthlyRent}</TableCell>
                      <TableCell>{getStatusBadge(lease.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

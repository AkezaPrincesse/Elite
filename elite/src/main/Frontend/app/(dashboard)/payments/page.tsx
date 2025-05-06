"use client"

import { useState, useEffect } from "react"
import { Search, Filter, ArrowUpDown, MoreHorizontal, Plus, Download, Receipt, CreditCard } from "lucide-react"
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function PaymentsPage() {
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    setUserRole(localStorage.getItem("userRole"))
  }, [])

  // Sample payments data
  const payments = [
    {
      id: "P-2023-001",
      tenant: "John Smith",
      property: "Sunset Apartments #304",
      amount: 1200,
      date: "2023-05-01",
      method: "Credit Card",
      status: "completed",
      type: "Rent",
    },
    {
      id: "P-2023-002",
      tenant: "Sarah Johnson",
      property: "Oakwood Residences #102",
      amount: 1500,
      date: "2023-05-01",
      method: "Bank Transfer",
      status: "completed",
      type: "Rent",
    },
    {
      id: "P-2023-003",
      tenant: "Michael Brown",
      property: "Riverside Condos #215",
      amount: 1800,
      date: "2023-05-01",
      method: "Check",
      status: "completed",
      type: "Rent",
    },
    {
      id: "P-2023-004",
      tenant: "Emily Davis",
      property: "Pine Street Houses #3",
      amount: 2200,
      date: "2023-05-01",
      method: "Bank Transfer",
      status: "completed",
      type: "Rent",
    },
    {
      id: "P-2023-005",
      tenant: "David Wilson",
      property: "Maple Court Apartments #112",
      amount: 1350,
      date: "2023-05-01",
      method: "Credit Card",
      status: "pending",
      type: "Rent",
    },
    {
      id: "P-2023-006",
      tenant: "Jennifer Taylor",
      property: "Cedar Heights #205",
      amount: 1650,
      date: "2023-04-01",
      method: "Bank Transfer",
      status: "completed",
      type: "Rent",
    },
    {
      id: "P-2023-007",
      tenant: "John Smith",
      property: "Sunset Apartments #304",
      amount: 150,
      date: "2023-04-15",
      method: "Credit Card",
      status: "completed",
      type: "Maintenance",
    },
    {
      id: "P-2023-008",
      tenant: "Sarah Johnson",
      property: "Oakwood Residences #102",
      amount: 500,
      date: "2023-04-10",
      method: "Bank Transfer",
      status: "completed",
      type: "Security Deposit",
    },
  ]

  // Filter payments for tenant view
  const filteredPayments =
    userRole === "tenant" ? payments.filter((payment) => payment.tenant === "John Smith") : payments

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            Completed
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
            Pending
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
            Failed
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Calculate summary statistics
  const calculateSummary = () => {
    const relevantPayments = filteredPayments.filter((payment) => payment.status === "completed")

    const totalCollected = relevantPayments.reduce((sum, payment) => sum + payment.amount, 0)
    const rentPayments = relevantPayments.filter((payment) => payment.type === "Rent")
    const rentCollected = rentPayments.reduce((sum, payment) => sum + payment.amount, 0)
    const otherPayments = relevantPayments.filter((payment) => payment.type !== "Rent")
    const otherCollected = otherPayments.reduce((sum, payment) => sum + payment.amount, 0)

    return {
      totalCollected,
      rentCollected,
      otherCollected,
      paymentCount: relevantPayments.length,
    }
  }

  const summary = calculateSummary()

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Payments</h2>
          <p className="text-muted-foreground">
            {userRole === "tenant" ? "View your payment history" : "Manage property payments and transactions"}
          </p>
        </div>
        {userRole !== "tenant" && (
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Record Payment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Record New Payment</DialogTitle>
                <DialogDescription>Enter the payment details below.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="tenant" className="text-right">
                    Tenant
                  </Label>
                  <Select defaultValue="john-smith">
                    <SelectTrigger id="tenant" className="col-span-3">
                      <SelectValue placeholder="Select tenant" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="john-smith">John Smith</SelectItem>
                      <SelectItem value="sarah-johnson">Sarah Johnson</SelectItem>
                      <SelectItem value="michael-brown">Michael Brown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="property" className="text-right">
                    Property
                  </Label>
                  <Select defaultValue="sunset-304">
                    <SelectTrigger id="property" className="col-span-3">
                      <SelectValue placeholder="Select property" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sunset-304">Sunset Apartments #304</SelectItem>
                      <SelectItem value="oakwood-102">Oakwood Residences #102</SelectItem>
                      <SelectItem value="riverside-215">Riverside Condos #215</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-right">
                    Amount
                  </Label>
                  <div className="col-span-3 flex items-center">
                    <span className="mr-2">$</span>
                    <Input id="amount" defaultValue="1200" className="flex-1" />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Date
                  </Label>
                  <Input id="date" type="date" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="method" className="text-right">
                    Method
                  </Label>
                  <Select defaultValue="credit-card">
                    <SelectTrigger id="method" className="col-span-3">
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credit-card">Credit Card</SelectItem>
                      <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                      <SelectItem value="check">Check</SelectItem>
                      <SelectItem value="cash">Cash</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Type
                  </Label>
                  <Select defaultValue="rent">
                    <SelectTrigger id="type" className="col-span-3">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rent">Rent</SelectItem>
                      <SelectItem value="security-deposit">Security Deposit</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="late-fee">Late Fee</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notes" className="text-right">
                    Notes
                  </Label>
                  <Textarea id="notes" placeholder="Payment notes" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Payment</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
        {userRole === "tenant" && (
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <CreditCard className="mr-2 h-4 w-4" /> Make Payment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Make a Payment</DialogTitle>
                <DialogDescription>Enter your payment details below.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-right">
                    Amount
                  </Label>
                  <div className="col-span-3 flex items-center">
                    <span className="mr-2">$</span>
                    <Input id="amount" defaultValue="1200" className="flex-1" />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="payment-type" className="text-right">
                    Type
                  </Label>
                  <Select defaultValue="rent">
                    <SelectTrigger id="payment-type" className="col-span-3">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rent">Rent</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="late-fee">Late Fee</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="payment-method" className="text-right">
                    Method
                  </Label>
                  <Select defaultValue="credit-card">
                    <SelectTrigger id="payment-method" className="col-span-3">
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credit-card">Credit Card</SelectItem>
                      <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="card-number" className="text-right">
                    Card Number
                  </Label>
                  <Input id="card-number" placeholder="**** **** **** ****" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="expiry" className="text-right">
                    Expiry
                  </Label>
                  <Input id="expiry" placeholder="MM/YY" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="cvv" className="text-right">
                    CVV
                  </Label>
                  <Input id="cvv" placeholder="***" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Process Payment</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {userRole !== "tenant" && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Collected</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${summary.totalCollected.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rent Collected</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${summary.rentCollected.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {(summary.rentCollected / summary.totalCollected) * 100}% of total
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Other Payments</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${summary.otherCollected.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {(summary.otherCollected / summary.totalCollected) * 100}% of total
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Payment Count</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.paymentCount}</div>
              <p className="text-xs text-muted-foreground">+7 from last month</p>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex w-full items-center space-x-2 md:w-auto">
          <Input placeholder="Search payments..." className="h-9 md:w-[300px]" />
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
              <DropdownMenuItem>Payment Method</DropdownMenuItem>
              <DropdownMenuItem>Payment Type</DropdownMenuItem>
              <DropdownMenuItem>Date Range</DropdownMenuItem>
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
              <DropdownMenuItem>Date (Newest First)</DropdownMenuItem>
              <DropdownMenuItem>Date (Oldest First)</DropdownMenuItem>
              <DropdownMenuItem>Amount (High to Low)</DropdownMenuItem>
              <DropdownMenuItem>Amount (Low to High)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm" className="h-9">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Payments</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payment ID</TableHead>
                  {userRole !== "tenant" && <TableHead>Tenant</TableHead>}
                  <TableHead>Property</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.id}</TableCell>
                    {userRole !== "tenant" && <TableCell>{payment.tenant}</TableCell>}
                    <TableCell>{payment.property}</TableCell>
                    <TableCell>${payment.amount}</TableCell>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>{payment.method}</TableCell>
                    <TableCell>{payment.type}</TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          {userRole !== "tenant" && <DropdownMenuItem>Edit</DropdownMenuItem>}
                          <DropdownMenuItem>
                            <Receipt className="mr-2 h-4 w-4" /> Generate Receipt
                          </DropdownMenuItem>
                          {userRole !== "tenant" && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">Void Payment</DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="completed" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payment ID</TableHead>
                  {userRole !== "tenant" && <TableHead>Tenant</TableHead>}
                  <TableHead>Property</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments
                  .filter((payment) => payment.status === "completed")
                  .map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.id}</TableCell>
                      {userRole !== "tenant" && <TableCell>{payment.tenant}</TableCell>}
                      <TableCell>{payment.property}</TableCell>
                      <TableCell>${payment.amount}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>{payment.method}</TableCell>
                      <TableCell>{payment.type}</TableCell>
                      <TableCell>{getStatusBadge(payment.status)}</TableCell>
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
                  <TableHead>Payment ID</TableHead>
                  {userRole !== "tenant" && <TableHead>Tenant</TableHead>}
                  <TableHead>Property</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments
                  .filter((payment) => payment.status === "pending")
                  .map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.id}</TableCell>
                      {userRole !== "tenant" && <TableCell>{payment.tenant}</TableCell>}
                      <TableCell>{payment.property}</TableCell>
                      <TableCell>${payment.amount}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>{payment.method}</TableCell>
                      <TableCell>{payment.type}</TableCell>
                      <TableCell>{getStatusBadge(payment.status)}</TableCell>
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

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Mail,
  Phone,
  Home,
  Calendar,
  FileText,
  DollarSign,
  Wrench,
  Edit,
  Download,
  MoreHorizontal,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TenantDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    setUserRole(role)

    // Redirect if tenant (tenants shouldn't see other tenant details)
    if (role === "tenant") {
      router.push("/dashboard")
    }
  }, [router])

  // This would normally come from an API call using the ID
  const tenant = {
    id: params.id,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    property: "Sunset Apartments",
    unit: "#304",
    leaseStart: "2023-01-01",
    leaseEnd: "2023-12-31",
    moveInDate: "2023-01-01",
    status: "active",
    rentAmount: 1200,
    securityDeposit: 1200,
    emergencyContact: "Jane Smith (555) 987-6543",
    image: "/placeholder.svg?height=128&width=128",
  }

  // Sample payment history
  const payments = [
    {
      id: "P-2023-001",
      date: "2023-05-01",
      amount: 1200,
      type: "Rent",
      method: "Credit Card",
      status: "completed",
    },
    {
      id: "P-2023-002",
      date: "2023-04-01",
      amount: 1200,
      type: "Rent",
      method: "Credit Card",
      status: "completed",
    },
    {
      id: "P-2023-003",
      date: "2023-03-01",
      amount: 1200,
      type: "Rent",
      method: "Credit Card",
      status: "completed",
    },
    {
      id: "P-2023-004",
      date: "2023-02-01",
      amount: 1200,
      type: "Rent",
      method: "Credit Card",
      status: "completed",
    },
    {
      id: "P-2023-005",
      date: "2023-01-01",
      amount: 2400,
      type: "Security Deposit + First Month",
      method: "Bank Transfer",
      status: "completed",
    },
  ]

  // Sample maintenance requests
  const maintenanceRequests = [
    {
      id: "M-2023-001",
      issue: "Leaking faucet in bathroom",
      description: "The bathroom sink faucet is leaking constantly, causing water to pool around the sink area.",
      date: "2023-05-01",
      status: "open",
      priority: "medium",
    },
    {
      id: "M-2023-002",
      issue: "Dishwasher not draining",
      description: "The dishwasher is not draining properly after cycles, leaving standing water at the bottom.",
      date: "2023-04-20",
      status: "completed",
      priority: "medium",
    },
    {
      id: "M-2023-003",
      issue: "Ceiling fan making noise",
      description:
        "The ceiling fan in the living room is making a rattling noise when running at medium or high speed.",
      date: "2023-03-15",
      status: "completed",
      priority: "low",
    },
  ]

  // Sample documents
  const documents = [
    {
      id: 1,
      name: "Lease Agreement",
      type: "PDF",
      size: "1.2 MB",
      date: "2023-01-01",
    },
    {
      id: 2,
      name: "Tenant Application",
      type: "PDF",
      size: "0.8 MB",
      date: "2022-12-15",
    },
    {
      id: 3,
      name: "Background Check",
      type: "PDF",
      size: "0.5 MB",
      date: "2022-12-10",
    },
    {
      id: 4,
      name: "Pet Addendum",
      type: "PDF",
      size: "0.3 MB",
      date: "2023-01-01",
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
      case "inactive":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
            Inactive
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            Completed
          </Badge>
        )
      case "open":
        return <Badge variant="destructive">Open</Badge>
      case "in-progress":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
            In Progress
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
            High
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
            Medium
          </Badge>
        )
      case "low":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Low
          </Badge>
        )
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  if (userRole === "tenant") {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.push("/tenants")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">{tenant.name}</h2>
            <div className="flex items-center text-muted-foreground">
              <Home className="mr-1 h-4 w-4" />
              {tenant.property} {tenant.unit}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" /> Edit Tenant
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Edit Tenant</DialogTitle>
                <DialogDescription>Make changes to tenant information.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="tenant-name" className="text-right">
                    Name
                  </Label>
                  <Input id="tenant-name" defaultValue={tenant.name} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="tenant-email" className="text-right">
                    Email
                  </Label>
                  <Input id="tenant-email" type="email" defaultValue={tenant.email} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="tenant-phone" className="text-right">
                    Phone
                  </Label>
                  <Input id="tenant-phone" type="tel" defaultValue={tenant.phone} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="tenant-status" className="text-right">
                    Status
                  </Label>
                  <Select defaultValue={tenant.status}>
                    <SelectTrigger id="tenant-status" className="col-span-3">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="emergency-contact" className="text-right">
                    Emergency Contact
                  </Label>
                  <Input id="emergency-contact" defaultValue={tenant.emergencyContact} className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>Actions</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Tenant Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" /> View Lease
              </DropdownMenuItem>
              <DropdownMenuItem>
                <DollarSign className="mr-2 h-4 w-4" /> Record Payment
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Calendar className="mr-2 h-4 w-4" /> Renew Lease
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <XCircle className="mr-2 h-4 w-4" /> Terminate Lease
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src={tenant.image || "/placeholder.svg"} alt={tenant.name} />
                <AvatarFallback>{tenant.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h3 className="mt-4 text-xl font-semibold">{tenant.name}</h3>
              <Badge className="mt-2" variant="outline">
                Tenant
              </Badge>
              <Separator className="my-4" />
              <div className="w-full space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{tenant.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{tenant.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Home className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {tenant.property} {tenant.unit}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Move-in: {tenant.moveInDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span>Lease ends: {tenant.leaseEnd}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lease Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Status</div>
                <div>{getStatusBadge(tenant.status)}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Lease Start</div>
                <div>{tenant.leaseStart}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Lease End</div>
                <div>{tenant.leaseEnd}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Monthly Rent</div>
                <div>${tenant.rentAmount}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Security Deposit</div>
                <div>${tenant.securityDeposit}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Payment Due</div>
                <div>1st of month</div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <FileText className="mr-2 h-4 w-4" /> View Lease Agreement
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Next Payment</div>
                <div>June 1, 2023</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Amount Due</div>
                <div>${tenant.rentAmount}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Payment Status</div>
                <div className="flex items-center text-green-600">
                  <CheckCircle className="mr-1 h-4 w-4" /> Current
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Last Payment</div>
                <div>May 1, 2023</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Payment Method</div>
                <div>Credit Card</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Auto-Pay</div>
                <div className="flex items-center text-green-600">
                  <CheckCircle className="mr-1 h-4 w-4" /> Enabled
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <DollarSign className="mr-2 h-4 w-4" /> Record Payment
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="payments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="payments">
            <DollarSign className="mr-2 h-4 w-4" />
            Payment History
          </TabsTrigger>
          <TabsTrigger value="maintenance">
            <Wrench className="mr-2 h-4 w-4" />
            Maintenance Requests
          </TabsTrigger>
          <TabsTrigger value="documents">
            <FileText className="mr-2 h-4 w-4" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="notes">
            <FileText className="mr-2 h-4 w-4" />
            Notes
          </TabsTrigger>
        </TabsList>
        <TabsContent value="payments" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Payment History</h3>
            <Button size="sm">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.id}</TableCell>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>${payment.amount}</TableCell>
                    <TableCell>{payment.type}</TableCell>
                    <TableCell>{payment.method}</TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Receipt</DropdownMenuItem>
                          <DropdownMenuItem>Download Receipt</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Void Payment</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="maintenance" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Maintenance Requests</h3>
            <Button size="sm">
              <Wrench className="mr-2 h-4 w-4" /> Create Request
            </Button>
          </div>
          <div className="space-y-4">
            {maintenanceRequests.map((request) => (
              <Card key={request.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div>
                      <CardTitle className="text-base">{request.issue}</CardTitle>
                      <CardDescription>
                        {request.id} • Submitted on {request.date}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      {getPriorityBadge(request.priority)}
                      {getStatusBadge(request.status)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm">{request.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  {request.status === "open" && <Button size="sm">Update Status</Button>}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="documents" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Tenant Documents</h3>
            <Button size="sm">
              <FileText className="mr-2 h-4 w-4" /> Upload Document
            </Button>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((document) => (
                  <TableRow key={document.id}>
                    <TableCell className="font-medium">{document.name}</TableCell>
                    <TableCell>{document.type}</TableCell>
                    <TableCell>{document.size}</TableCell>
                    <TableCell>{document.date}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View</DropdownMenuItem>
                          <DropdownMenuItem>Download</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="notes" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Tenant Notes</h3>
            <Button size="sm">
              <FileText className="mr-2 h-4 w-4" /> Add Note
            </Button>
          </div>
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <CardTitle className="text-base">Lease Renewal Discussion</CardTitle>
                <div className="text-sm text-muted-foreground">Added by David Wilson on Apr 15, 2023</div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Spoke with tenant about lease renewal options. They are interested in renewing for another 12 months but
                requested to discuss potential rent adjustments. Follow up in early October.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <CardTitle className="text-base">Maintenance Follow-up</CardTitle>
                <div className="text-sm text-muted-foreground">Added by Mike Johnson on Mar 17, 2023</div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Followed up with tenant after completing the ceiling fan repair. They confirmed the issue is resolved
                and expressed satisfaction with the quick response.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <CardTitle className="text-base">Move-in Inspection</CardTitle>
                <div className="text-sm text-muted-foreground">Added by David Wilson on Jan 1, 2023</div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Completed move-in inspection with tenant. Minor scuffs on living room wall noted but otherwise unit is
                in excellent condition. Tenant received keys and move-in package.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

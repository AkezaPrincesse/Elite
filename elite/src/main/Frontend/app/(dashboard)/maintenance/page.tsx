"use client"

import { useState, useEffect } from "react"
import { Search, Filter, ArrowUpDown, MoreHorizontal, Plus, Wrench, CheckCircle, XCircle } from "lucide-react"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function MaintenancePage() {
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    setUserRole(localStorage.getItem("userRole"))
  }, [])

  // Sample maintenance requests data
  const requests = [
    {
      id: "M-2023-001",
      property: "Sunset Apartments #304",
      issue: "Leaking faucet in bathroom",
      description: "The bathroom sink faucet is leaking constantly, causing water to pool around the sink area.",
      tenant: "John Smith",
      date: "2025-05-01",
      status: "open",
      priority: "medium",
      assignedTo: "Mike Johnson",
    },
    {
      id: "M-2023-002",
      property: "Oakwood Residences #102",
      issue: "Broken air conditioning",
      description: "The AC unit is not cooling properly and making loud noises when running.",
      tenant: "Sarah Johnson",
      date: "2025-04-28",
      status: "in-progress",
      priority: "high",
      assignedTo: "David Wilson",
    },
    {
      id: "M-2023-003",
      property: "Riverside Condos #215",
      issue: "Light fixture not working",
      description: "The ceiling light in the living room is not turning on, even after replacing the bulb.",
      tenant: "Michael Brown",
      date: "2025-04-25",
      status: "completed",
      priority: "low",
      assignedTo: "Mike Johnson",
    },
    {
      id: "M-2023-004",
      property: "Sunset Apartments #304",
      issue: "Dishwasher not draining",
      description: "The dishwasher is not draining properly after cycles, leaving standing water at the bottom.",
      tenant: "John Smith",
      date: "2025-04-20",
      status: "completed",
      priority: "medium",
      assignedTo: "David Wilson",
    },
    {
      id: "M-2023-005",
      property: "Maple Court Apartments #112",
      issue: "Broken window latch",
      description: "The latch on the bedroom window is broken, making it difficult to secure the window properly.",
      tenant: "David Wilson",
      date: "2025-05-02",
      status: "open",
      priority: "low",
      assignedTo: null,
    },
    {
      id: "M-2023-006",
      property: "Cedar Heights #205",
      issue: "Heating system malfunction",
      description:
        "The heating system is not working properly, resulting in inconsistent temperatures throughout the unit.",
      tenant: "Jennifer Taylor",
      date: "2025-04-30",
      status: "open",
      priority: "high",
      assignedTo: null,
    },
  ]

  // Filter requests for tenant view
  const filteredRequests = userRole === "tenant" ? requests.filter((req) => req.tenant === "John Smith") : requests

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge variant="destructive">Open</Badge>
      case "in-progress":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
            In Progress
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            Completed
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

  // Calculate summary statistics
  const calculateSummary = () => {
    const openRequests = filteredRequests.filter((req) => req.status === "open").length
    const inProgressRequests = filteredRequests.filter((req) => req.status === "in-progress").length
    const completedRequests = filteredRequests.filter((req) => req.status === "completed").length
    const highPriorityRequests = filteredRequests.filter(
      (req) => req.priority === "high" && req.status !== "completed",
    ).length

    return {
      openRequests,
      inProgressRequests,
      completedRequests,
      highPriorityRequests,
    }
  }

  const summary = calculateSummary()

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Maintenance Requests</h2>
          <p className="text-muted-foreground">
            {userRole === "tenant"
              ? "Submit and track your maintenance requests"
              : "Manage property maintenance requests"}
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> {userRole === "tenant" ? "New Request" : "Create Request"}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Create Maintenance Request</DialogTitle>
              <DialogDescription>Fill out the form below to submit a new maintenance request.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {userRole !== "tenant" && (
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
              )}
              {userRole !== "tenant" && (
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
              )}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="issue" className="text-right">
                  Issue
                </Label>
                <Input id="issue" placeholder="Brief description of the issue" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="description" className="text-right pt-2">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Detailed description of the maintenance issue"
                  className="col-span-3"
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="priority" className="text-right">
                  Priority
                </Label>
                <RadioGroup defaultValue="medium" className="col-span-3 flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="low" />
                    <Label htmlFor="low">Low</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="medium" />
                    <Label htmlFor="medium">Medium</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="high" />
                    <Label htmlFor="high">High</Label>
                  </div>
                </RadioGroup>
              </div>
              {userRole !== "tenant" && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="assigned" className="text-right">
                    Assign To
                  </Label>
                  <Select>
                    <SelectTrigger id="assigned" className="col-span-3">
                      <SelectValue placeholder="Select staff member" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mike-johnson">Mike Johnson</SelectItem>
                      <SelectItem value="david-wilson">David Wilson</SelectItem>
                      <SelectItem value="unassigned">Unassigned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button type="submit">Submit Request</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {userRole !== "tenant" && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Requests</CardTitle>
              <Wrench className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.openRequests}</div>
              <p className="text-xs text-muted-foreground">
                {summary.openRequests > 0 ? "Needs attention" : "All caught up!"}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
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
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="M12 6v6l4 2" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.inProgressRequests}</div>
              <p className="text-xs text-muted-foreground">Being worked on</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.completedRequests}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Priority</CardTitle>
              <XCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.highPriorityRequests}</div>
              <p className="text-xs text-muted-foreground">
                {summary.highPriorityRequests > 0 ? "Urgent attention needed" : "No urgent issues"}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex w-full items-center space-x-2 md:w-auto">
          <Input placeholder="Search requests..." className="h-9 md:w-[300px]" />
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
              <DropdownMenuItem>Priority</DropdownMenuItem>
              {userRole !== "tenant" && <DropdownMenuItem>Property</DropdownMenuItem>}
              {userRole !== "tenant" && <DropdownMenuItem>Tenant</DropdownMenuItem>}
              {userRole !== "tenant" && <DropdownMenuItem>Assigned To</DropdownMenuItem>}
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
              <DropdownMenuItem>Priority (High to Low)</DropdownMenuItem>
              <DropdownMenuItem>Status</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Requests</TabsTrigger>
          <TabsTrigger value="open">Open</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Property</TableHead>
                  {userRole !== "tenant" && <TableHead>Tenant</TableHead>}
                  <TableHead>Issue</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  {userRole !== "tenant" && <TableHead>Assigned To</TableHead>}
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.id}</TableCell>
                    <TableCell>{request.property}</TableCell>
                    {userRole !== "tenant" && <TableCell>{request.tenant}</TableCell>}
                    <TableCell>{request.issue}</TableCell>
                    <TableCell>{request.date}</TableCell>
                    <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
                    {userRole !== "tenant" && (
                      <TableCell>
                        {request.assignedTo || <span className="text-muted-foreground">Unassigned</span>}
                      </TableCell>
                    )}
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          {userRole !== "tenant" && request.status !== "completed" && (
                            <>
                              <DropdownMenuItem>Update Status</DropdownMenuItem>
                              <DropdownMenuItem>Assign</DropdownMenuItem>
                            </>
                          )}
                          {request.status === "open" && userRole === "tenant" && (
                            <DropdownMenuItem>Edit Request</DropdownMenuItem>
                          )}
                          {userRole !== "tenant" && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">Cancel Request</DropdownMenuItem>
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
        <TabsContent value="open" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Property</TableHead>
                  {userRole !== "tenant" && <TableHead>Tenant</TableHead>}
                  <TableHead>Issue</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  {userRole !== "tenant" && <TableHead>Assigned To</TableHead>}
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests
                  .filter((request) => request.status === "open")
                  .map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.id}</TableCell>
                      <TableCell>{request.property}</TableCell>
                      {userRole !== "tenant" && <TableCell>{request.tenant}</TableCell>}
                      <TableCell>{request.issue}</TableCell>
                      <TableCell>{request.date}</TableCell>
                      <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      {userRole !== "tenant" && (
                        <TableCell>
                          {request.assignedTo || <span className="text-muted-foreground">Unassigned</span>}
                        </TableCell>
                      )}
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
        <TabsContent value="in-progress" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Property</TableHead>
                  {userRole !== "tenant" && <TableHead>Tenant</TableHead>}
                  <TableHead>Issue</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  {userRole !== "tenant" && <TableHead>Assigned To</TableHead>}
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests
                  .filter((request) => request.status === "in-progress")
                  .map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.id}</TableCell>
                      <TableCell>{request.property}</TableCell>
                      {userRole !== "tenant" && <TableCell>{request.tenant}</TableCell>}
                      <TableCell>{request.issue}</TableCell>
                      <TableCell>{request.date}</TableCell>
                      <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      {userRole !== "tenant" && (
                        <TableCell>
                          {request.assignedTo || <span className="text-muted-foreground">Unassigned</span>}
                        </TableCell>
                      )}
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
        <TabsContent value="completed" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Property</TableHead>
                  {userRole !== "tenant" && <TableHead>Tenant</TableHead>}
                  <TableHead>Issue</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  {userRole !== "tenant" && <TableHead>Assigned To</TableHead>}
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests
                  .filter((request) => request.status === "completed")
                  .map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.id}</TableCell>
                      <TableCell>{request.property}</TableCell>
                      {userRole !== "tenant" && <TableCell>{request.tenant}</TableCell>}
                      <TableCell>{request.issue}</TableCell>
                      <TableCell>{request.date}</TableCell>
                      <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      {userRole !== "tenant" && (
                        <TableCell>
                          {request.assignedTo || <span className="text-muted-foreground">Unassigned</span>}
                        </TableCell>
                      )}
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

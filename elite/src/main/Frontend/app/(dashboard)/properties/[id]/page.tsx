"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Building,
  MapPin,
  Home,
  Users,
  FileText,
  Edit,
  Trash,
  Camera,
  Plus,
  Pencil,
  Check,
  Mail,
  Phone,
  MoreHorizontal,
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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [userRole, setUserRole] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    setUserRole(localStorage.getItem("userRole"))
  }, [])

  // This would normally come from an API call using the ID
  const property = {
    id: params.id,
    name: "Sunset Apartments",
    address: "123 Main Street, Anytown",
    type: "Apartment",
    units: 12,
    available: 3,
    image: "/placeholder.svg?height=400&width=800",
    description:
      "Modern apartment complex with a variety of amenities including a swimming pool, fitness center, and community lounge. Located in a convenient area close to shopping, dining, and public transportation.",
    yearBuilt: 2010,
    totalSquareFeet: 15000,
    amenities: [
      "Swimming Pool",
      "Fitness Center",
      "Laundry Facilities",
      "Covered Parking",
      "Pet Friendly",
      "On-site Management",
    ],
    manager: {
      name: "David Wilson",
      email: "david.wilson@example.com",
      phone: "(555) 567-8901",
    },
  }

  // Sample tenants data
  const tenants = [
    {
      id: 1,
      name: "John Smith",
      unit: "#304",
      leaseEnd: "2023-12-31",
      moveIn: "2023-01-01",
      status: "active",
      rent: 1200,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      unit: "#102",
      leaseEnd: "2024-03-15",
      moveIn: "2023-03-15",
      status: "active",
      rent: 1500,
    },
    {
      id: 3,
      name: "Michael Brown",
      unit: "#215",
      leaseEnd: "2023-08-31",
      moveIn: "2022-09-01",
      status: "active",
      rent: 1800,
    },
  ]

  // Sample units data
  const units = [
    {
      id: 1,
      number: "101",
      type: "1 Bedroom",
      sqft: 650,
      rent: 1100,
      status: "occupied",
      tenant: "Emily Davis",
    },
    {
      id: 2,
      number: "102",
      type: "2 Bedroom",
      sqft: 850,
      rent: 1500,
      status: "occupied",
      tenant: "Sarah Johnson",
    },
    {
      id: 3,
      number: "103",
      type: "1 Bedroom",
      sqft: 650,
      rent: 1100,
      status: "available",
      tenant: null,
    },
    {
      id: 4,
      number: "104",
      type: "Studio",
      sqft: 500,
      rent: 950,
      status: "available",
      tenant: null,
    },
    {
      id: 5,
      number: "201",
      type: "2 Bedroom",
      sqft: 850,
      rent: 1500,
      status: "occupied",
      tenant: "Robert Thompson",
    },
    {
      id: 6,
      number: "202",
      type: "1 Bedroom",
      sqft: 650,
      rent: 1100,
      status: "available",
      tenant: null,
    },
  ]

  // Sample maintenance requests
  const maintenanceRequests = [
    {
      id: "M-2023-001",
      unit: "#304",
      issue: "Leaking faucet in bathroom",
      tenant: "John Smith",
      date: "2023-05-01",
      status: "open",
      priority: "medium",
    },
    {
      id: "M-2023-002",
      unit: "#102",
      issue: "Broken air conditioning",
      tenant: "Sarah Johnson",
      date: "2023-04-28",
      status: "in-progress",
      priority: "high",
    },
    {
      id: "M-2023-003",
      unit: "#215",
      issue: "Light fixture not working",
      tenant: "Michael Brown",
      date: "2023-04-25",
      status: "completed",
      priority: "low",
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
      case "occupied":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Occupied
          </Badge>
        )
      case "available":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            Available
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.push("/properties")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">{property.name}</h2>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="mr-1 h-4 w-4" />
              {property.address}
            </div>
          </div>
        </div>
        {(userRole === "admin" || userRole === "agent") && (
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Edit className="mr-2 h-4 w-4" /> Edit Property
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>Edit Property</DialogTitle>
                  <DialogDescription>Make changes to the property information.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="property-name" className="text-right">
                      Name
                    </Label>
                    <Input id="property-name" defaultValue={property.name} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="property-address" className="text-right">
                      Address
                    </Label>
                    <Input id="property-address" defaultValue={property.address} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="property-type" className="text-right">
                      Type
                    </Label>
                    <Select defaultValue={property.type.toLowerCase()}>
                      <SelectTrigger id="property-type" className="col-span-3">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="townhouse">Townhouse</SelectItem>
                        <SelectItem value="condo">Condominium</SelectItem>
                        <SelectItem value="single">Single Family</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="property-units" className="text-right">
                      Total Units
                    </Label>
                    <Input id="property-units" type="number" defaultValue={property.units} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="property-description" className="text-right pt-2">
                      Description
                    </Label>
                    <Textarea
                      id="property-description"
                      defaultValue={property.description}
                      className="col-span-3"
                      rows={4}
                    />
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
                <DropdownMenuLabel>Property Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Plus className="mr-2 h-4 w-4" /> Add Unit
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Users className="mr-2 h-4 w-4" /> Add Tenant
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileText className="mr-2 h-4 w-4" /> Generate Report
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <Trash className="mr-2 h-4 w-4" /> Delete Property
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-3">
          <CardHeader className="p-0">
            <div className="aspect-video w-full overflow-hidden rounded-t-lg">
              <img
                src={property.image || "/placeholder.svg"}
                alt={property.name}
                className="h-full w-full object-cover"
              />
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">{property.type}</Badge>
                  <Badge variant="outline">{property.units} Units</Badge>
                  {property.available > 0 ? (
                    <Badge variant="secondary">{property.available} Available</Badge>
                  ) : (
                    <Badge variant="outline">Fully Occupied</Badge>
                  )}
                </div>
                <p className="text-muted-foreground">{property.description}</p>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-sm text-muted-foreground">Year Built: {property.yearBuilt}</div>
                <div className="text-sm text-muted-foreground">Total Area: {property.totalSquareFeet} sq ft</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Property Type</div>
                <div>{property.type}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Year Built</div>
                <div>{property.yearBuilt}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Total Units</div>
                <div>{property.units}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Available Units</div>
                <div>{property.available}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Total Area</div>
                <div>{property.totalSquareFeet} sq ft</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Occupancy Rate</div>
                <div>{Math.round(((property.units - property.available) / property.units) * 100)}%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Amenities</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-2 gap-2">
              {property.amenities.map((amenity, index) => (
                <li key={index} className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  {amenity}
                </li>
              ))}
            </ul>
          </CardContent>
          {(userRole === "admin" || userRole === "agent") && (
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Pencil className="mr-2 h-4 w-4" /> Edit Amenities
              </Button>
            </CardFooter>
          )}
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Property Manager</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder.svg?height=64&width=64" alt={property.manager.name} />
                <AvatarFallback>DW</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{property.manager.name}</div>
                <div className="text-sm text-muted-foreground">Property Manager</div>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex items-center">
                <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{property.manager.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{property.manager.phone}</span>
              </div>
            </div>
          </CardContent>
          {(userRole === "admin" || userRole === "agent") && (
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Pencil className="mr-2 h-4 w-4" /> Change Manager
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>

      <Tabs defaultValue="units" className="space-y-4">
        <TabsList>
          <TabsTrigger value="units">
            <Home className="mr-2 h-4 w-4" />
            Units
          </TabsTrigger>
          <TabsTrigger value="tenants">
            <Users className="mr-2 h-4 w-4" />
            Tenants
          </TabsTrigger>
          <TabsTrigger value="maintenance">
            <Building className="mr-2 h-4 w-4" />
            Maintenance
          </TabsTrigger>
          <TabsTrigger value="documents">
            <FileText className="mr-2 h-4 w-4" />
            Documents
          </TabsTrigger>
        </TabsList>
        <TabsContent value="units" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Property Units</h3>
            {(userRole === "admin" || userRole === "agent") && (
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" /> Add Unit
              </Button>
            )}
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Unit #</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Size (sq ft)</TableHead>
                  <TableHead>Rent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tenant</TableHead>
                  {(userRole === "admin" || userRole === "agent") && (
                    <TableHead className="text-right">Actions</TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {units.map((unit) => (
                  <TableRow key={unit.id}>
                    <TableCell className="font-medium">{unit.number}</TableCell>
                    <TableCell>{unit.type}</TableCell>
                    <TableCell>{unit.sqft}</TableCell>
                    <TableCell>${unit.rent}</TableCell>
                    <TableCell>{getStatusBadge(unit.status)}</TableCell>
                    <TableCell>{unit.tenant || <span className="text-muted-foreground">—</span>}</TableCell>
                    {(userRole === "admin" || userRole === "agent") && (
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Unit</DropdownMenuItem>
                            {unit.status === "available" ? (
                              <DropdownMenuItem>Assign Tenant</DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem>View Lease</DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Delete Unit</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="tenants" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Current Tenants</h3>
            {(userRole === "admin" || userRole === "agent") && (
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" /> Add Tenant
              </Button>
            )}
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Move-In Date</TableHead>
                  <TableHead>Lease End</TableHead>
                  <TableHead>Monthly Rent</TableHead>
                  <TableHead>Status</TableHead>
                  {(userRole === "admin" || userRole === "agent") && (
                    <TableHead className="text-right">Actions</TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {tenants.map((tenant) => (
                  <TableRow key={tenant.id}>
                    <TableCell className="font-medium">{tenant.name}</TableCell>
                    <TableCell>{tenant.unit}</TableCell>
                    <TableCell>{tenant.moveIn}</TableCell>
                    <TableCell>{tenant.leaseEnd}</TableCell>
                    <TableCell>${tenant.rent}</TableCell>
                    <TableCell>{getStatusBadge(tenant.status)}</TableCell>
                    {(userRole === "admin" || userRole === "agent") && (
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>View Lease</DropdownMenuItem>
                            <DropdownMenuItem>Payment History</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">End Lease</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="maintenance" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Maintenance Requests</h3>
            {(userRole === "admin" || userRole === "agent") && (
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" /> Create Request
              </Button>
            )}
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Issue</TableHead>
                  <TableHead>Tenant</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  {(userRole === "admin" || userRole === "agent") && (
                    <TableHead className="text-right">Actions</TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {maintenanceRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.id}</TableCell>
                    <TableCell>{request.unit}</TableCell>
                    <TableCell>{request.issue}</TableCell>
                    <TableCell>{request.tenant}</TableCell>
                    <TableCell>{request.date}</TableCell>
                    <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
                    {(userRole === "admin" || userRole === "agent") && (
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Update Status</DropdownMenuItem>
                            <DropdownMenuItem>Assign Technician</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Cancel Request</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="documents" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Property Documents</h3>
            {(userRole === "admin" || userRole === "agent") && (
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" /> Upload Document
              </Button>
            )}
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Property Deed</CardTitle>
                <CardDescription>PDF • 2.4 MB • Uploaded Jan 15, 2023</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex items-center justify-center h-24 bg-muted rounded-md">
                  <FileText className="h-12 w-12 text-muted-foreground" />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Download
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Insurance Policy</CardTitle>
                <CardDescription>PDF • 1.8 MB • Uploaded Feb 3, 2023</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex items-center justify-center h-24 bg-muted rounded-md">
                  <FileText className="h-12 w-12 text-muted-foreground" />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Download
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Property Photos</CardTitle>
                <CardDescription>ZIP • 15.6 MB • Uploaded Mar 10, 2023</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex items-center justify-center h-24 bg-muted rounded-md">
                  <Camera className="h-12 w-12 text-muted-foreground" />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Download
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Plus, Search, Filter, ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
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

export default function PropertiesPage() {
  const router = useRouter()
  const [view, setView] = useState<"grid" | "list">("grid")
  const [isLoading, setIsLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [properties, setProperties] = useState([
    {
      id: 1,
      name: "Sunset Apartments",
      address: "123 Main Street, Anytown",
      type: "Apartment",
      units: 12,
      available: 3,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      name: "Oakwood Residences",
      address: "456 Oak Avenue, Somewhere",
      type: "Townhouse",
      units: 8,
      available: 0,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      name: "Riverside Condos",
      address: "789 River Road, Elsewhere",
      type: "Condominium",
      units: 24,
      available: 5,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      name: "Pine Street Houses",
      address: "101 Pine Street, Nowhere",
      type: "Single Family",
      units: 6,
      available: 2,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 5,
      name: "Maple Court Apartments",
      address: "202 Maple Court, Somewhere",
      type: "Apartment",
      units: 18,
      available: 4,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 6,
      name: "Cedar Heights",
      address: "303 Cedar Road, Elsewhere",
      type: "Townhouse",
      units: 10,
      available: 1,
      image: "/placeholder.svg?height=200&width=300",
    },
  ])

  // Form state for new property
  const [newProperty, setNewProperty] = useState({
    name: "",
    address: "",
    type: "Apartment",
    description: "",
    totalUnits: "",
    amenities: "",
  })

  // Fetch properties on component mount
  useEffect(() => {
    fetchProperties()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewProperty(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSelectChange = (value: string) => {
    setNewProperty(prev => ({
      ...prev,
      type: value
    }))
  }

  const fetchProperties = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("http://localhost:8080/api/properties", {
        credentials: "include"
      })
      if (response.ok) {
        const data = await response.json()
        setProperties(data)
      } else {
        throw new Error("Failed to fetch properties")
      }
    } catch (error) {
      console.error("Failed to fetch properties:", error)
      toast({
        title: "Error",
        description: "Failed to load properties",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddProperty = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("http://localhost:8080/api/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: newProperty.name,
          address: newProperty.address,
          propertyType: newProperty.type,
          description: newProperty.description,
          totalUnits: parseInt(newProperty.totalUnits) || 0,
          amenities: newProperty.amenities.split(",").map(item => item.trim()),
        }),
      })

      if (response.ok) {
        toast({
          title: "Property added successfully",
          description: "The new property has been created.",
        })
        setIsDialogOpen(false)
        await fetchProperties()
        setNewProperty({
          name: "",
          address: "",
          type: "Apartment",
          description: "",
          totalUnits: "",
          amenities: "",
        })
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to add property")
      }
    } catch (error: any) {
      toast({
        title: "Error adding property",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Properties</h2>
            <p className="text-muted-foreground">Manage your real estate properties</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Property
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Property</DialogTitle>
                <DialogDescription>
                  Fill in the details for the new property. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Property Name
                  </Label>
                  <Input
                      id="name"
                      name="name"
                      value={newProperty.name}
                      onChange={handleInputChange}
                      className="col-span-3"
                      required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="address" className="text-right">
                    Address
                  </Label>
                  <Input
                      id="address"
                      name="address"
                      value={newProperty.address}
                      onChange={handleInputChange}
                      className="col-span-3"
                      required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Property Type
                  </Label>
                  <Select value={newProperty.type} onValueChange={handleSelectChange}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Apartment">Apartment</SelectItem>
                      <SelectItem value="Townhouse">Townhouse</SelectItem>
                      <SelectItem value="Condominium">Condominium</SelectItem>
                      <SelectItem value="Single Family">Single Family</SelectItem>
                      <SelectItem value="Commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="totalUnits" className="text-right">
                    Total Units
                  </Label>
                  <Input
                      id="totalUnits"
                      name="totalUnits"
                      type="number"
                      value={newProperty.totalUnits}
                      onChange={handleInputChange}
                      className="col-span-3"
                      required
                      min="1"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amenities" className="text-right">
                    Amenities
                  </Label>
                  <Input
                      id="amenities"
                      name="amenities"
                      value={newProperty.amenities}
                      onChange={handleInputChange}
                      placeholder="Comma separated list (e.g., Pool, Gym, Parking)"
                      className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                      id="description"
                      name="description"
                      value={newProperty.description}
                      onChange={handleInputChange}
                      className="col-span-3"
                      rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                    type="button"
                    onClick={handleAddProperty}
                    disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save Property"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex w-full items-center space-x-2 md:w-auto">
            <Input placeholder="Search properties..." className="h-9 md:w-[300px]" />
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
                <DropdownMenuItem>Type</DropdownMenuItem>
                <DropdownMenuItem>Availability</DropdownMenuItem>
                <DropdownMenuItem>Location</DropdownMenuItem>
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
                <DropdownMenuItem>Name (A-Z)</DropdownMenuItem>
                <DropdownMenuItem>Name (Z-A)</DropdownMenuItem>
                <DropdownMenuItem>Units (High to Low)</DropdownMenuItem>
                <DropdownMenuItem>Units (Low to High)</DropdownMenuItem>
                <DropdownMenuItem>Availability</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Select defaultValue="all">
              <SelectTrigger className="h-9 w-[130px]">
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="townhouse">Townhouse</SelectItem>
                <SelectItem value="condo">Condominium</SelectItem>
                <SelectItem value="single">Single Family</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <div className="flex justify-between">
            <TabsList>
              <TabsTrigger value="all">All Properties</TabsTrigger>
              <TabsTrigger value="available">Available</TabsTrigger>
              <TabsTrigger value="occupied">Fully Occupied</TabsTrigger>
            </TabsList>
            <div className="flex space-x-2">
              <Button
                  variant={view === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setView("grid")}
                  className="h-9 w-9 p-0"
              >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                >
                  <rect width="7" height="7" x="3" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="14" rx="1" />
                  <rect width="7" height="7" x="3" y="14" rx="1" />
                </svg>
              </Button>
              <Button
                  variant={view === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setView("list")}
                  className="h-9 w-9 p-0"
              >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                >
                  <line x1="8" x2="21" y1="6" y2="6" />
                  <line x1="8" x2="21" y1="12" y2="12" />
                  <line x1="8" x2="21" y1="18" y2="18" />
                  <line x1="3" x2="3.01" y1="6" y2="6" />
                  <line x1="3" x2="3.01" y1="12" y2="12" />
                  <line x1="3" x2="3.01" y1="18" y2="18" />
                </svg>
              </Button>
            </div>
          </div>
          <TabsContent value="all" className="space-y-4">
            {view === "grid" ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {properties.map((property) => (
                      <Card key={property.id} className="overflow-hidden">
                        <div className="aspect-video w-full overflow-hidden">
                          <img
                              src={property.image || "/placeholder.svg"}
                              alt={property.name}
                              className="h-full w-full object-cover"
                          />
                        </div>
                        <CardHeader className="p-4">
                          <CardTitle className="text-lg">{property.name}</CardTitle>
                          <CardDescription>{property.address}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="flex flex-wrap gap-2 mb-2">
                            <Badge variant="outline">{property.type}</Badge>
                            <Badge variant="outline">{property.units} Units</Badge>
                            {property.available > 0 ? (
                                <Badge variant="secondary">{property.available} Available</Badge>
                            ) : (
                                <Badge variant="outline">Fully Occupied</Badge>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0 flex justify-between">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>View Tenants</DropdownMenuItem>
                              <DropdownMenuItem>View Leases</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </CardFooter>
                      </Card>
                  ))}
                </div>
            ) : (
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-3 text-left font-medium">Name</th>
                      <th className="p-3 text-left font-medium">Address</th>
                      <th className="p-3 text-left font-medium">Type</th>
                      <th className="p-3 text-left font-medium">Units</th>
                      <th className="p-3 text-left font-medium">Available</th>
                      <th className="p-3 text-right font-medium">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {properties.map((property) => (
                        <tr key={property.id} className="border-b">
                          <td className="p-3 font-medium">{property.name}</td>
                          <td className="p-3">{property.address}</td>
                          <td className="p-3">{property.type}</td>
                          <td className="p-3">{property.units}</td>
                          <td className="p-3">
                            {property.available > 0 ? (
                                <Badge variant="secondary">{property.available}</Badge>
                            ) : (
                                <Badge variant="outline">0</Badge>
                            )}
                          </td>
                          <td className="p-3 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>View Tenants</DropdownMenuItem>
                                <DropdownMenuItem>View Leases</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
            )}
          </TabsContent>
          <TabsContent value="available" className="space-y-4">
            {view === "grid" ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {properties
                      .filter((property) => property.available > 0)
                      .map((property) => (
                          <Card key={property.id} className="overflow-hidden">
                            <div className="aspect-video w-full overflow-hidden">
                              <img
                                  src={property.image || "/placeholder.svg"}
                                  alt={property.name}
                                  className="h-full w-full object-cover"
                              />
                            </div>
                            <CardHeader className="p-4">
                              <CardTitle className="text-lg">{property.name}</CardTitle>
                              <CardDescription>{property.address}</CardDescription>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                              <div className="flex flex-wrap gap-2 mb-2">
                                <Badge variant="outline">{property.type}</Badge>
                                <Badge variant="outline">{property.units} Units</Badge>
                                <Badge variant="secondary">{property.available} Available</Badge>
                              </div>
                            </CardContent>
                            <CardFooter className="p-4 pt-0 flex justify-between">
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                              <Button variant="ghost" size="sm">
                                Edit
                              </Button>
                            </CardFooter>
                          </Card>
                      ))}
                </div>
            ) : (
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-3 text-left font-medium">Name</th>
                      <th className="p-3 text-left font-medium">Address</th>
                      <th className="p-3 text-left font-medium">Type</th>
                      <th className="p-3 text-left font-medium">Units</th>
                      <th className="p-3 text-left font-medium">Available</th>
                      <th className="p-3 text-right font-medium">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {properties
                        .filter((property) => property.available > 0)
                        .map((property) => (
                            <tr key={property.id} className="border-b">
                              <td className="p-3 font-medium">{property.name}</td>
                              <td className="p-3">{property.address}</td>
                              <td className="p-3">{property.type}</td>
                              <td className="p-3">{property.units}</td>
                              <td className="p-3">
                                <Badge variant="secondary">{property.available}</Badge>
                              </td>
                              <td className="p-3 text-right">
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </td>
                            </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
            )}
          </TabsContent>
          <TabsContent value="occupied" className="space-y-4">
            {view === "grid" ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {properties
                      .filter((property) => property.available === 0)
                      .map((property) => (
                          <Card key={property.id} className="overflow-hidden">
                            <div className="aspect-video w-full overflow-hidden">
                              <img
                                  src={property.image || "/placeholder.svg"}
                                  alt={property.name}
                                  className="h-full w-full object-cover"
                              />
                            </div>
                            <CardHeader className="p-4">
                              <CardTitle className="text-lg">{property.name}</CardTitle>
                              <CardDescription>{property.address}</CardDescription>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                              <div className="flex flex-wrap gap-2 mb-2">
                                <Badge variant="outline">{property.type}</Badge>
                                <Badge variant="outline">{property.units} Units</Badge>
                                <Badge variant="outline">Fully Occupied</Badge>
                              </div>
                            </CardContent>
                            <CardFooter className="p-4 pt-0 flex justify-between">
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                              <Button variant="ghost" size="sm">
                                Edit
                              </Button>
                            </CardFooter>
                          </Card>
                      ))}
                </div>
            ) : (
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-3 text-left font-medium">Name</th>
                      <th className="p-3 text-left font-medium">Address</th>
                      <th className="p-3 text-left font-medium">Type</th>
                      <th className="p-3 text-left font-medium">Units</th>
                      <th className="p-3 text-left font-medium">Available</th>
                      <th className="p-3 text-right font-medium">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {properties
                        .filter((property) => property.available === 0)
                        .map((property) => (
                            <tr key={property.id} className="border-b">
                              <td className="p-3 font-medium">{property.name}</td>
                              <td className="p-3">{property.address}</td>
                              <td className="p-3">{property.type}</td>
                              <td className="p-3">{property.units}</td>
                              <td className="p-3">
                                <Badge variant="outline">0</Badge>
                              </td>
                              <td className="p-3 text-right">
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </td>
                            </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
  )
}
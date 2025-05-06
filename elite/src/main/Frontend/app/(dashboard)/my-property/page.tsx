"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Home, FileText, Wrench, Phone, Mail, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function MyPropertyPage() {
  const router = useRouter()
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    setUserRole(role)

    // Redirect if not tenant
    if (role !== "tenant") {
      router.push("/dashboard")
    }
  }, [router])

  if (userRole !== "tenant") {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Property</h2>
          <p className="text-muted-foreground">View details about your rented property</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Wrench className="mr-2 h-4 w-4" /> Report Issue
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Report Maintenance Issue</DialogTitle>
              <DialogDescription>Fill out the form below to submit a new maintenance request.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="issue" className="text-right">
                  Issue
                </Label>
                <input
                  id="issue"
                  placeholder="Brief description of the issue"
                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
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
                <Select defaultValue="medium">
                  <SelectTrigger id="priority" className="col-span-3">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Submit Request</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-2">
          <CardHeader className="p-0">
            <div className="aspect-video w-full overflow-hidden rounded-t-lg">
              <img
                src="/placeholder.svg?height=400&width=800"
                alt="Sunset Apartments"
                className="h-full w-full object-cover"
              />
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h3 className="text-2xl font-bold">Sunset Apartments #304</h3>
                <p className="text-muted-foreground">123 Main Street, Anytown, ST 12345</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge variant="outline">2 Bedroom</Badge>
                  <Badge variant="outline">1 Bathroom</Badge>
                  <Badge variant="outline">850 sq ft</Badge>
                  <Badge variant="outline">3rd Floor</Badge>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-2xl font-bold">$1,200/month</div>
                <div className="text-sm text-muted-foreground">Lease ends: Dec 31, 2023</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
            <CardDescription>Information about your apartment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Property Type</div>
                <div>Apartment</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Year Built</div>
                <div>2010</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Parking</div>
                <div>1 Assigned Spot (#45)</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Pets</div>
                <div>Allowed (with deposit)</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Utilities Included</div>
                <div>Water, Trash</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Amenities</div>
                <div>Pool, Gym, Laundry</div>
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Description</div>
              <div className="mt-1 text-sm">
                Modern apartment with open floor plan, stainless steel appliances, and private balcony. The community
                features a swimming pool, fitness center, and on-site laundry facilities.
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Property Manager</CardTitle>
            <CardDescription>Your point of contact</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder.svg?height=64&width=64" alt="David Wilson" />
                <AvatarFallback>DW</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">David Wilson</div>
                <div className="text-sm text-muted-foreground">Property Manager</div>
              </div>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>(555) 567-8901</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>david.wilson@example.com</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>Office Hours: Mon-Fri, 9am-5pm</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Contact Manager
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="amenities" className="space-y-4">
        <TabsList>
          <TabsTrigger value="amenities">
            <Home className="mr-2 h-4 w-4" />
            Amenities
          </TabsTrigger>
          <TabsTrigger value="policies">
            <FileText className="mr-2 h-4 w-4" />
            Policies
          </TabsTrigger>
          <TabsTrigger value="maintenance">
            <Wrench className="mr-2 h-4 w-4" />
            Maintenance History
          </TabsTrigger>
        </TabsList>
        <TabsContent value="amenities" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Community Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Swimming Pool</li>
                  <li>Fitness Center</li>
                  <li>Clubhouse</li>
                  <li>On-site Laundry</li>
                  <li>Covered Parking</li>
                  <li>Package Receiving</li>
                  <li>24/7 Maintenance</li>
                  <li>Gated Access</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Apartment Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Stainless Steel Appliances</li>
                  <li>Dishwasher</li>
                  <li>Microwave</li>
                  <li>Central Air Conditioning</li>
                  <li>Private Balcony</li>
                  <li>Walk-in Closet</li>
                  <li>Ceiling Fans</li>
                  <li>Cable/Internet Ready</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Nearby Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Grocery Store (0.3 miles)</li>
                  <li>Public Transportation (0.2 miles)</li>
                  <li>Shopping Center (0.5 miles)</li>
                  <li>Restaurants (0.4 miles)</li>
                  <li>Park/Recreation Area (0.7 miles)</li>
                  <li>Hospital (2.1 miles)</li>
                  <li>Schools (0.8 miles)</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="policies" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Lease Policies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium">Lease Term</h4>
                  <p className="text-sm text-muted-foreground">12-month standard lease term with renewal options</p>
                </div>
                <div>
                  <h4 className="font-medium">Rent Payment</h4>
                  <p className="text-sm text-muted-foreground">
                    Due on the 1st of each month. Late fees apply after the 5th.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Security Deposit</h4>
                  <p className="text-sm text-muted-foreground">
                    Equal to one month's rent, refundable upon move-out inspection
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Notice to Vacate</h4>
                  <p className="text-sm text-muted-foreground">60-day written notice required before lease end date</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Community Policies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium">Quiet Hours</h4>
                  <p className="text-sm text-muted-foreground">10:00 PM to 8:00 AM daily</p>
                </div>
                <div>
                  <h4 className="font-medium">Pet Policy</h4>
                  <p className="text-sm text-muted-foreground">
                    Pets allowed with $300 deposit and $25/month pet rent. Breed restrictions apply.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Guest Policy</h4>
                  <p className="text-sm text-muted-foreground">
                    Guests may stay up to 7 consecutive days without prior approval
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Smoking Policy</h4>
                  <p className="text-sm text-muted-foreground">No smoking inside apartments or common areas</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="maintenance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Request History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">Leaking faucet in bathroom</h4>
                      <p className="text-sm text-muted-foreground">Submitted on May 1, 2023</p>
                    </div>
                    <Badge variant="destructive">Open</Badge>
                  </div>
                  <p className="mt-2 text-sm">
                    The bathroom sink faucet is leaking constantly, causing water to pool around the sink area.
                  </p>
                </div>
                <div className="rounded-md border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">Dishwasher not draining</h4>
                      <p className="text-sm text-muted-foreground">Submitted on April 20, 2023</p>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                      Completed
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm">
                    The dishwasher is not draining properly after cycles, leaving standing water at the bottom.
                  </p>
                  <div className="mt-2 rounded-md bg-muted p-2 text-sm">
                    <span className="font-medium">Resolution:</span> Cleared clogged drain and replaced filter.
                    Completed on April 22, 2023.
                  </div>
                </div>
                <div className="rounded-md border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">Ceiling fan making noise</h4>
                      <p className="text-sm text-muted-foreground">Submitted on March 15, 2023</p>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                      Completed
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm">
                    The ceiling fan in the living room is making a rattling noise when running at medium or high speed.
                  </p>
                  <div className="mt-2 rounded-md bg-muted p-2 text-sm">
                    <span className="font-medium">Resolution:</span> Tightened fan blades and balanced unit. Completed
                    on March 17, 2023.
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Wrench className="mr-2 h-4 w-4" /> Submit New Request
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

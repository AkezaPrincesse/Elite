"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { FileText, Calendar, DollarSign, Download, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
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
import { Separator } from "@/components/ui/separator"

export default function MyLeasePage() {
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
          <h2 className="text-3xl font-bold tracking-tight">My Lease</h2>
          <p className="text-muted-foreground">View and manage your lease agreement</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Download Lease
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Calendar className="mr-2 h-4 w-4" /> Request Renewal
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Request Lease Renewal</DialogTitle>
                <DialogDescription>Submit a request to renew your current lease.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="renewal-term">Preferred Renewal Term</Label>
                  <select
                    id="renewal-term"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="12">12 Months</option>
                    <option value="6">6 Months</option>
                    <option value="month-to-month">Month-to-Month</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="renewal-notes">Additional Notes</Label>
                  <Textarea
                    id="renewal-notes"
                    placeholder="Any special requests or questions about your renewal"
                    rows={4}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Submit Request</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Lease Summary</CardTitle>
            <CardDescription>Current lease agreement details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Lease ID</div>
                <div>L-2023-001</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Status</div>
                <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                  Active
                </Badge>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Start Date</div>
                <div>January 1, 2023</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">End Date</div>
                <div>December 31, 2023</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Monthly Rent</div>
                <div>$1,200.00</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Security Deposit</div>
                <div>$1,200.00</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Late Fee</div>
                <div>$50.00 (after the 5th)</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Notice Period</div>
                <div>60 days</div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="w-full rounded-md bg-muted p-3">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-500" />
                <div>
                  <span className="font-medium">Renewal Notice:</span> Your lease expires in 245 days. Please provide
                  notice of your intent to renew or vacate by November 1, 2023.
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Information</CardTitle>
            <CardDescription>Rent payment details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Monthly Rent</div>
                <div>$1,200.00</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Due Date</div>
                <div>1st of each month</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Grace Period</div>
                <div>5 days</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Payment Methods</div>
                <div>Online Portal, Check</div>
              </div>
            </div>
            <Separator />
            <div>
              <h4 className="font-medium">Next Payment</h4>
              <div className="mt-2 flex items-center justify-between rounded-md border p-3">
                <div>
                  <div className="font-medium">June 2023 Rent</div>
                  <div className="text-sm text-muted-foreground">Due on June 1, 2023</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">$1,200.00</div>
                  <div className="flex items-center text-sm text-green-600">
                    <CheckCircle className="mr-1 h-3 w-3" /> Autopay Enabled
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <DollarSign className="mr-2 h-4 w-4" /> Make a Payment
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="terms" className="space-y-4">
        <TabsList>
          <TabsTrigger value="terms">
            <FileText className="mr-2 h-4 w-4" />
            Lease Terms
          </TabsTrigger>
          <TabsTrigger value="history">
            <Calendar className="mr-2 h-4 w-4" />
            Payment History
          </TabsTrigger>
          <TabsTrigger value="addendums">
            <FileText className="mr-2 h-4 w-4" />
            Addendums
          </TabsTrigger>
        </TabsList>
        <TabsContent value="terms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lease Terms and Conditions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">1. Term</h4>
                <p className="text-sm">
                  The initial term of this Lease begins on January 1, 2023, and ends on December 31, 2023. This Lease
                  automatically terminates at the end of the term unless renewed in writing.
                </p>
              </div>
              <div>
                <h4 className="font-medium">2. Rent</h4>
                <p className="text-sm">
                  Tenant agrees to pay $1,200.00 per month, due on the 1st day of each month. Payments received after
                  the 5th day of the month will incur a $50.00 late fee.
                </p>
              </div>
              <div>
                <h4 className="font-medium">3. Security Deposit</h4>
                <p className="text-sm">
                  Tenant has paid a security deposit of $1,200.00 to secure Tenant's performance of this Lease. Landlord
                  may apply the security deposit to remedy any default by Tenant in the performance of this Lease.
                </p>
              </div>
              <div>
                <h4 className="font-medium">4. Utilities</h4>
                <p className="text-sm">
                  Landlord will pay for water and trash removal. Tenant will pay for electricity, gas, internet, and
                  cable services.
                </p>
              </div>
              <div>
                <h4 className="font-medium">5. Use and Occupancy</h4>
                <p className="text-sm">
                  The Premises will be used only as a private residence for the Tenant(s) listed in this Lease.
                  Occupancy by guests for more than 7 consecutive days is prohibited without Landlord's written consent.
                </p>
              </div>
              <div>
                <h4 className="font-medium">6. Maintenance and Repairs</h4>
                <p className="text-sm">
                  Tenant shall keep the Premises in a clean and sanitary condition. Tenant shall immediately notify
                  Landlord of any damage or needed repairs.
                </p>
              </div>
              <div>
                <h4 className="font-medium">7. Pets</h4>
                <p className="text-sm">
                  Pets are allowed with prior written approval and payment of a $300 pet deposit and $25 monthly pet
                  rent. Breed restrictions apply.
                </p>
              </div>
              <div>
                <h4 className="font-medium">8. Renewal</h4>
                <p className="text-sm">
                  This Lease may be renewed by mutual agreement of the parties. Tenant must provide written notice of
                  intent to renew at least 60 days prior to the end of the Lease term.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" /> Download Full Lease Agreement
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">May 2023 Rent</h4>
                      <p className="text-sm text-muted-foreground">Due: May 1, 2023 | Paid: May 1, 2023</p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">$1,200.00</div>
                      <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                        Paid
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-2 text-sm">
                    <span className="font-medium">Payment Method:</span> Credit Card
                  </div>
                  <div className="mt-1 text-sm">
                    <span className="font-medium">Confirmation:</span> PMT-2023-005
                  </div>
                </div>
                <div className="rounded-md border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">April 2023 Rent</h4>
                      <p className="text-sm text-muted-foreground">Due: April 1, 2023 | Paid: April 1, 2023</p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">$1,200.00</div>
                      <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                        Paid
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-2 text-sm">
                    <span className="font-medium">Payment Method:</span> Credit Card
                  </div>
                  <div className="mt-1 text-sm">
                    <span className="font-medium">Confirmation:</span> PMT-2023-004
                  </div>
                </div>
                <div className="rounded-md border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">March 2023 Rent</h4>
                      <p className="text-sm text-muted-foreground">Due: March 1, 2023 | Paid: March 1, 2023</p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">$1,200.00</div>
                      <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                        Paid
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-2 text-sm">
                    <span className="font-medium">Payment Method:</span> Credit Card
                  </div>
                  <div className="mt-1 text-sm">
                    <span className="font-medium">Confirmation:</span> PMT-2023-003
                  </div>
                </div>
                <div className="rounded-md border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">February 2023 Rent</h4>
                      <p className="text-sm text-muted-foreground">Due: February 1, 2023 | Paid: February 1, 2023</p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">$1,200.00</div>
                      <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                        Paid
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-2 text-sm">
                    <span className="font-medium">Payment Method:</span> Credit Card
                  </div>
                  <div className="mt-1 text-sm">
                    <span className="font-medium">Confirmation:</span> PMT-2023-002
                  </div>
                </div>
                <div className="rounded-md border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">January 2023 Rent</h4>
                      <p className="text-sm text-muted-foreground">Due: January 1, 2023 | Paid: January 1, 2023</p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">$1,200.00</div>
                      <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                        Paid
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-2 text-sm">
                    <span className="font-medium">Payment Method:</span> Credit Card
                  </div>
                  <div className="mt-1 text-sm">
                    <span className="font-medium">Confirmation:</span> PMT-2023-001
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" /> Download Payment History
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="addendums" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lease Addendums</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">Pet Addendum</h4>
                      <p className="text-sm text-muted-foreground">Added: January 1, 2023</p>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                      Active
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm">
                    Permission for one cat (domestic shorthair) named "Whiskers". Pet deposit of $300 and monthly pet
                    rent of $25 applies.
                  </p>
                  <div className="mt-2">
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-3 w-3" /> Download
                    </Button>
                  </div>
                </div>
                <div className="rounded-md border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">Parking Addendum</h4>
                      <p className="text-sm text-muted-foreground">Added: January 1, 2023</p>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                      Active
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm">
                    Assigned parking space #45 in the covered parking area. Vehicle registration required.
                  </p>
                  <div className="mt-2">
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-3 w-3" /> Download
                    </Button>
                  </div>
                </div>
                <div className="rounded-md border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">Community Rules Addendum</h4>
                      <p className="text-sm text-muted-foreground">Added: January 1, 2023</p>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                      Active
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm">
                    Detailed community rules including pool hours, fitness center access, and guest policies.
                  </p>
                  <div className="mt-2">
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-3 w-3" /> Download
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

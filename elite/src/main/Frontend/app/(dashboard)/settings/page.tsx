"use client"

import { useState, useEffect } from "react"
import { Save, User, Lock, Bell, Globe, Building, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter } from "next/navigation"

export default function SettingsPage() {
  const router = useRouter()
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    setUserRole(localStorage.getItem("userRole"))
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">
            <User className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="account">
            <Lock className="mr-2 h-4 w-4" />
            Account
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          {userRole === "admin" && (
            <TabsTrigger value="system">
              <Globe className="mr-2 h-4 w-4" />
              System
            </TabsTrigger>
          )}
          {userRole !== "tenant" && (
            <TabsTrigger value="company">
              <Building className="mr-2 h-4 w-4" />
              Company
            </TabsTrigger>
          )}
          {userRole === "admin" && (
            <TabsTrigger value="security">
              <Shield className="mr-2 h-4 w-4" />
              Security
            </TabsTrigger>
          )}
        </TabsList>
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your profile information and contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
                    <AvatarFallback>{userRole === "admin" ? "A" : userRole === "agent" ? "S" : "T"}</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    Change Avatar
                  </Button>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      defaultValue={
                        userRole === "admin" ? "Admin User" : userRole === "agent" ? "Agent User" : "Tenant User"
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={
                        userRole === "admin"
                          ? "admin@example.com"
                          : userRole === "agent"
                            ? "agent@example.com"
                            : "tenant@example.com"
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" defaultValue="(555) 123-4567" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" defaultValue="123 Main Street, Anytown, ST 12345" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Update Password
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">Two-Factor Authentication</div>
                  <div className="text-sm text-muted-foreground">
                    Protect your account with two-factor authentication
                  </div>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Email Notifications</h3>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Payment Confirmations</div>
                    <div className="text-sm text-muted-foreground">Receive emails for payment confirmations</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Maintenance Updates</div>
                    <div className="text-sm text-muted-foreground">Receive emails for maintenance request updates</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Lease Notifications</div>
                    <div className="text-sm text-muted-foreground">
                      Receive emails about lease renewals and expirations
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Marketing Emails</div>
                    <div className="text-sm text-muted-foreground">Receive promotional emails and newsletters</div>
                  </div>
                  <Switch />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-medium">SMS Notifications</h3>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Payment Reminders</div>
                    <div className="text-sm text-muted-foreground">Receive SMS reminders for upcoming payments</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Maintenance Alerts</div>
                    <div className="text-sm text-muted-foreground">Receive SMS alerts for maintenance updates</div>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        {userRole === "admin" && (
          <TabsContent value="system" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>Configure system-wide settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" defaultValue="Real Estate Management System" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="timezone">Default Timezone</Label>
                  <Select defaultValue="america-new_york">
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="america-new_york">America/New York (EST)</SelectItem>
                      <SelectItem value="america-chicago">America/Chicago (CST)</SelectItem>
                      <SelectItem value="america-denver">America/Denver (MST)</SelectItem>
                      <SelectItem value="america-los_angeles">America/Los Angeles (PST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="date-format">Date Format</Label>
                  <RadioGroup defaultValue="mm-dd-yyyy">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mm-dd-yyyy" id="mm-dd-yyyy" />
                      <Label htmlFor="mm-dd-yyyy">MM/DD/YYYY</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dd-mm-yyyy" id="dd-mm-yyyy" />
                      <Label htmlFor="dd-mm-yyyy">DD/MM/YYYY</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yyyy-mm-dd" id="yyyy-mm-dd" />
                      <Label htmlFor="yyyy-mm-dd">YYYY/MM/DD</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select defaultValue="usd">
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD ($)</SelectItem>
                      <SelectItem value="eur">EUR (€)</SelectItem>
                      <SelectItem value="gbp">GBP (£)</SelectItem>
                      <SelectItem value="cad">CAD (C$)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Maintenance Request Auto-Assignment</div>
                    <div className="text-sm text-muted-foreground">
                      Automatically assign maintenance requests to available staff
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Payment Late Fee Automation</div>
                    <div className="text-sm text-muted-foreground">
                      Automatically apply late fees to overdue payments
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
              <CardFooter>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save System Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        )}
        {userRole !== "tenant" && (
          <TabsContent value="company" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>Update your company details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="h-24 w-24 rounded-md border border-dashed flex items-center justify-center">
                      <Building className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <Button variant="outline" size="sm">
                      Upload Logo
                    </Button>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="company-name">Company Name</Label>
                      <Input id="company-name" defaultValue="Real Estate Management Co." />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="company-email">Company Email</Label>
                      <Input id="company-email" type="email" defaultValue="info@realestate.com" />
                    </div>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="company-phone">Company Phone</Label>
                  <Input id="company-phone" type="tel" defaultValue="(555) 987-6543" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="company-address">Company Address</Label>
                  <Textarea id="company-address" defaultValue="456 Business Ave, Suite 100, Anytown, ST 12345" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="company-website">Company Website</Label>
                  <Input id="company-website" type="url" defaultValue="https://www.realestate.com" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Company Information
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        )}
        {userRole === "admin" && (
          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Configure system security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Require Two-Factor Authentication</div>
                    <div className="text-sm text-muted-foreground">
                      Require all users to set up two-factor authentication
                    </div>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Password Expiration</div>
                    <div className="text-sm text-muted-foreground">Require users to change passwords periodically</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password-expiry">Password Expiry Period (Days)</Label>
                  <Input id="password-expiry" type="number" defaultValue="90" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="session-timeout">Session Timeout (Minutes)</Label>
                  <Input id="session-timeout" type="number" defaultValue="30" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="login-attempts">Max Failed Login Attempts</Label>
                  <Input id="login-attempts" type="number" defaultValue="5" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">IP Restriction</div>
                    <div className="text-sm text-muted-foreground">Restrict access to specific IP addresses</div>
                  </div>
                  <Switch />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="allowed-ips">Allowed IP Addresses (comma separated)</Label>
                  <Textarea id="allowed-ips" placeholder="192.168.1.1, 10.0.0.1" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Security Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}

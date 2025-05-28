"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Mail, Phone, Home, Calendar, Camera, Save, Lock, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useAuth } from "@/context/AuthContext"
import { getUserProfile, updateUserProfile, changePassword } from "@/services/api"
import { toast } from "@/components/ui/use-toast"

export default function ProfilePage() {
  const router = useRouter()
  // @ts-ignore
  const { user } = new useAuth()
  const [profile, setProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("personal")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    emergencyContact: "",
    language: "en",
    communicationEmail: true,
    communicationSMS: true
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })
  const [notificationPrefs, setNotificationPrefs] = useState({
    paymentConfirmations: true,
    maintenanceUpdates: true,
    leaseNotifications: true,
    marketingEmails: false,
    paymentReminders: true,
    maintenanceAlerts: false
  })

  useEffect(() => {
    const fetchProfile = async () => {
      if (user?.username) {
        try {
          setIsLoading(true)
          const data = await getUserProfile(user.username)
          setProfile(data)
          setFormData({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            email: data.email || "",
            phone: data.phone || "",
            address: data.address || "",
            emergencyContact: data.emergencyContact || "",
            language: data.language || "en",
            communicationEmail: data.communicationEmail !== false,
            communicationSMS: data.communicationSMS !== false
          })
          if (data.notificationPrefs) {
            setNotificationPrefs(data.notificationPrefs)
          }
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to load profile data",
            variant: "destructive",
          })
        } finally {
          setIsLoading(false)
        }
      }
    }

    fetchProfile()
  }, [user])

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleNotificationChange = (name: string, value: boolean) => {
    setNotificationPrefs(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const updatedProfile = await updateUserProfile({
        ...formData,
        username: user?.username
      })
      setProfile(updatedProfile)
      toast({
        title: "Success",
        description: "Profile updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      })
      return
    }
// services/api.ts
    const changePassword = async (data: {
      username: string;
      currentPassword: string;
      newPassword: string;
    }) => {
      let API_BASE_URL;
      const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include' // Important for session-based auth
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to change password');
      }

      return response.json();
    };
  }
    const handleNotificationsSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      try {
        setIsLoading(true)
        await updateUserProfile({
          username: user?.username,
          notificationPrefs
        })
        toast({
          title: "Success",
          description: "Notification preferences updated",
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to update preferences",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (!user || !profile) {
      return (
          <div className="flex items-center justify-center h-64">
            <p>Loading profile...</p>
          </div>
      )
    }

    return (
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">My Profile</h2>
            <p className="text-muted-foreground">Manage your personal information and preferences</p>
          </div>

          <div className="grid gap-6 md:grid-cols-[250px_1fr]">
            <Card className="h-fit">
              <CardContent className="p-6 flex flex-col items-center">
                <div className="relative">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={profile.avatar || "/placeholder.svg?height=128&width=128"}
                                 alt={`${profile.firstName} ${profile.lastName}`}/>
                    <AvatarFallback>
                      {profile.firstName?.[0]}{profile.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <Button size="icon" variant="outline" className="absolute bottom-0 right-0 h-8 w-8 rounded-full">
                    <Camera className="h-4 w-4"/>
                    <span className="sr-only">Change avatar</span>
                  </Button>
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-medium">{profile.firstName} {profile.lastName}</h3>
                  <p className="text-sm text-muted-foreground">
                    {profile.role} since {new Date(profile.joinDate).toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric'
                  })}
                  </p>
                </div>
                <Separator className="my-4"/>
                <div className="w-full space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground"/>
                    <span className="text-sm">{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground"/>
                    <span className="text-sm">{profile.phone || "Not provided"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Home className="h-4 w-4 text-muted-foreground"/>
                    <span className="text-sm">{profile.address ? profile.address.split('\n')[0] : "Not provided"}</span>
                  </div>
                  {profile.leaseEndDate && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground"/>
                        <span className="text-sm">
                    Lease ends: {new Date(profile.leaseEndDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                  </span>
                      </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList>
                  <TabsTrigger value="personal">Personal Information</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="space-y-4">
                  <form onSubmit={handleProfileSubmit}>
                    <Card>
                      <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>Update your personal details</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div className="grid gap-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleProfileChange}
                                disabled={isLoading}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleProfileChange}
                                disabled={isLoading}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleProfileChange}
                                disabled={isLoading}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleProfileChange}
                                disabled={isLoading}
                            />
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="address">Address</Label>
                          <Textarea
                              id="address"
                              name="address"
                              value={formData.address}
                              onChange={handleProfileChange}
                              disabled={isLoading}
                              rows={3}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="emergencyContact">Emergency Contact</Label>
                          <Input
                              id="emergencyContact"
                              name="emergencyContact"
                              value={formData.emergencyContact}
                              onChange={handleProfileChange}
                              disabled={isLoading}
                          />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button type="submit" disabled={isLoading}>
                          <Save className="mr-2 h-4 w-4"/>
                          {isLoading ? "Saving..." : "Save Changes"}
                        </Button>
                      </CardFooter>
                    </Card>
                  </form>

                  <form onSubmit={handleProfileSubmit}>
                    <Card>
                      <CardHeader>
                        <CardTitle>Preferences</CardTitle>
                        <CardDescription>Set your communication preferences</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid gap-2">
                          <Label htmlFor="language">Preferred Language</Label>
                          <select
                              id="language"
                              name="language"
                              value={formData.language}
                              onChange={handleProfileChange}
                              disabled={isLoading}
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <option value="en">English</option>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
                          </select>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="communicationEmail">Email Communication</Label>
                            <p className="text-sm text-muted-foreground">Receive updates via email</p>
                          </div>
                          <Switch
                              id="communicationEmail"
                              checked={formData.communicationEmail}
                              onCheckedChange={(checked) => setFormData({...formData, communicationEmail: checked})}
                              disabled={isLoading}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="communicationSMS">SMS Notifications</Label>
                            <p className="text-sm text-muted-foreground">Receive updates via text message</p>
                          </div>
                          <Switch
                              id="communicationSMS"
                              checked={formData.communicationSMS}
                              onCheckedChange={(checked) => setFormData({...formData, communicationSMS: checked})}
                              disabled={isLoading}
                          />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button type="submit" disabled={isLoading}>
                          <Save className="mr-2 h-4 w-4"/>
                          {isLoading ? "Saving..." : "Save Preferences"}
                        </Button>
                      </CardFooter>
                    </Card>
                  </form>
                </TabsContent>

                <TabsContent value="security" className="space-y-4">
                  <form onSubmit={handlePasswordSubmit}>
                    <Card>
                      <CardHeader>
                        <CardTitle>Password</CardTitle>
                        <CardDescription>Change your password</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid gap-2">
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <Input
                              id="currentPassword"
                              name="currentPassword"
                              type="password"
                              value={passwordData.currentPassword}
                              onChange={handlePasswordChange}
                              disabled={isLoading}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input
                              id="newPassword"
                              name="newPassword"
                              type="password"
                              value={passwordData.newPassword}
                              onChange={handlePasswordChange}
                              disabled={isLoading}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input
                              id="confirmPassword"
                              name="confirmPassword"
                              type="password"
                              value={passwordData.confirmPassword}
                              onChange={handlePasswordChange}
                              disabled={isLoading}
                          />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button type="submit" disabled={isLoading}>
                          <Lock className="mr-2 h-4 w-4"/>
                          {isLoading ? "Updating..." : "Update Password"}
                        </Button>
                      </CardFooter>
                    </Card>
                  </form>

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
                        <Switch disabled={isLoading}/>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" disabled={isLoading}>
                        Learn More
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-4">
                  <form onSubmit={handleNotificationsSubmit}>
                    <Card>
                      <CardHeader>
                        <CardTitle>Notification Preferences</CardTitle>
                        <CardDescription>Choose how you want to be notified</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-4">
                          <h3 className="text-sm font-medium">Email Notifications</h3>
                          <Separator/>
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="font-medium">Payment Confirmations</div>
                              <div className="text-sm text-muted-foreground">Receive emails for payment confirmations
                              </div>
                            </div>
                            <Switch
                                checked={notificationPrefs.paymentConfirmations}
                                onCheckedChange={(checked) => handleNotificationChange('paymentConfirmations', checked)}
                                disabled={isLoading}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="font-medium">Maintenance Updates</div>
                              <div className="text-sm text-muted-foreground">
                                Receive emails for maintenance request updates
                              </div>
                            </div>
                            <Switch
                                checked={notificationPrefs.maintenanceUpdates}
                                onCheckedChange={(checked) => handleNotificationChange('maintenanceUpdates', checked)}
                                disabled={isLoading}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="font-medium">Lease Notifications</div>
                              <div className="text-sm text-muted-foreground">
                                Receive emails about lease renewals and expirations
                              </div>
                            </div>
                            <Switch
                                checked={notificationPrefs.leaseNotifications}
                                onCheckedChange={(checked) => handleNotificationChange('leaseNotifications', checked)}
                                disabled={isLoading}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="font-medium">Marketing Emails</div>
                              <div className="text-sm text-muted-foreground">Receive promotional emails and
                                newsletters
                              </div>
                            </div>
                            <Switch
                                checked={notificationPrefs.marketingEmails}
                                onCheckedChange={(checked) => handleNotificationChange('marketingEmails', checked)}
                                disabled={isLoading}
                            />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h3 className="text-sm font-medium">SMS Notifications</h3>
                          <Separator/>
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="font-medium">Payment Reminders</div>
                              <div className="text-sm text-muted-foreground">Receive SMS reminders for upcoming
                                payments
                              </div>
                            </div>
                            <Switch
                                checked={notificationPrefs.paymentReminders}
                                onCheckedChange={(checked) => handleNotificationChange('paymentReminders', checked)}
                                disabled={isLoading}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="font-medium">Maintenance Alerts</div>
                              <div className="text-sm text-muted-foreground">Receive SMS alerts for maintenance
                                updates
                              </div>
                            </div>
                            <Switch
                                checked={notificationPrefs.maintenanceAlerts}
                                onCheckedChange={(checked) => handleNotificationChange('maintenanceAlerts', checked)}
                                disabled={isLoading}
                            />
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button type="submit" disabled={isLoading}>
                          <Bell className="mr-2 h-4 w-4"/>
                          {isLoading ? "Saving..." : "Save Preferences"}
                        </Button>
                      </CardFooter>
                    </Card>
                  </form>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
    )
  }
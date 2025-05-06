import { Activity } from "lucide-react"

interface RecentActivitiesProps {
  userRole: string | null
}

export function RecentActivities({ userRole }: RecentActivitiesProps) {
  // Different activities based on user role
  const getActivities = () => {
    if (userRole === "admin" || userRole === "agent") {
      return [
        {
          id: 1,
          action: "New tenant registered",
          user: "John Smith",
          time: "2 hours ago",
        },
        {
          id: 2,
          action: "Lease agreement signed",
          user: "Sarah Johnson",
          time: "Yesterday",
        },
        {
          id: 3,
          action: "Payment received",
          user: "Michael Brown",
          time: "Yesterday",
        },
        {
          id: 4,
          action: "Maintenance request resolved",
          user: "David Wilson",
          time: "2 days ago",
        },
        {
          id: 5,
          action: "Property added",
          user: "Admin",
          time: "3 days ago",
        },
      ]
    } else {
      return [
        {
          id: 1,
          action: "Maintenance request submitted",
          user: "You",
          time: "2 days ago",
        },
        {
          id: 2,
          action: "Payment processed",
          user: "You",
          time: "5 days ago",
        },
        {
          id: 3,
          action: "Lease agreement viewed",
          user: "You",
          time: "1 week ago",
        },
        {
          id: 4,
          action: "Profile updated",
          user: "You",
          time: "2 weeks ago",
        },
      ]
    }
  }

  const activities = getActivities()

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start space-x-4">
          <div className="rounded-full bg-primary/10 p-2">
            <Activity className="h-4 w-4 text-primary" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{activity.action}</p>
            <p className="text-xs text-muted-foreground">
              {activity.user} • {activity.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface MaintenanceRequestsProps {
  userRole: string | null
}

export function MaintenanceRequests({ userRole }: MaintenanceRequestsProps) {
  // Sample maintenance requests data
  const requests = [
    {
      id: 1,
      property: "Sunset Apartments #304",
      issue: "Leaking faucet in bathroom",
      tenant: "John Smith",
      date: "2023-05-01",
      status: "open",
      priority: "medium",
    },
    {
      id: 2,
      property: "Oakwood Residences #102",
      issue: "Broken air conditioning",
      tenant: "Sarah Johnson",
      date: "2023-04-28",
      status: "in-progress",
      priority: "high",
    },
    {
      id: 3,
      property: "Riverside Condos #215",
      issue: "Light fixture not working",
      tenant: "Michael Brown",
      date: "2023-04-25",
      status: "completed",
      priority: "low",
    },
    {
      id: 4,
      property: "Sunset Apartments #304",
      issue: "Dishwasher not draining",
      tenant: "John Smith",
      date: "2023-04-20",
      status: "completed",
      priority: "medium",
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

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Maintenance Requests</h3>
        <Button size="sm">{userRole === "tenant" ? "New Request" : "Manage Requests"}</Button>
      </div>
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
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">#{request.id}</TableCell>
                <TableCell>{request.property}</TableCell>
                {userRole !== "tenant" && <TableCell>{request.tenant}</TableCell>}
                <TableCell>{request.issue}</TableCell>
                <TableCell>{request.date}</TableCell>
                <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                <TableCell>{getStatusBadge(request.status)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    {userRole === "tenant" ? "View" : "Update"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

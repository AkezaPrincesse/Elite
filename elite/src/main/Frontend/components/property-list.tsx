import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PropertyListProps {
  userRole: string | null
}

export function PropertyList({ userRole }: PropertyListProps) {
  // Sample properties data
  const properties = [
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
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Properties</h3>
        {(userRole === "admin" || userRole === "agent") && <Button size="sm">Add Property</Button>}
      </div>
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
              {(userRole === "admin" || userRole === "agent") && (
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

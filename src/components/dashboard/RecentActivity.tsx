import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

const activities = [
  {
    id: 1,
    user: "Sarah Johnson",
    action: "completed profile verification",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    type: "profile",
    avatar: "/avatars/sarah.jpg"
  },
  {
    id: 2,
    user: "Mike Chen",
    action: "uploaded new certification",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    type: "document",
    avatar: "/avatars/mike.jpg"
  },
  {
    id: 3,
    user: "Emily Davis",
    action: "updated contact information",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    type: "profile",
    avatar: "/avatars/emily.jpg"
  },
  {
    id: 4,
    user: "Alex Rodriguez",
    action: "submitted performance review",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    type: "review",
    avatar: "/avatars/alex.jpg"
  },
  {
    id: 5,
    user: "Lisa Wang",
    action: "joined Sales Department",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    type: "onboarding",
    avatar: "/avatars/lisa.jpg"
  }
]

const getActivityBadge = (type: string) => {
  switch (type) {
    case "profile":
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Profile</Badge>
    case "document":
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Document</Badge>
    case "review":
      return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Review</Badge>
    case "onboarding":
      return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Onboarding</Badge>
    default:
      return <Badge variant="outline">Activity</Badge>
  }
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.avatar} alt={activity.user} />
                <AvatarFallback className="text-xs">
                  {getInitials(activity.user)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm">
                    <span className="font-medium">{activity.user}</span>{" "}
                    <span className="text-muted-foreground">{activity.action}</span>
                  </p>
                  {getActivityBadge(activity.type)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
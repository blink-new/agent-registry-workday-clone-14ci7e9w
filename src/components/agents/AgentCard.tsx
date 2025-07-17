import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Mail, Phone, MapPin, MoreHorizontal } from "lucide-react"
import { useState, useEffect } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Agent {
  id: string
  name: string
  email: string
  phone: string
  location: string
  department: string
  status: "active" | "inactive" | "pending"
  avatar?: string
  joinDate: string
  performance: number
}

interface AgentCardProps {
  agent: Agent
}

export function AgentCard({ agent }: AgentCardProps) {
  const [animatedPerformance, setAnimatedPerformance] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPerformance(agent.performance)
    }, 300)
    return () => clearTimeout(timer)
  }, [agent.performance])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "inactive":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-blue-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-300 group cursor-pointer border-l-4 border-l-transparent hover:border-l-primary">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar className="h-12 w-12 transition-transform group-hover:scale-105">
                <AvatarImage src={agent.avatar} alt={agent.name} />
                <AvatarFallback>{getInitials(agent.name)}</AvatarFallback>
              </Avatar>
              <div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${
                agent.status === 'active' ? 'bg-green-500' : 
                agent.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
              }`} />
            </div>
            <div>
              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{agent.name}</h3>
              <p className="text-sm text-muted-foreground">{agent.department}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={`${getStatusColor(agent.status)} transition-all duration-300`}>
              {agent.status}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Profile</DropdownMenuItem>
                <DropdownMenuItem>Edit Details</DropdownMenuItem>
                <DropdownMenuItem>Send Message</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  Deactivate
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Mail className="h-4 w-4" />
          <span>{agent.email}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Phone className="h-4 w-4" />
          <span>{agent.phone}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{agent.location}</span>
        </div>
        <div className="pt-3 border-t space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Joined: </span>
            <span className="font-medium">{agent.joinDate}</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Performance</span>
              <span className={`font-medium ${getPerformanceColor(agent.performance)}`}>
                {agent.performance}%
              </span>
            </div>
            <Progress 
              value={animatedPerformance} 
              className="h-2 transition-all duration-1000"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
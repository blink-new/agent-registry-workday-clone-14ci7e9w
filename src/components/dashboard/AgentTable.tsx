import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const agents = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    department: "Sales",
    status: "Active",
    joinDate: "2024-01-15",
    avatar: "/avatars/sarah.png",
    initials: "SJ",
    performance: 95
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike.chen@company.com",
    department: "Marketing",
    status: "Active",
    joinDate: "2024-02-20",
    avatar: "/avatars/mike.png",
    initials: "MC",
    performance: 88
  },
  {
    id: 3,
    name: "Emily Davis",
    email: "emily.davis@company.com",
    department: "Support",
    status: "Pending",
    joinDate: "2024-03-10",
    avatar: "/avatars/emily.png",
    initials: "ED",
    performance: 92
  },
  {
    id: 4,
    name: "Alex Rodriguez",
    email: "alex.rodriguez@company.com",
    department: "Sales",
    status: "Active",
    joinDate: "2024-01-08",
    avatar: "/avatars/alex.png",
    initials: "AR",
    performance: 97
  },
  {
    id: 5,
    name: "Lisa Wang",
    email: "lisa.wang@company.com",
    department: "Operations",
    status: "Inactive",
    joinDate: "2023-12-05",
    avatar: "/avatars/lisa.png",
    initials: "LW",
    performance: 85
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
    case 'Inactive':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
  }
}

const getPerformanceColor = (score: number) => {
  if (score >= 95) return 'text-green-600 dark:text-green-400'
  if (score >= 85) return 'text-blue-600 dark:text-blue-400'
  if (score >= 75) return 'text-yellow-600 dark:text-yellow-400'
  return 'text-red-600 dark:text-red-400'
}

export function AgentTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Agents</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Agent</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Performance</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agents.map((agent) => (
              <TableRow key={agent.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={agent.avatar} alt={agent.name} />
                      <AvatarFallback>{agent.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{agent.name}</div>
                      <div className="text-sm text-muted-foreground">{agent.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{agent.department}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={getStatusColor(agent.status)}>
                    {agent.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className={`font-medium ${getPerformanceColor(agent.performance)}`}>
                    {agent.performance}%
                  </span>
                </TableCell>
                <TableCell>{agent.joinDate}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Agent
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Agent
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
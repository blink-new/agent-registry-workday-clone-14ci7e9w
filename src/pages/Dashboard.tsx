import { StatsCards } from "@/components/dashboard/StatsCards"
import { RecentActivity } from "@/components/dashboard/RecentActivity"
import { AgentCard } from "@/components/agents/AgentCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Filter } from "lucide-react"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

// Mock data for agents
const recentAgents = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    department: "Sales",
    status: "active" as const,
    joinDate: "Jan 15, 2024",
    performance: 94
  },
  {
    id: "2",
    name: "Mike Chen",
    email: "mike.chen@company.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    department: "Marketing",
    status: "active" as const,
    joinDate: "Dec 8, 2023",
    performance: 87
  },
  {
    id: "3",
    name: "Emily Davis",
    email: "emily.davis@company.com",
    phone: "+1 (555) 345-6789",
    location: "Chicago, IL",
    department: "Operations",
    status: "pending" as const,
    joinDate: "Feb 1, 2024",
    performance: 91
  },
  {
    id: "4",
    name: "Alex Rodriguez",
    email: "alex.rodriguez@company.com",
    phone: "+1 (555) 456-7890",
    location: "Austin, TX",
    department: "Technology",
    status: "active" as const,
    joinDate: "Nov 20, 2023",
    performance: 96
  }
]

export function Dashboard() {
  const navigate = useNavigate()

  const handleAddAgent = () => {
    navigate('/register')
    toast.success("Redirecting to agent registration...")
  }

  const handleFilter = () => {
    toast.info("Filter functionality coming soon!")
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your agents today.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleFilter}>
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button size="sm" onClick={handleAddAgent}>
            <Plus className="mr-2 h-4 w-4" />
            Add Agent
          </Button>
        </div>
      </div>

      <StatsCards />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Agents</CardTitle>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {recentAgents.map((agent) => (
                  <AgentCard key={agent.id} agent={agent} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>
    </div>
  )
}
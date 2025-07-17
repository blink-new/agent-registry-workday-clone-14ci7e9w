import { useState } from 'react'
import { AgentTable } from "@/components/dashboard/AgentTable"
import { AgentCard } from "@/components/agents/AgentCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Plus, 
  Download,
  Users,
  UserCheck,
  UserX,
  Clock
} from "lucide-react"
import { Link } from 'react-router-dom'

// Mock data for agents
const agents = [
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
  },
  {
    id: "5",
    name: "Lisa Wang",
    email: "lisa.wang@company.com",
    phone: "+1 (555) 567-8901",
    location: "Seattle, WA",
    department: "Support",
    status: "inactive" as const,
    joinDate: "Oct 5, 2023",
    performance: 85
  },
  {
    id: "6",
    name: "David Brown",
    email: "david.brown@company.com",
    phone: "+1 (555) 678-9012",
    location: "Miami, FL",
    department: "Sales",
    status: "active" as const,
    joinDate: "Mar 12, 2024",
    performance: 89
  }
]

const departments = ["All", "Sales", "Marketing", "Operations", "Technology", "Support"]
const statuses = ["All", "Active", "Inactive", "Pending"]

export function AgentDirectory() {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.department.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesDepartment = selectedDepartment === 'All' || agent.department === selectedDepartment
    const matchesStatus = selectedStatus === 'All' || agent.status.toLowerCase() === selectedStatus.toLowerCase()
    
    return matchesSearch && matchesDepartment && matchesStatus
  })

  const stats = {
    total: agents.length,
    active: agents.filter(a => a.status === 'active').length,
    inactive: agents.filter(a => a.status === 'inactive').length,
    pending: agents.filter(a => a.status === 'pending').length
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agent Directory</h1>
          <p className="text-muted-foreground">
            Manage and view all registered agents in your organization
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm" asChild>
            <Link to="/register">
              <Plus className="mr-2 h-4 w-4" />
              Add Agent
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactive</CardTitle>
            <UserX className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.inactive}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="flex flex-1 items-center space-x-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search agents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">
                {filteredAgents.length} of {agents.length} agents
              </Badge>
              <div className="flex items-center rounded-md border">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'table' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('table')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Agents Display */}
      {viewMode === 'grid' ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAgents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      ) : (
        <AgentTable />
      )}

      {filteredAgents.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No agents found</h3>
            <p className="text-muted-foreground text-center mb-4">
              No agents match your current search criteria. Try adjusting your filters.
            </p>
            <Button variant="outline" onClick={() => {
              setSearchQuery('')
              setSelectedDepartment('All')
              setSelectedStatus('All')
            }}>
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
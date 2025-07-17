import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { BarChart3, Download, TrendingUp, Users, Award } from 'lucide-react'
import { toast } from 'sonner'

const departmentStats = [
  { name: 'Sales', total: 324, active: 298, performance: 92 },
  { name: 'Marketing', total: 156, active: 142, performance: 88 },
  { name: 'Operations', total: 289, active: 267, performance: 85 },
  { name: 'Technology', total: 198, active: 185, performance: 94 },
  { name: 'Support', total: 167, active: 154, performance: 90 }
]

export function Reports() {
  const handleExport = (type: string) => {
    toast.success(`Exporting ${type} report...`)
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive insights into agent performance and system metrics
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => handleExport('summary')}>
          <Download className="mr-2 h-4 w-4" />
          Export Summary
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +12%
              </Badge>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Performance</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89.2%</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +3.2%
              </Badge>
              <span>improvement</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Registrations</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">67</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Badge className="bg-blue-100 text-blue-800 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +18%
              </Badge>
              <span>this month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.1%</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +1.8%
              </Badge>
              <span>vs target</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Department Performance</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => handleExport('department')}>
            <Download className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {departmentStats.map((dept) => (
              <div key={dept.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{dept.name}</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-muted-foreground">{dept.active}/{dept.total}</span>
                    <Badge 
                      variant="secondary" 
                      className={dept.performance >= 90 ? 'bg-green-100 text-green-800' : 
                                dept.performance >= 85 ? 'bg-blue-100 text-blue-800' : 
                                'bg-yellow-100 text-yellow-800'}
                    >
                      {dept.performance}%
                    </Badge>
                  </div>
                </div>
                <Progress value={dept.performance} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

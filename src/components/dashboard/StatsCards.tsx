import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Users, UserCheck, AlertTriangle, FileText } from "lucide-react"
import { useEffect, useState } from "react"

const stats = [
  {
    title: "Total Agents",
    value: "1,247",
    change: "+12%",
    trend: "up",
    icon: Users,
    description: "from last month"
  },
  {
    title: "Active Agents",
    value: "1,156",
    change: "+8%",
    trend: "up",
    icon: UserCheck,
    description: "currently active"
  },
  {
    title: "Pending Reviews",
    value: "23",
    change: "-15%",
    trend: "down",
    icon: AlertTriangle,
    description: "awaiting approval"
  },
  {
    title: "Documents Processed",
    value: "3,847",
    change: "+23%",
    trend: "up",
    icon: FileText,
    description: "this month"
  }
]

export function StatsCards() {
  const [animatedValues, setAnimatedValues] = useState(stats.map(() => 0))

  useEffect(() => {
    const timers = stats.map((stat, index) => {
      const targetValue = parseInt(stat.value.replace(/,/g, ''))
      let currentValue = 0
      const increment = targetValue / 50
      
      return setInterval(() => {
        currentValue += increment
        if (currentValue >= targetValue) {
          currentValue = targetValue
          clearInterval(timers[index])
        }
        setAnimatedValues(prev => {
          const newValues = [...prev]
          newValues[index] = Math.floor(currentValue)
          return newValues
        })
      }, 30)
    })

    return () => timers.forEach(timer => clearInterval(timer))
  }, [])

  const formatValue = (value: number, originalValue: string) => {
    if (originalValue.includes(',')) {
      return value.toLocaleString()
    }
    return value.toString()
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={stat.title} className="relative overflow-hidden hover:shadow-lg transition-all duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold transition-all duration-300">
              {formatValue(animatedValues[index], stat.value)}
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Badge 
                variant={stat.trend === "up" ? "default" : "secondary"}
                className={`flex items-center gap-1 transition-all duration-300 ${
                  stat.trend === "up" 
                    ? "bg-green-100 text-green-800 hover:bg-green-100" 
                    : "bg-red-100 text-red-800 hover:bg-red-100"
                }`}
              >
                {stat.trend === "up" ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {stat.change}
              </Badge>
              <span>{stat.description}</span>
            </div>
          </CardContent>
          <div className={`absolute bottom-0 left-0 h-1 transition-all duration-500 ${
            stat.trend === "up" ? "bg-green-500" : "bg-red-500"
          } group-hover:h-2`} style={{ width: '100%' }} />
        </Card>
      ))}
    </div>
  )
}
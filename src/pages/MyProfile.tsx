import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Edit, Save, Mail, Building, Calendar } from 'lucide-react'
import { toast } from 'sonner'
import { blink } from '@/blink/client'

export function MyProfile() {
  const [user, setUser] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
    })
    return unsubscribe
  }, [])

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
          <p className="text-muted-foreground">
            Manage your personal information and view your performance
          </p>
        </div>
        <Button onClick={() => setIsEditing(!isEditing)}>
          <Edit className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">John Doe</h3>
                <p className="text-muted-foreground">Senior Agent</p>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Email</Label>
                <Input value="john.doe@company.com" disabled={!isEditing} />
              </div>
              <div>
                <Label>Phone</Label>
                <Input value="+1 (555) 123-4567" disabled={!isEditing} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

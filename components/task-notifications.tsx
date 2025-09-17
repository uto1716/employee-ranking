"use client"

import { useState } from "react"
import { Bell, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// サンプルデータ
const notifications = [
  {
    id: "1",
    title: "新規案件: 大型商業施設害虫駆除",
    description: "新宿区の大型商業施設での害虫駆除作業が登録されました。",
    type: "害虫駆除",
    points: 25,
    amount: 50000,
    date: "2025-05-30",
    isNew: true,
  },
  {
    id: "2",
    title: "新規案件: 高層マンション清掃",
    description: "渋谷区の高層マンション全体清掃作業が登録されました。",
    type: "清掃",
    points: 30,
    amount: 60000,
    date: "2025-05-30",
    isNew: true,
  },
  {
    id: "3",
    title: "新規案件: ホテル害虫対策",
    description: "品川区のホテルでの害虫対策作業が登録されました。",
    type: "害虫駆除",
    points: 20,
    amount: 40000,
    date: "2025-05-29",
    isNew: false,
  },
]

export function TaskNotifications() {
  const [readNotifications, setReadNotifications] = useState([])

  const markAsRead = (id) => {
    setReadNotifications([...readNotifications, id])
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <Card
          key={notification.id}
          className={`hover:shadow-md transition-shadow ${readNotifications.includes(notification.id) ? "bg-muted/70" : "bg-card"}`}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${notification.type === "害虫駆除" ? "bg-red-100" : "bg-blue-100"}`}>
                  <Bell className={`h-5 w-5 ${notification.type === "害虫駆除" ? "text-red-600" : "text-blue-600"}`} />
                </div>
                <div>
                  <h3 className="font-semibold">{notification.title}</h3>
                  <p className="text-xs text-muted-foreground">{notification.date}</p>
                </div>
              </div>
              {notification.isNew && !readNotifications.includes(notification.id) && (
                <Badge variant="default" className="bg-green-500 hover:bg-green-600 text-xs">
                  新着
                </Badge>
              )}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{notification.description}</p>
            <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
              <div>
                <span className="text-muted-foreground">種類: </span>
                <Badge variant={notification.type === "害虫駆除" ? "destructive" : "secondary"} className="text-xs">
                  {notification.type}
                </Badge>
              </div>
              <div>
                <span className="text-muted-foreground">ポイント: </span>
                <span>{notification.points}</span>
              </div>
              <div>
                <span className="text-muted-foreground">金額: </span>
                <span>¥{notification.amount.toLocaleString()}</span>
              </div>
            </div>
            {!readNotifications.includes(notification.id) && (
              <Button variant="outline" size="sm" onClick={() => markAsRead(notification.id)} className="mt-3 w-full">
                <CheckCircle className="h-4 w-4 mr-1" />
                既読にする
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

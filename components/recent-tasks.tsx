"use client"

import { CheckCircle, Clock, UserPlus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

// サンプルデータ
const recentTasks = [
  {
    id: "1",
    title: "オフィスビル害虫駆除",
    employee: "田中 太郎",
    type: "害虫駆除",
    points: 15,
    amount: 30000,
    date: "2025-05-29",
    status: "完了",
  },
  {
    id: "2",
    title: "マンション共用部清掃",
    employee: "佐藤 花子",
    type: "清掃",
    points: 10,
    amount: 20000,
    date: "2025-05-29",
    status: "完了",
  },
  {
    id: "3",
    title: "レストラン害虫対策",
    employee: "鈴木 一郎",
    type: "害虫駆除",
    points: 20,
    amount: 40000,
    date: "2025-05-28",
    status: "完了",
  },
  {
    id: "4",
    title: "オフィス定期清掃",
    employee: "高橋 実",
    type: "清掃",
    points: 12,
    amount: 24000,
    date: "2025-05-28",
    status: "完了",
  },
  {
    id: "5",
    title: "住宅害虫駆除",
    employee: "伊藤 誠",
    type: "害虫駆除",
    points: 8,
    amount: 16000,
    date: "2025-05-27",
    status: "完了",
  },
  {
    id: "6",
    title: "未割当タスク",
    employee: "未割当",
    type: "その他",
    points: 5,
    amount: 10000,
    date: "2025-05-26",
    status: "未着手",
  },
]

export function RecentTasks() {
  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>業務名</TableHead>
            <TableHead>担当者</TableHead>
            <TableHead className="min-w-[80px]">種類</TableHead>
            <TableHead className="hidden sm:table-cell">ポイント</TableHead>
            <TableHead className="hidden sm:table-cell text-right">金額</TableHead>
            <TableHead>完了日</TableHead>
            <TableHead>状態</TableHead>
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentTasks.map((task) => (
            <TableRow key={task.id} className="hover:bg-muted/50">
              <TableCell className="font-medium">{task.title}</TableCell>
              <TableCell>{task.employee}</TableCell>
              <TableCell className="min-w-[80px]">
                <Badge variant={task.type === "害虫駆除" ? "destructive" : "secondary"} className="whitespace-nowrap">
                  {task.type}
                </Badge>
              </TableCell>
              <TableCell className="hidden sm:table-cell">{task.points}</TableCell>
              <TableCell className="hidden sm:table-cell text-right">¥{task.amount.toLocaleString()}</TableCell>
              <TableCell>{task.date}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  {task.status === "完了" ? (
                    <Badge variant="outline" className="border-green-500 text-green-600">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      {task.status}
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="border-amber-500 text-amber-600">
                      <Clock className="mr-1 h-3 w-3" />
                      {task.status}
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>
                {task.employee === "未割当" && (
                  <Button variant="outline" size="sm">
                    <UserPlus className="mr-1 h-4 w-4" />
                    割当
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

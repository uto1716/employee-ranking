"use client"

import { useState } from "react"
import { CheckCircle, Clock, MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// サンプルデータ
const allTasks = [
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
    title: "大型商業施設害虫駆除",
    employee: "未割当",
    type: "害虫駆除",
    points: 25,
    amount: 50000,
    date: "2025-05-30",
    status: "未完了",
  },
  {
    id: "7",
    title: "高層マンション清掃",
    employee: "未割当",
    type: "清掃",
    points: 30,
    amount: 60000,
    date: "2025-05-30",
    status: "未完了",
  },
]

export function TaskList({ type, status }: { type?: string | null; status?: string | null }) {
  const [tasks, setTasks] = useState(allTasks)

  // タイプとステータスでフィルタリング
  const filteredTasks = tasks.filter((task) => {
    let matchesType = true
    let matchesStatus = true

    if (type && task.type !== type) {
      matchesType = false
    }
    if (status && task.status !== status) {
      matchesStatus = false
    }
    return matchesType && matchesStatus
  })

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

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
            <TableHead>日付</TableHead>
            <TableHead>状態</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTasks.map((task) => (
            <TableRow key={task.id}>
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
                    <>
                      <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                      <span>{task.status}</span>
                    </>
                  ) : (
                    <>
                      <Clock className="mr-1 h-4 w-4 text-amber-500" />
                      <span>{task.status}</span>
                    </>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">メニューを開く</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>アクション</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      編集
                    </DropdownMenuItem>
                    {task.status !== "完了" && (
                      <DropdownMenuItem>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        完了にする
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleDelete(task.id)} className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      削除
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

"use client"

import Link from "next/link"
import { ArrowUpDown, MoreHorizontal, Trophy, Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { Progress } from "@/components/ui/progress"
import { useState } from "react"

// サンプルデータ
const employeesData = [
  {
    id: "1",
    name: "田中 太郎",
    department: "害虫駆除部",
    points: 1250,
    tasksCompleted: 125,
    commission: 187500,
    avatarUrl: "/placeholder.svg?height=40&width=40",
    targetPoints: 1500,
    rating: 4.5,
  },
  {
    id: "2",
    name: "佐藤 花子",
    department: "清掃部",
    points: 980,
    tasksCompleted: 98,
    commission: 147000,
    avatarUrl: "/placeholder.svg?height=40&width=40",
    targetPoints: 1200,
    rating: 4.2,
  },
  {
    id: "3",
    name: "鈴木 一郎",
    department: "害虫駆除部",
    points: 850,
    tasksCompleted: 85,
    commission: 127500,
    avatarUrl: "/placeholder.svg?height=40&width=40",
    targetPoints: 1000,
    rating: 3.8,
  },
  {
    id: "6",
    name: "渡辺 久美子",
    department: "営業部",
    points: 1150,
    tasksCompleted: 55,
    commission: 230000,
    avatarUrl: "/placeholder.svg?height=40&width=40",
    targetPoints: 1300,
    rating: 4.8,
  },
]

type SortableKeys = "points" | "tasksCompleted" | "commission"

export function EmployeeRankingTable() {
  const [sorting, setSorting] = useState<SortableKeys>("points")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const sortedEmployees = [...employeesData].sort((a, b) => {
    const valA = a[sorting]
    const valB = b[sorting]

    if (typeof valA === "number" && typeof valB === "number") {
      return sortDirection === "desc" ? valB - valA : valA - valB
    }
    if (valA < valB) return sortDirection === "asc" ? -1 : 1
    if (valA > valB) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  const handleSort = (column: SortableKeys) => {
    if (sorting === column) {
      setSortDirection(sortDirection === "desc" ? "asc" : "desc")
    } else {
      setSorting(column)
      setSortDirection("desc")
    }
  }

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="h-5 w-5 text-yellow-400 fill-yellow-400" />
    if (index === 1) return <Trophy className="h-5 w-5 text-slate-400 fill-slate-400" />
    if (index === 2) return <Trophy className="h-5 w-5 text-orange-400 fill-orange-400" />
    return <span className="text-sm font-medium">{index + 1}</span>
  }

  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12 text-center px-2">順位</TableHead>
            <TableHead className="min-w-[150px] px-2">社員名</TableHead>
            <TableHead className="hidden md:table-cell min-w-[100px] px-2">部署</TableHead>
            <TableHead className="cursor-pointer min-w-[80px] px-2" onClick={() => handleSort("points")}>
              <div className="flex items-center">
                ポイント
                <ArrowUpDown className="ml-1 h-3 w-3 sm:ml-2 sm:h-4 sm:w-4" />
              </div>
            </TableHead>
            <TableHead className="hidden lg:table-cell min-w-[100px] px-2">目標達成度</TableHead>
            <TableHead
              className="hidden md:table-cell cursor-pointer text-right min-w-[100px] px-2" // Changed from sm:table-cell to md:table-cell
              onClick={() => handleSort("commission")}
            >
              <div className="flex items-center justify-end">
                報酬金額
                <ArrowUpDown className="ml-1 h-3 w-3 sm:ml-2 sm:h-4 sm:w-4" />
              </div>
            </TableHead>
            <TableHead className="w-10 px-1 sm:px-2"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedEmployees.map((employee, index) => (
            <TableRow key={employee.id} className="hover:bg-muted/50">
              <TableCell className="text-center px-2">{getRankIcon(index)}</TableCell>
              <TableCell className="px-2">
                <Link href={`/employees/${employee.id}`} className="flex items-center gap-2 sm:gap-3 group">
                  <Avatar className="h-8 w-8 sm:h-10 sm:w-10 border group-hover:border-primary transition-colors">
                    <AvatarImage src={employee.avatarUrl || "/placeholder.svg"} alt={employee.name} />
                    <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm sm:text-base font-medium group-hover:text-primary transition-colors">
                      {employee.name}
                    </p>
                    <div className="hidden sm:flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${i < Math.floor(employee.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                      <span className="ml-1 text-xs text-muted-foreground">({employee.rating.toFixed(1)})</span>
                    </div>
                  </div>
                </Link>
              </TableCell>
              <TableCell className="hidden md:table-cell px-2">
                <Badge variant="secondary" className="whitespace-nowrap text-xs sm:text-sm">
                  {employee.department}
                </Badge>
              </TableCell>
              <TableCell className="font-semibold text-sm sm:text-lg px-2">
                {employee.points.toLocaleString()}
              </TableCell>
              <TableCell className="hidden lg:table-cell px-2">
                <div className="w-24 sm:w-32">
                  <Progress value={(employee.points / employee.targetPoints) * 100} className="h-1.5 sm:h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {((employee.points / employee.targetPoints) * 100).toFixed(0)}% 達成
                  </p>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell text-right font-medium text-xs sm:text-base px-2">
                {" "}
                {/* Changed from sm:table-cell to md:table-cell */}¥{employee.commission.toLocaleString()}
              </TableCell>
              <TableCell className="px-1 sm:px-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-7 w-7 sm:h-8 sm:w-8 p-0 text-muted-foreground hover:text-primary"
                    >
                      <span className="sr-only">メニューを開く</span>
                      <MoreHorizontal className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>アクション</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                      <Link href={`/employees/${employee.id}`}>詳細を表示</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>業務履歴</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>報酬明細</DropdownMenuItem>
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

"use client"

import { useSession } from 'next-auth/react'
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

import Link from "next/link"
import {
  Users,
  ClipboardList,
  LineChart,
  Home,
  Settings,
  ChevronLeft,
  ChevronRight,
  Search,
  PlusCircle,
  LayoutGrid,
  Filter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { EmployeeListGrouped } from "@/components/employee-list-grouped"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample data for employees
const allEmployees = [
  {
    id: "1",
    name: "田中 太郎",
    department: "害虫駆除部",
    points: 1250,
    avatarUrl: "/placeholder.svg?height=40&width=40",
    position: "リーダー",
  },
  {
    id: "2",
    name: "佐藤 花子",
    department: "清掃部",
    points: 980,
    avatarUrl: "/placeholder.svg?height=40&width=40",
    position: "スタッフ",
  },
  {
    id: "3",
    name: "鈴木 一郎",
    department: "害虫駆除部",
    points: 850,
    avatarUrl: "/placeholder.svg?height=40&width=40",
    position: "スタッフ",
  },
  {
    id: "4",
    name: "高橋 実",
    department: "清掃部",
    points: 720,
    avatarUrl: "/placeholder.svg?height=40&width=40",
    position: "スタッフ",
  },
  {
    id: "5",
    name: "伊藤 誠",
    department: "害虫駆除部",
    points: 650,
    avatarUrl: "/placeholder.svg?height=40&width=40",
    position: "ジュニアスタッフ",
  },
  {
    id: "6",
    name: "渡辺 久美子",
    department: "営業部",
    points: 1150,
    avatarUrl: "/placeholder.svg?height=40&width=40",
    position: "マネージャー",
  },
  {
    id: "7",
    name: "山本 武",
    department: "営業部",
    points: 950,
    avatarUrl: "/placeholder.svg?height=40&width=40",
    position: "スタッフ",
  },
  {
    id: "8",
    name: "中村 あゆみ",
    department: "清掃部",
    points: 1020,
    avatarUrl: "/placeholder.svg?height=40&width=40",
    position: "リーダー",
  },
]

export default function EmployeesPage() {
  const { data: session, status } = useSession()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState<string[]>([])

  const departments = Array.from(new Set(allEmployees.map((e) => e.department)))

  // Loading state while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>読み込み中...</div>
      </div>
    )
  }

  const filteredEmployees = allEmployees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = departmentFilter.length === 0 || departmentFilter.includes(employee.department)
    return matchesSearch && matchesDepartment
  })

  return (
    <div className="flex min-h-screen w-full bg-background">
      {isSidebarOpen && (
        <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r bg-card sm:flex">
          <div className="flex h-16 items-center border-b px-6">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary">
              <LayoutGrid className="h-7 w-7" />
              <span>エンタ</span>
            </Link>
          </div>
          <nav className="flex-1 space-y-1.5 p-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10"
            >
              <Home className="h-5 w-5" />
              ダッシュボード
            </Link>
            <Link
              href="/tasks"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10"
            >
              <ClipboardList className="h-5 w-5" />
              業務管理
            </Link>
            <Link
              href="/employees"
              className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2.5 text-primary font-medium transition-all hover:bg-primary/20"
            >
              <Users className="h-5 w-5" />
              社員一覧
            </Link>
            <Link
              href="/reports"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10"
            >
              <LineChart className="h-5 w-5" />
              レポート
            </Link>
          </nav>
          <div className="mt-auto p-4 border-t">
            <Link
              href="/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10"
            >
              <Settings className="h-5 w-5" />
              設定
            </Link>
          </div>
        </aside>
      )}

      <div className={`flex flex-1 flex-col ${isSidebarOpen ? "sm:pl-64" : ""}`}>
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background/80 backdrop-blur-md px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="sm:hidden text-muted-foreground"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:inline-flex text-muted-foreground"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </Button>
          </div>
          {/* User menu can be added here if needed */}
        </header>

        <main className="flex-1 space-y-6 p-4 md:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h1 className="text-3xl font-bold tracking-tight">社員一覧</h1>
            <Button size="lg" className="shadow-sm hover:shadow-md transition-shadow">
              <PlusCircle className="mr-2 h-5 w-5" />
              新規社員登録
            </Button>
          </div>

          <Card className="shadow-subtle">
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="relative flex-1 w-full sm:w-auto">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="社員名、部署で検索..."
                    className="pl-8 w-full focus:shadow-focus"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full sm:w-auto shrink-0">
                      <Filter className="mr-2 h-4 w-4" />
                      部署フィルター ({departmentFilter.length > 0 ? departmentFilter.length : "全て"})
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuLabel>部署を選択</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {departments.map((dept) => (
                      <DropdownMenuCheckboxItem
                        key={dept}
                        checked={departmentFilter.includes(dept)}
                        onCheckedChange={(checked) => {
                          setDepartmentFilter((prev) => (checked ? [...prev, dept] : prev.filter((d) => d !== dept)))
                        }}
                      >
                        {dept}
                      </DropdownMenuCheckboxItem>
                    ))}
                    {departmentFilter.length > 0 && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setDepartmentFilter([])} className="text-sm text-primary">
                          フィルターをクリア
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <EmployeeListGrouped employees={filteredEmployees} />
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

"use client"

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
  Calendar,
  TrendingUp,
  PieChartIcon,
  BarChart3,
  LayoutGrid,
  DollarSign,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import {
  ResponsiveContainer,
  LineChart as ReLineChart,
  BarChart as ReBarChart,
  PieChart as RePieChart,
  Line,
  Bar,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts"

// Sample Data for Charts
const monthlyTaskData = [
  { month: "1月", completed: 65, created: 80 },
  { month: "2月", completed: 59, created: 75 },
  { month: "3月", completed: 80, created: 90 },
  { month: "4月", completed: 81, created: 95 },
  { month: "5月", completed: 56, created: 70 },
  { month: "6月", completed: 72, created: 85 },
]

const taskTypeData = [
  { name: "害虫駆除", value: 400, color: "#ef4444" }, // red-500
  { name: "清掃", value: 300, color: "#3b82f6" }, // blue-500
  { name: "定期点検", value: 200, color: "#f97316" }, // orange-500
  { name: "その他", value: 100, color: "#6b7280" }, // gray-500
]

const departmentPerformanceData = [
  { name: "害虫駆除部", points: 4500, tasks: 120, revenue: 1200000 },
  { name: "清掃部", points: 3800, tasks: 150, revenue: 950000 },
  { name: "営業部", points: 5200, tasks: 90, revenue: 1500000 },
]

export default function ReportsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  // const [dateRange, setDateRange] = useState<DateRange | undefined>() // For DateRangePicker

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
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10"
            >
              <Users className="h-5 w-5" />
              社員一覧
            </Link>
            <Link
              href="/reports"
              className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2.5 text-primary font-medium transition-all hover:bg-primary/20"
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
            <div className="relative flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="レポート内検索..."
                className="w-full rounded-lg bg-muted pl-8 md:w-[280px] lg:w-[380px] focus:shadow-focus"
              />
            </div>
          </div>
          {/* User menu can be added here if needed */}
        </header>

        <main className="flex-1 space-y-8 p-4 md:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h1 className="text-3xl font-bold tracking-tight">業績レポート</h1>
            {/* <DateRangePicker date={dateRange} onDateChange={setDateRange} /> */}
            <Button variant="outline" className="shadow-sm">
              <Calendar className="mr-2 h-4 w-4" />
              期間選択
            </Button>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="shadow-subtle">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">総売上</CardTitle>
                <DollarSign className="h-5 w-5 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">¥12,345,678</div>
                <p className="text-xs text-muted-foreground">+5.2% 前期間比</p>
              </CardContent>
            </Card>
            <Card className="shadow-subtle">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">完了業務数</CardTitle>
                <CheckCircle className="h-5 w-5 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,876件</div>
                <p className="text-xs text-muted-foreground">+10.1% 前期間比</p>
              </CardContent>
            </Card>
            <Card className="shadow-subtle">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">平均業務単価</CardTitle>
                <TrendingUp className="h-5 w-5 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">¥6,580</div>
                <p className="text-xs text-muted-foreground">-1.5% 前期間比</p>
              </CardContent>
            </Card>
            <Card className="shadow-subtle">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">新規顧客数</CardTitle>
                <Users className="h-5 w-5 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89社</div>
                <p className="text-xs text-muted-foreground">+15% 前期間比</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-subtle">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-primary" />
                  月別業務推移
                </CardTitle>
                <CardDescription>過去6ヶ月間の新規業務数と完了業務数の推移</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px] pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <ReLineChart data={monthlyTaskData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        borderColor: "hsl(var(--border))",
                        borderRadius: "var(--radius)",
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: "12px" }} />
                    <Line
                      type="monotone"
                      dataKey="created"
                      name="新規"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="completed"
                      name="完了"
                      stroke="hsl(var(--destructive))"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </ReLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="shadow-subtle">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChartIcon className="h-5 w-5 text-primary" />
                  業務タイプ別割合
                </CardTitle>
                <CardDescription>全業務におけるタイプ別の割合</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px] pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={taskTypeData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {taskTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        borderColor: "hsl(var(--border))",
                        borderRadius: "var(--radius)",
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: "12px" }} />
                  </RePieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-subtle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                部門別パフォーマンス
              </CardTitle>
              <CardDescription>各部門の獲得ポイント、完了業務数、売上</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <ReBarChart data={departmentPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--primary))" fontSize={12} />
                  <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--destructive))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      borderColor: "hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  <Bar
                    yAxisId="left"
                    dataKey="points"
                    name="ポイント"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="tasks"
                    name="完了業務数"
                    fill="hsl(var(--primary) / 0.6)"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="revenue"
                    name="売上 (円)"
                    fill="hsl(var(--destructive) / 0.7)"
                    radius={[4, 4, 0, 0]}
                  />
                </ReBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

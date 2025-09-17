"use client"

import Link from "next/link"
import { ArrowLeft, CalendarDays, CheckCircle, DollarSign, Edit, Mail, Phone, Star, Target, Trophy } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data - in a real app, this would come from a database
const employeeData = {
  id: "1",
  name: "田中 太郎",
  email: "taro.tanaka@example.com",
  phone: "090-1234-5678",
  department: "害虫駆除",
  position: "シニアテクニシャン",
  joinDate: "2020-04-01",
  avatarUrl: "/placeholder.svg?height=128&width=128",
  performance: {
    points: 1250,
    targetPoints: 1500,
    tasksCompleted: 125,
    targetTasks: 150,
    commission: 187500,
    rank: 1,
    rating: 4.5, // 5段階評価
  },
  recentTasks: [
    { id: "t1", title: "オフィスビルA 害虫駆除", date: "2025-05-29", points: 15, status: "完了" },
    { id: "t2", title: "レストランB 定期点検", date: "2025-05-25", points: 10, status: "完了" },
    { id: "t3", title: "住宅C 緊急対応", date: "2025-05-22", points: 20, status: "完了" },
  ],
  commissionHistory: [
    { month: "2025年5月", amount: 187500, tasks: 125 },
    { month: "2025年4月", amount: 150000, tasks: 100 },
    { month: "2025年3月", amount: 165000, tasks: 110 },
  ],
}

export default function EmployeeProfilePage({ params }: { params: { id: string } }) {
  // In a real app, fetch employee data based on params.id
  const employee = employeeData

  if (!employee) {
    return <div>社員が見つかりません。</div>
  }

  const pointsProgress = (employee.performance.points / employee.performance.targetPoints) * 100
  const tasksProgress = (employee.performance.tasksCompleted / employee.performance.targetTasks) * 100

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      {/* Simplified Header for profile page */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
        <Button variant="outline" size="icon" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">戻る</span>
          </Link>
        </Button>
        <h1 className="text-xl font-semibold">社員プロフィール</h1>
      </header>

      <main className="flex-1 space-y-6 p-4 md:p-6 lg:p-8">
        <Card>
          <CardHeader className="flex flex-col items-center gap-4 sm:flex-row">
            <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-primary">
              <AvatarImage src={employee.avatarUrl || "/placeholder.svg"} alt={employee.name} />
              <AvatarFallback className="text-4xl">{employee.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <CardTitle className="text-3xl">{employee.name}</CardTitle>
              <CardDescription className="text-lg">{employee.position}</CardDescription>
              <Badge variant={employee.department === "害虫駆除" ? "destructive" : "secondary"} className="mt-2">
                {employee.department}
              </Badge>
              <div className="mt-2 flex items-center justify-center sm:justify-start gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(employee.performance.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
                <span className="ml-1 text-sm text-muted-foreground">({employee.performance.rating.toFixed(1)})</span>
              </div>
            </div>
            <Button variant="outline" size="icon" className="ml-auto hidden sm:inline-flex">
              <Edit className="h-4 w-4" />
              <span className="sr-only">編集</span>
            </Button>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2 md:grid-cols-3">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{employee.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{employee.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <span>入社日: {employee.joinDate}</span>
            </div>
            <Button variant="outline" size="sm" className="sm:hidden mt-2 w-full">
              <Edit className="mr-2 h-4 w-4" />
              プロフィール編集
            </Button>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                業績ハイライト (今月)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="mb-1 flex justify-between text-sm">
                  <span>ポイント</span>
                  <span>
                    {employee.performance.points.toLocaleString()} /{" "}
                    {employee.performance.targetPoints.toLocaleString()}
                  </span>
                </div>
                <Progress value={pointsProgress} aria-label={`${pointsProgress}% ポイント達成`} />
              </div>
              <div>
                <div className="mb-1 flex justify-between text-sm">
                  <span>完了業務数</span>
                  <span>
                    {employee.performance.tasksCompleted} / {employee.performance.targetTasks}
                  </span>
                </div>
                <Progress value={tasksProgress} className="bg-green-500" aria-label={`${tasksProgress}% 業務達成`} />
              </div>
              <div className="flex items-center justify-between rounded-md bg-green-50 p-3">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-6 w-6 text-green-600" />
                  <span className="text-lg font-semibold text-green-700">
                    ¥{employee.performance.commission.toLocaleString()}
                  </span>
                </div>
                <span className="text-sm text-green-600">今月の報酬</span>
              </div>
              <p className="text-sm text-muted-foreground">現在のランキング: {employee.performance.rank}位</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-500" />
                目標設定
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <p>月間目標ポイント:</p>
                <Badge variant="outline">{employee.performance.targetPoints.toLocaleString()} pts</Badge>
              </div>
              <div className="flex items-center justify-between">
                <p>月間目標業務数:</p>
                <Badge variant="outline">{employee.performance.targetTasks} 件</Badge>
              </div>
              <Button variant="outline" className="w-full mt-2">
                目標を更新
              </Button>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="recentTasks">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="recentTasks">最近の業務</TabsTrigger>
            <TabsTrigger value="commissionHistory">報酬履歴</TabsTrigger>
          </TabsList>
          <TabsContent value="recentTasks" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>最近の担当業務</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>業務名</TableHead>
                        <TableHead>完了日</TableHead>
                        <TableHead>ポイント</TableHead>
                        <TableHead>状態</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {employee.recentTasks.map((task) => (
                        <TableRow key={task.id}>
                          <TableCell className="font-medium">{task.title}</TableCell>
                          <TableCell>{task.date}</TableCell>
                          <TableCell>{task.points}</TableCell>
                          <TableCell>
                            <Badge
                              variant={task.status === "完了" ? "default" : "outline"}
                              className={task.status === "完了" ? "bg-green-100 text-green-700 border-green-300" : ""}
                            >
                              {task.status === "完了" && <CheckCircle className="mr-1 h-3 w-3" />}
                              {task.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="commissionHistory" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>報酬履歴</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>月</TableHead>
                        <TableHead>完了業務数</TableHead>
                        <TableHead className="text-right">報酬金額</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {employee.commissionHistory.map((record) => (
                        <TableRow key={record.month}>
                          <TableCell className="font-medium">{record.month}</TableCell>
                          <TableCell>{record.tasks}</TableCell>
                          <TableCell className="text-right">¥{record.amount.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

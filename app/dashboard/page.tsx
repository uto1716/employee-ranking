"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import {
  Bell,
  Award,
  DollarSign,
  Briefcase,
  Users,
  ClipboardList,
  LineChart,
  Home,
  Settings,
  ChevronLeft,
  ChevronRight,
  PlusCircle,
  Search,
  Megaphone,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmployeeRankingTable } from "@/components/employee-ranking-table"
import { RecentTasks } from "@/components/recent-tasks"
import { TaskNotifications } from "@/components/task-notifications"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const { data: session, status } = useSession()

  const handleLogout = () => {
    signOut({ callbackUrl: '/auth/signin' })
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
      {isSidebarOpen && (
        <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r bg-card sm:flex">
          <div className="flex h-16 items-center border-b px-6">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary">
              <Megaphone className="h-7 w-7" />
              <span>エンタ</span>
            </Link>
          </div>
          <nav className="flex-1 space-y-1.5 p-4">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2.5 text-primary font-medium transition-all hover:bg-primary/20"
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
              <span className="sr-only">Toggle sidebar</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:inline-flex text-muted-foreground"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              <span className="sr-only">Toggle sidebar</span>
            </Button>
            <div className="relative flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="全体検索..."
                className="w-full rounded-lg bg-muted pl-8 md:w-[280px] lg:w-[380px] focus:shadow-focus"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full text-muted-foreground hover:text-primary"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-0 top-0 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              <span className="sr-only">通知</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9 border-2 border-transparent hover:border-primary transition-colors">
                    <AvatarImage src="/placeholder.svg?height=36&width=36" alt="User" />
                    <AvatarFallback>
                      {session?.user?.name ? session.user.name.charAt(0).toUpperCase() : 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <p className="text-sm font-bold leading-none">
                    {session?.user?.name || 'ユーザー'}
                  </p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>プロフィール</DropdownMenuItem>
                <DropdownMenuItem>設定</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>ログアウト</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 space-y-6 p-2 sm:p-4 md:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h1 className="text-3xl font-bold tracking-tight">ダッシュボード</h1>
            <Button size="lg" className="shadow-sm hover:shadow-md transition-shadow">
              <PlusCircle className="mr-2 h-5 w-5" />
              新規業務作成
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="shadow-subtle hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">総業務件数 (今月)</CardTitle>
                <Briefcase className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1,248</div>
                <p className="text-xs text-green-600">+12.5% 先月比</p>
              </CardContent>
            </Card>
            <Card className="shadow-subtle hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">総売上金額 (今月)</CardTitle>
                <DollarSign className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">¥3,456,789</div>
                <p className="text-xs text-green-600">+8.2% 先月比</p>
              </CardContent>
            </Card>
            <Card className="shadow-subtle hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">トップ社員 (今月)</CardTitle>
                <Award className="h-5 w-5 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">田中 太郎</div>
                <p className="text-xs text-muted-foreground">ポイント: 1,250</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="ranking" className="mt-6">
            <TabsList className="flex flex-row space-x-1 rounded-md bg-muted p-1 text-muted-foreground mb-4 overflow-x-auto">
              <TabsTrigger
                value="ranking"
                className="flex-shrink-0 justify-center whitespace-nowrap rounded-sm px-3 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
              >
                社員ランキング
              </TabsTrigger>
              <TabsTrigger
                value="tasks"
                className="flex-shrink-0 justify-center whitespace-nowrap rounded-sm px-3 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
              >
                最近の業務
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="flex-shrink-0 justify-center whitespace-nowrap rounded-sm px-3 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
              >
                新着案件通知
              </TabsTrigger>
            </TabsList>
            <TabsContent value="ranking" className="mt-2">
              {" "}
              {/* Reduced margin for content when tabs are stacked */}
              <Card className="shadow-subtle">
                <CardHeader>
                  <CardTitle>社員ランキング</CardTitle>
                  <CardDescription>
                    業務達成度に基づく社員のランキングです。クリックして社員詳細を確認できます。
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <EmployeeRankingTable />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="tasks" className="mt-2">
              <Card className="shadow-subtle">
                <CardHeader>
                  <CardTitle>最近の業務</CardTitle>
                  <CardDescription>最近完了または進行中の業務の一覧です。</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentTasks />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="notifications" className="mt-2">
              <Card className="shadow-subtle">
                <CardHeader>
                  <CardTitle>新着案件通知</CardTitle>
                  <CardDescription>新しく登録された案件や重要な更新の通知です。</CardDescription>
                </CardHeader>
                <CardContent>
                  <TaskNotifications />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

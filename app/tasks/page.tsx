"use client"

import Link from "next/link"
import { Briefcase, PlusCircle, Users, Home, ClipboardList, LineChart, Settings, Search, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TaskList } from "@/components/task-list"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

export default function TasksPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [typeFilter, setTypeFilter] = useState<string | null>(null)

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      {isSidebarOpen && (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-60 flex-col border-r bg-background sm:flex">
          <div className="flex h-16 items-center border-b px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Briefcase className="h-6 w-6 text-green-600" />
              <span>社員システム</span>
            </Link>
          </div>
          <nav className="flex-1 space-y-1 p-4">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Home className="h-4 w-4" />
              ダッシュボード
            </Link>
            <Link
              href="/tasks"
              className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
            >
              <ClipboardList className="h-4 w-4" />
              業務管理
            </Link>
            <Link
              href="/employees"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Users className="h-4 w-4" />
              社員一覧
            </Link>
            <Link
              href="/reports"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <LineChart className="h-4 w-4" />
              レポート
            </Link>
          </nav>
          <div className="mt-auto p-4">
            <Link
              href="/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Settings className="h-4 w-4" />
              設定
            </Link>
          </div>
        </aside>
      )}

      <div className={`flex flex-1 flex-col ${isSidebarOpen ? "sm:pl-60" : ""}`}>
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 sm:px-6">
          {/* Header content similar to dashboard */}
          <div className="flex items-center gap-2">{/* Toggle button for sidebar */}</div>
          <div className="flex items-center gap-4">{/* User menu, notifications etc. */}</div>
        </header>

        <main className="flex-1 space-y-6 p-4 md:p-6 lg:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl font-semibold">業務管理</h1>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="業務名で検索..." className="pl-8 w-full sm:w-auto" />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="shrink-0 w-full sm:w-auto">
                    <Filter className="mr-2 h-4 w-4" />
                    フィルター
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuLabel>ステータス</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={statusFilter === null}
                    onCheckedChange={() => setStatusFilter(null)}
                  >
                    全て
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={statusFilter === "未完了"}
                    onCheckedChange={() => setStatusFilter("未完了")}
                  >
                    未完了
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={statusFilter === "完了"}
                    onCheckedChange={() => setStatusFilter("完了")}
                  >
                    完了
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuLabel>種類</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked={typeFilter === null} onCheckedChange={() => setTypeFilter(null)}>
                    全て
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={typeFilter === "害虫駆除"}
                    onCheckedChange={() => setTypeFilter("害虫駆除")}
                  >
                    害虫駆除
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={typeFilter === "清掃"}
                    onCheckedChange={() => setTypeFilter("清掃")}
                  >
                    清掃
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button className="w-full sm:w-auto">
                <PlusCircle className="mr-2 h-4 w-4" />
                新規業務登録
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1 bg-muted p-1 rounded-lg">
              <TabsTrigger
                value="all"
                onClick={() => {
                  setStatusFilter(null)
                  setTypeFilter(null)
                }}
              >
                すべての業務
              </TabsTrigger>
              <TabsTrigger
                value="pest"
                onClick={() => {
                  setStatusFilter(null)
                  setTypeFilter("害虫駆除")
                }}
              >
                害虫駆除
              </TabsTrigger>
              <TabsTrigger
                value="cleaning"
                onClick={() => {
                  setStatusFilter(null)
                  setTypeFilter("清掃")
                }}
              >
                清掃
              </TabsTrigger>
              <TabsTrigger
                value="pending"
                onClick={() => {
                  setStatusFilter("未完了")
                  setTypeFilter(null)
                }}
              >
                未完了
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                onClick={() => {
                  setStatusFilter("完了")
                  setTypeFilter(null)
                }}
              >
                完了済み
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>すべての業務</CardTitle>
                  <CardDescription>登録されているすべての業務の一覧です</CardDescription>
                </CardHeader>
                <CardContent>
                  <TaskList status={statusFilter} type={typeFilter} />
                </CardContent>
              </Card>
            </TabsContent>
            {/* Other TabsContent will dynamically use TaskList with filters */}
            <TabsContent value="pest" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>害虫駆除業務</CardTitle>
                  <CardDescription>害虫駆除に関する業務の一覧です</CardDescription>
                </CardHeader>
                <CardContent>
                  <TaskList type="害虫駆除" status={statusFilter} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="cleaning" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>清掃業務</CardTitle>
                  <CardDescription>清掃に関する業務の一覧です</CardDescription>
                </CardHeader>
                <CardContent>
                  <TaskList type="清掃" status={statusFilter} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="pending" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>未完了業務</CardTitle>
                  <CardDescription>未完了の業務の一覧です</CardDescription>
                </CardHeader>
                <CardContent>
                  <TaskList status="未完了" type={typeFilter} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="completed" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>完了済み業務</CardTitle>
                  <CardDescription>完了済みの業務の一覧です</CardDescription>
                </CardHeader>
                <CardContent>
                  <TaskList status="完了" type={typeFilter} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

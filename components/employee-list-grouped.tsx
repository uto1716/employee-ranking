"use client"

import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ChevronRight, Users } from "lucide-react"

type Employee = {
  id: string
  name: string
  department: string
  points: number
  avatarUrl?: string
  position?: string
}

interface EmployeeListGroupedProps {
  employees: Employee[]
}

export function EmployeeListGrouped({ employees }: EmployeeListGroupedProps) {
  const groupedEmployees = employees.reduce(
    (acc, employee) => {
      const { department } = employee
      if (!acc[department]) {
        acc[department] = []
      }
      acc[department].push(employee)
      // Sort employees within each department by points descending
      acc[department].sort((a, b) => b.points - a.points)
      return acc
    },
    {} as Record<string, Employee[]>,
  )

  const departments = Object.keys(groupedEmployees).sort() // Sort department names alphabetically

  if (employees.length === 0) {
    return <p className="text-muted-foreground text-center py-8">該当する社員が見つかりません。</p>
  }

  return (
    <Accordion type="multiple" defaultValue={departments} className="w-full space-y-4">
      {departments.map((department) => (
        <AccordionItem value={department} key={department} className="border rounded-lg shadow-subtle bg-card">
          <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50 rounded-t-lg data-[state=open]:border-b">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">
                {department} ({groupedEmployees[department].length}名)
              </h3>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-2 pt-0 pb-2">
            <div className="divide-y">
              {groupedEmployees[department].map((employee, index) => (
                <Link
                  href={`/employees/${employee.id}`}
                  key={employee.id}
                  className="block hover:bg-muted/30 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-2 sm:gap-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10 border">
                        <AvatarImage
                          src={employee.avatarUrl || `/placeholder.svg?height=40&width=40&query=${employee.name}`}
                          alt={employee.name}
                        />
                        <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{employee.name}</p>
                        <p className="text-sm text-muted-foreground">{employee.position || "役職未設定"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4 self-end sm:self-center">
                      <Badge variant="outline" className="text-sm">
                        {employee.points.toLocaleString()} pts
                      </Badge>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Building2, User, Megaphone, ArrowRight } from 'lucide-react'

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-2">
              <Megaphone className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">エンタ</span>
            </div>
          </div>
          <CardTitle className="text-3xl text-gray-900">ログイン方法を選択</CardTitle>
          <CardDescription className="text-gray-600">
            ご利用のアカウントタイプを選択してログインしてください
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Corporate Login */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-500 bg-white">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                    <Building2 className="h-12 w-12 text-blue-600" />
                  </div>
                </div>
                <CardTitle className="text-xl text-gray-900">企業・広告主</CardTitle>
                <CardDescription className="text-gray-600">
                  商品・サービスを宣伝したい企業様
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href="/auth/corporate/login" className="block w-full">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 group-hover:scale-105 transition-transform">
                    企業ログイン
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <p className="text-xs text-center text-gray-500">
                  <Link href="/auth/corporate/register" className="text-blue-600 hover:underline">
                    企業登録はこちら
                  </Link>
                </p>
              </CardContent>
            </Card>

            {/* Personal Login */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-green-500 bg-white">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-green-100 rounded-full group-hover:bg-green-200 transition-colors">
                    <User className="h-12 w-12 text-green-600" />
                  </div>
                </div>
                <CardTitle className="text-xl text-gray-900">個人・アフィリエイター</CardTitle>
                <CardDescription className="text-gray-600">
                  商品を紹介して収益を得たい方
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href="/auth/personal/login" className="block w-full">
                  <Button className="w-full bg-green-600 hover:green-700 group-hover:scale-105 transition-transform">
                    個人ログイン
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <p className="text-xs text-center text-gray-500">
                  <Link href="/auth/personal/register" className="text-green-600 hover:underline">
                    個人登録はこちら
                  </Link>
                </p>
              </CardContent>
            </Card>
          </div>

        </CardContent>
      </Card>
    </div>
  )
}
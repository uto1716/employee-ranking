'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Building2, User, Megaphone, ArrowRight, TrendingUp, Shield, Zap } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Megaphone className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">エンタ</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="block sm:inline">アフィリエイト</span>
            <span className="text-blue-600">広告</span>
            <span className="inline">サービス</span>
          </h1>

          {/* Login Type Selection */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            {/* Corporate Login */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-blue-500 bg-white">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                    <Building2 className="h-12 w-12 text-blue-600" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-gray-900">企業・広告主</CardTitle>
                <CardDescription className="text-gray-600">
                  商品・サービスを宣伝したい企業様
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                    <span>成果報酬型広告の配信</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <span>詳細な成果レポート</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-blue-600" />
                    <span>リアルタイム分析</span>
                  </div>
                </div>
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
            <Card className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-green-500 bg-white">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-green-100 rounded-full group-hover:bg-green-200 transition-colors">
                    <User className="h-12 w-12 text-green-600" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-gray-900">個人・アフィリエイター</CardTitle>
                <CardDescription className="text-gray-600">
                  商品を紹介して収益を得たい方
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span>豊富な商品ラインナップ</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span>透明な収益レポート</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-green-600" />
                    <span>即座に始められる</span>
                  </div>
                </div>
                <Link href="/auth/personal/login" className="block w-full">
                  <Button className="w-full bg-green-600 hover:bg-green-700 group-hover:scale-105 transition-transform">
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
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            なぜエンタが選ばれるのか
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="p-4 bg-blue-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">高い成果率</h3>
              <p className="text-gray-600">
                独自のマッチングアルゴリズムで、企業とアフィリエイターの最適な組み合わせを実現
              </p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">安心・安全</h3>
              <p className="text-gray-600">
                厳格な審査プロセスと透明な取引システムで、安心してご利用いただけます
              </p>
            </div>
            <div className="text-center">
              <div className="p-4 bg-purple-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">簡単スタート</h3>
              <p className="text-gray-600">
                直感的なインターフェースで、初心者でもすぐにアフィリエイトを始められます
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Megaphone className="h-6 w-6" />
            <span className="text-xl font-bold">エンタ</span>
          </div>
          <p className="text-gray-400">
            © 2024 エンタ. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
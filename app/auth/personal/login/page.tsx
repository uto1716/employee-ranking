'use client'

import { useState } from 'react'
import { signIn, getSession, signOut } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { User, Loader2 } from 'lucide-react'

export default function PersonalLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('メールアドレスまたはパスワードが正しくありません')
      } else {
        const session = await getSession()
        if (session?.user) {
          // Check if user is personal type
          const userType = (session.user as any)?.user_type
          if (userType === 'personal' || userType === 'admin') {
            router.push(callbackUrl)
            router.refresh()
          } else {
            setError('個人アカウントでログインしてください')
            await signOut()
          }
        }
      }
    } catch (error) {
      setError('ログイン中にエラーが発生しました')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-2">
              <User className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-900">エンタ</span>
            </div>
          </div>
          <CardTitle className="text-2xl text-gray-900">個人ログイン</CardTitle>
          <CardDescription className="text-gray-600">
            アフィリエイター向けログインページ
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                placeholder="your@example.com"
                className="focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">パスワード</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                placeholder="パスワードを入力"
                className="focus:border-green-500 focus:ring-green-500"
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ログイン中...
                </>
              ) : (
                'アフィリエイトダッシュボードにログイン'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-4">
            <p className="text-sm text-gray-600">
              アカウントをお持ちでないですか？{' '}
              <Link href="/auth/personal/register" className="text-green-600 hover:underline font-medium">
                個人登録
              </Link>
            </p>

            <div className="border-t pt-4">
              <p className="text-sm text-gray-500 mb-2">企業の方はこちら</p>
              <Link
                href="/auth/corporate/login"
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                企業ログインページ
              </Link>
            </div>

            <div className="p-3 bg-green-50 rounded-lg text-sm text-gray-700 border border-green-200">
              <p className="font-medium mb-1">アフィリエイト収益確認・管理</p>
              <p>成果報酬の詳細確認やアフィリエイトリンクの管理ができます</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
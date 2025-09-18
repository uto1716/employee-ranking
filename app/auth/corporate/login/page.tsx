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
import { Building2, Loader2 } from 'lucide-react'

export default function CorporateLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/corporate/dashboard'

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
          // Check if user is corporate type
          const userType = (session.user as any)?.user_type
          if (userType === 'corporate' || userType === 'admin') {
            router.push(callbackUrl)
            router.refresh()
          } else {
            setError('企業アカウントでログインしてください')
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">エンタ</span>
            </div>
          </div>
          <CardTitle className="text-2xl text-gray-900">企業ログイン</CardTitle>
          <CardDescription className="text-gray-600">
            広告主企業向けログインページ
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">企業メールアドレス</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                placeholder="company@example.com"
                className="focus:border-blue-500 focus:ring-blue-500"
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
                className="focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ログイン中...
                </>
              ) : (
                '企業ダッシュボードにログイン'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-4">
            <p className="text-sm text-gray-600">
              企業アカウントをお持ちでないですか？{' '}
              <Link href="/auth/corporate/register" className="text-blue-600 hover:underline font-medium">
                企業登録
              </Link>
            </p>

            <div className="border-t pt-4">
              <p className="text-sm text-gray-500 mb-2">アフィリエイターの方はこちら</p>
              <Link
                href="/auth/personal/login"
                className="text-green-600 hover:underline text-sm font-medium"
              >
                個人ログインページ
              </Link>
            </div>

            <div className="p-3 bg-blue-50 rounded-lg text-sm text-gray-700 border border-blue-200">
              <p className="font-medium mb-1">デモ企業アカウント:</p>
              <p>Email: admin@example.com</p>
              <p>Password: admin123</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
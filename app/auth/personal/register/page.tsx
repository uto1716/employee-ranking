'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { User, Loader2, CheckCircle } from 'lucide-react'

export default function PersonalRegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    website: '',
    socialMedia: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('お名前を入力してください')
      return false
    }
    if (!formData.email.trim()) {
      setError('メールアドレスを入力してください')
      return false
    }
    if (!formData.password) {
      setError('パスワードを入力してください')
      return false
    }
    if (formData.password.length < 6) {
      setError('パスワードは6文字以上で入力してください')
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError('パスワードが一致しません')
      return false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('有効なメールアドレスを入力してください')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!validateForm()) {
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          user_type: 'personal',
          nickname: formData.nickname.trim(),
          website: formData.website.trim(),
          social_media: formData.socialMedia.trim()
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'アフィリエイター登録に失敗しました')
        return
      }

      setSuccess(true)
      setTimeout(() => {
        router.push('/auth/personal/login?message=registration-success')
      }, 2000)

    } catch (error) {
      console.error('Personal registration error:', error)
      setError('アフィリエイター登録中にエラーが発生しました')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError('')
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl text-green-700">アフィリエイター登録完了</CardTitle>
            <CardDescription>
              アフィリエイターアカウントが正常に作成されました。ログインページに移動します...
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
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
          <CardTitle className="text-2xl text-gray-900">アフィリエイター登録</CardTitle>
          <CardDescription className="text-gray-600">
            個人向け新規アカウント作成
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">お名前 *</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
                disabled={loading}
                placeholder="山田 太郎"
                className="focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nickname">ニックネーム</Label>
              <Input
                id="nickname"
                type="text"
                value={formData.nickname}
                onChange={(e) => handleInputChange('nickname', e.target.value)}
                disabled={loading}
                placeholder="やまだん"
                className="focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">メールアドレス *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                disabled={loading}
                placeholder="yamada@example.com"
                className="focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">ブログ・ウェブサイト</Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                disabled={loading}
                placeholder="https://myblog.com"
                className="focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="socialMedia">SNSアカウント</Label>
              <Input
                id="socialMedia"
                type="text"
                value={formData.socialMedia}
                onChange={(e) => handleInputChange('socialMedia', e.target.value)}
                disabled={loading}
                placeholder="@yamada_blog"
                className="focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">パスワード *</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                required
                disabled={loading}
                placeholder="6文字以上のパスワード"
                className="focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">パスワード（確認）*</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                required
                disabled={loading}
                placeholder="パスワードを再入力"
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
                  アフィリエイター登録中...
                </>
              ) : (
                'アフィリエイターアカウント作成'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-4">
            <p className="text-sm text-gray-600">
              既にアカウントをお持ちですか？{' '}
              <Link href="/auth/personal/login" className="text-green-600 hover:underline font-medium">
                個人ログイン
              </Link>
            </p>

            <div className="border-t pt-4">
              <p className="text-sm text-gray-500 mb-2">企業の方はこちら</p>
              <Link
                href="/auth/corporate/register"
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                企業登録ページ
              </Link>
            </div>

            <div className="p-3 bg-green-50 rounded-lg text-sm text-gray-700 border border-green-200">
              <p className="font-medium mb-1">アフィリエイターの特典:</p>
              <p>・豊富な商品ラインナップ</p>
              <p>・透明な収益レポート</p>
              <p>・即座に始められる簡単設定</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
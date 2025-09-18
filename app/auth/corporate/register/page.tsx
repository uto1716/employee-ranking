'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Building2, Loader2, CheckCircle } from 'lucide-react'

export default function CorporateRegisterPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    representative: '',
    email: '',
    password: '',
    confirmPassword: '',
    businessType: '',
    website: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const validateForm = () => {
    if (!formData.companyName.trim()) {
      setError('会社名を入力してください')
      return false
    }
    if (!formData.representative.trim()) {
      setError('代表者名を入力してください')
      return false
    }
    if (!formData.email.trim()) {
      setError('企業メールアドレスを入力してください')
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
          name: formData.companyName.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          user_type: 'corporate',
          representative: formData.representative.trim(),
          business_type: formData.businessType.trim(),
          website: formData.website.trim()
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || '企業登録に失敗しました')
        return
      }

      setSuccess(true)
      setTimeout(() => {
        router.push('/auth/corporate/login?message=registration-success')
      }, 2000)

    } catch (error) {
      console.error('Corporate registration error:', error)
      setError('企業登録中にエラーが発生しました')
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl text-green-700">企業登録完了</CardTitle>
            <CardDescription>
              企業アカウントが正常に作成されました。ログインページに移動します...
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
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
          <CardTitle className="text-2xl text-gray-900">企業登録</CardTitle>
          <CardDescription className="text-gray-600">
            広告主企業向け新規アカウント作成
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">会社名 *</Label>
              <Input
                id="companyName"
                type="text"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                required
                disabled={loading}
                placeholder="株式会社○○"
                className="focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="representative">代表者名 *</Label>
              <Input
                id="representative"
                type="text"
                value={formData.representative}
                onChange={(e) => handleInputChange('representative', e.target.value)}
                required
                disabled={loading}
                placeholder="山田 太郎"
                className="focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">企業メールアドレス *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                disabled={loading}
                placeholder="contact@company.com"
                className="focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessType">事業内容</Label>
              <Input
                id="businessType"
                type="text"
                value={formData.businessType}
                onChange={(e) => handleInputChange('businessType', e.target.value)}
                disabled={loading}
                placeholder="EC事業、SaaS開発など"
                className="focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">企業ウェブサイト</Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                disabled={loading}
                placeholder="https://company.com"
                className="focus:border-blue-500 focus:ring-blue-500"
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
                className="focus:border-blue-500 focus:ring-blue-500"
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
                  企業登録中...
                </>
              ) : (
                '企業アカウント作成'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-4">
            <p className="text-sm text-gray-600">
              既に企業アカウントをお持ちですか？{' '}
              <Link href="/auth/corporate/login" className="text-blue-600 hover:underline font-medium">
                企業ログイン
              </Link>
            </p>

            <div className="border-t pt-4">
              <p className="text-sm text-gray-500 mb-2">アフィリエイターの方はこちら</p>
              <Link
                href="/auth/personal/register"
                className="text-green-600 hover:underline text-sm font-medium"
              >
                個人登録ページ
              </Link>
            </div>

            <div className="p-3 bg-blue-50 rounded-lg text-sm text-gray-700 border border-blue-200">
              <p className="font-medium mb-1">企業向けサービス:</p>
              <p>・アフィリエイト広告の配信</p>
              <p>・詳細な成果レポート</p>
              <p>・リアルタイム分析ダッシュボード</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
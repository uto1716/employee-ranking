import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      email,
      password,
      user_type = 'personal',
      representative,
      business_type,
      website,
      nickname,
      social_media
    } = body

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'すべての項目を入力してください' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'パスワードは6文字以上で入力してください' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: '有効なメールアドレスを入力してください' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', email.toLowerCase())
      .single()

    if (existingUser) {
      return NextResponse.json(
        { error: 'このメールアドレスは既に使用されています' },
        { status: 409 }
      )
    }

    // Hash password
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Create user in database
    // Note: Using only existing columns for now until database is updated
    const userData: any = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password_hash: hashedPassword,
      role: 'user', // Default role for new users
    }

    // Store user_type and additional info in name field temporarily
    // Format: "Company Name [CORPORATE]" or "User Name [PERSONAL]"
    if (user_type === 'corporate') {
      userData.name = `${name.trim()} [CORPORATE]`
    } else {
      userData.name = `${name.trim()} [PERSONAL]`
    }

    const { data: newUser, error: createError } = await supabaseAdmin
      .from('users')
      .insert(userData)
      .select()
      .single()

    if (createError) {
      console.error('Database error:', createError)
      return NextResponse.json(
        { error: 'ユーザー作成に失敗しました' },
        { status: 500 }
      )
    }

    // Return success (without password hash)
    const { password_hash, ...userWithoutPassword } = newUser

    return NextResponse.json(
      {
        message: 'ユーザーが正常に作成されました',
        user: userWithoutPassword
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: '登録中にエラーが発生しました' },
      { status: 500 }
    )
  }
}
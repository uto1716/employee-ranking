import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'

// Environment variable checker
function required(name: string) {
  const v = process.env[name];
  if (!v) {
    console.error(`Missing env: ${name}`);
    throw new Error(`Missing env: ${name}`);
  }
  return v;
}

// Initialize Supabase admin client with environment variables
const supabaseAdmin = createClient(
  required('NEXT_PUBLIC_SUPABASE_URL'),
  required('SUPABASE_SERVICE_ROLE_KEY')
)

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // Check if user exists in Supabase
          const { data: user, error } = await supabaseAdmin
            .from('users')
            .select('*')
            .eq('email', credentials.email)
            .single()

          if (error || !user) {
            return null
          }

          // Check password
          let isValidPassword = false

          if (user.password_hash) {
            // Verify hashed password for new users
            isValidPassword = await bcrypt.compare(credentials.password, user.password_hash)
          } else {
            // Fallback for admin account without hashed password (demo)
            isValidPassword = credentials.password === 'admin123' && user.role === 'admin'
          }

          if (isValidPassword) {
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
              user_type: user.user_type,
            }
          }

          return null
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
        token.user_type = (user as any).user_type
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role
        (session.user as any).user_type = token.user_type
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/login',
  },
  session: {
    strategy: 'jwt',
  },
}
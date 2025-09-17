import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl

        // Public routes that don't require authentication
        const publicRoutes = ['/auth/login', '/auth/register']

        if (publicRoutes.includes(pathname)) {
          return true
        }

        // All other routes require authentication
        return !!token
      },
    },
  }
)

export const config = {
  matcher: [
    // Match all routes except static files, API routes, and registration API
    '/((?!api/auth|api/auth/register|_next/static|_next/image|favicon.ico).*)',
  ],
}
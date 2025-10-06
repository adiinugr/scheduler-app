import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware() {
    // Add any additional middleware logic here
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to public pages
        if (
          req.nextUrl.pathname.startsWith("/login") ||
          req.nextUrl.pathname.startsWith("/register") ||
          req.nextUrl.pathname === "/"
        ) {
          return true
        }

        // Require authentication for dashboard and API routes
        if (
          req.nextUrl.pathname.startsWith("/dashboard") ||
          req.nextUrl.pathname.startsWith("/api/tasks")
        ) {
          return !!token
        }

        return true
      }
    }
  }
)

export const config = {
  matcher: ["/dashboard/:path*", "/api/tasks/:path*"]
}

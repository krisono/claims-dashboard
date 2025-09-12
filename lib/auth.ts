import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env['GOOGLE_CLIENT_ID'] || '',
      clientSecret: process.env['GOOGLE_CLIENT_SECRET'] || '',
    }),
    GitHubProvider({
      clientId: process.env['GITHUB_ID'] || '',
      clientSecret: process.env['GITHUB_SECRET'] || '',
    }),
    CredentialsProvider({
      id: 'demo',
      name: 'Demo Login',
      credentials: {
        role: {
          label: 'Role',
          type: 'select',
        },
      },
      async authorize(credentials) {
        if (!credentials?.role) return null

        const demoUsers: Record<string, any> = {
          admin: {
            id: 'demo-admin',
            name: 'Admin User',
            email: 'admin@demo.com',
            role: 'ADMIN',
            image: null,
          },
          manager: {
            id: 'demo-manager',
            name: 'Claims Manager',
            email: 'manager@demo.com',
            role: 'MANAGER',
            image: null,
          },
          adjuster: {
            id: 'demo-adjuster',
            name: 'Claims Adjuster',
            email: 'adjuster@demo.com',
            role: 'ADJUSTER',
            image: null,
          },
          investigator: {
            id: 'demo-investigator',
            name: 'Investigator',
            email: 'investigator@demo.com',
            role: 'INVESTIGATOR',
            image: null,
          },
        }

        const user = demoUsers[credentials.role]
        if (user) {
          return user
        }
        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.sub;
        (session.user as any).role = token.role;
      }
      return session
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  debug: process.env.NODE_ENV === 'development',
}

export default NextAuth(authOptions)

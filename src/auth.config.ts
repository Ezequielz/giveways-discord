import NextAuth, { type NextAuthConfig } from 'next-auth';
import DiscordProvider from "next-auth/providers/discord";
import credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from "@auth/prisma-adapter";
import { z } from 'zod';
import bcryptjs from 'bcryptjs';
import prisma from '@/lib/prisma';
import { Adapter } from 'next-auth/adapters';


export const authConfig: NextAuthConfig = {
  trustHost: true,
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register',
  },
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        if (!parsedCredentials.success) return null;
        const { email, password } = parsedCredentials.data;

        //buscar correo
        const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
        if (!user) return null;

        //comprar las password
        if (!bcryptjs.compareSync(password, user.password ?? '')) return null;

        // regresar el usuario sin el password
        const { password: _, ...rest } = user;

        return rest;
      },
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      // allowDangerousEmailAccountLinking: true,
      authorization:
      "https://discord.com/oauth2/authorize?client_id=1216875209450328236&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback%2Fdiscord&scope=identify+email+guilds+guilds.members.read",


    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials, }) {
      console.log({ user, account, profile,email, credentials, })
      const dbUser = await prisma.user.findUnique({ where: { email: user.email ?? 'no-email' } });
      if (dbUser?.isActive === false) {
        return '/auth/login?error=unauthorized'
      }
      if (dbUser && !dbUser?.image) {
        await prisma.user.update({
          where: {
            id: dbUser?.id
          },
          data: {
            image: user.image
          }
        })

      }

      return true
    },
    authorized({ auth, request: { nextUrl } }) {

      console.log({ auth })
      // const isLoggedIn = !!auth?.user;
      // const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      // if (isOnDashboard) {
      //     if (isLoggedIn) return true;
      //     return false; // Redirect unauthenticated users to login page
      // } else if (isLoggedIn) {
      //     return Response.redirect(new URL('/dashboard', nextUrl));
      // }
      return true;
    },
    async jwt({ token, user, account, profile, }) {
      if (account) {
        token.accessToken = account.access_token
        console.log(token.accessToken);
      }

      if (user) {
        token.data = user
      }
  
      return token
    },
    async session({ session, token, user }) {

      const data = {...token.data as any, token: token.accessToken  } 
      session.user = data;
     
      return session;
    },
  },
};


export const {
  signIn,
  signOut,
  auth,
  handlers
} = NextAuth(authConfig);
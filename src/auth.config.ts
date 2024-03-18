import NextAuth, { type NextAuthConfig } from 'next-auth';
import DiscordProvider from "next-auth/providers/discord";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from '@/lib/prisma';
import { Adapter } from 'next-auth/adapters';
import { Role } from '@prisma/client';


export const authConfig: NextAuthConfig = {
  trustHost: true,
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      // allowDangerousEmailAccountLinking: true,
      authorization: `https://discord.com/oauth2/authorize?client_id=${ process.env.DISCORD_CLIENT_ID }&response_type=code&redirect_uri=${process.env.URL_REDIRECT}&scope=identify+email+guilds+guilds.members.read`

    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials, }) {
      // console.log({ user, account, profile,email, credentials, })
      const listOfAdmin = ['480218023551041557', '769004723553960046', '1214281739707621406', '1065670339759186051', '1119276827442171918']
      user.discordId = profile?.id ?? '';
      if (listOfAdmin.includes(user.discordId)) {
        user.role = Role.admin
      }
      
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
        // console.log(token.accessToken);
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
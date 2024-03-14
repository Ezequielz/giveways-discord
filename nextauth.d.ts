import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
    interface User {
        id: string;
        name: string;
        email: string;
   
        discordId: string;
        emailVerified?: boolean;
        role: string;
        image?: string
    }
    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            token:string;
            emailVerified?: boolean;
            role: string;
            image?: string
        } & DefaultSession['user']
    }
}
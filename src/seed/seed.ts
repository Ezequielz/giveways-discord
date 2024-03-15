
import { Role } from '@prisma/client';

export interface SeedUser {
    name: string;
    email: string;
    emailVerified?: Date;
    role?: Role;
    discordId: string;
    image?: string;
};

interface SeedData {
    users: SeedUser[];
};

export const initialData: SeedData = {
    users: [
        {
            name: 'Ezequiel Zapata',
            email: 'zapata.ed1989@gmail.com',
            discordId: '480218023551041557',
            role: Role.admin,
        }
    ],
}
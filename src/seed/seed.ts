import bcryptjs from 'bcryptjs';
import { Role } from '@prisma/client';

export interface SeedUser {
    name: string;
    email: string;
    emailVerified?: Date;
    role?: Role;
    password: string;
    image?: string;
};

interface SeedData {
    users: SeedUser[];
};

export const initialData: SeedData = {
    users: [
        {
            name: 'Usuario Uno',
            email: 'user1@gmail.com',
            password: bcryptjs.hashSync('123456'),
        },
        {
            name: 'Usuario Dos',
            email: 'user2@gmail.com',
            password: bcryptjs.hashSync('123456'),
        },
        {
            name: 'Admin',
            email: 'admin@gmail.com',
            password: bcryptjs.hashSync('123456'),
            role: Role.admin,
        }
    ],
}
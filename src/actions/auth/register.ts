'use server'
import { revalidatePath } from 'next/cache';
import bcryptjs from 'bcryptjs';
import prisma from '@/lib/prisma';

interface RegisterUser {
    name: string;
    email: string;
    password: string;
    image?: string | null;
}

export const registerUser = async( {
    name,
    email,
    password,
    image
}: RegisterUser) => {

    try {
        const user = await prisma.user.create({
            data: {
                name: name,
                email: email.toLowerCase(),
                password: bcryptjs.hashSync( password ),
                image: image,
            },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
            }
        });

        revalidatePath('/');
        revalidatePath('/auth');
        revalidatePath('/auth/register');
 
        return {
            ok: true,
            user: user,
            message: 'Usuario creado correctamente'
        }
        
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'No se pudo crear el usuario'
        }
    }
}
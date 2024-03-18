'use server'

import { auth } from "@/auth.config"
import { Role } from "@prisma/client"
import prisma from '@/lib/prisma';

export const getAllUsers = async () => {
    const session = await auth()

    if (session?.user.role !== Role.admin) {
        return {
            ok: false,
            error: 'No estás autorizado'
        }
    }

    try {


        const users = await prisma.user.findMany();

        
        if (!users) {
            return {
                ok: false,
                error: 'No se encontraron usuarios'
            }
        }

        return {
            ok: true,
            users: users,
        }


    } catch (error: any) {
        console.log(error)
        return {
            ok: false,
            message: error.message
        }
    }
}
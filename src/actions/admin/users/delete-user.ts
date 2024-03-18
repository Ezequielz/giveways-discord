'use server'

import { auth } from '@/auth.config'
import { Role } from '@prisma/client'
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';



export const deleteUser = async (id: string) => {
    const session = await auth()

    if (session?.user.role !== Role.admin) {
        return {
            ok: false,
            error: 'No estás autorizado para eliminar un usuario'
        }
    }

    try {


        const existUser = await prisma.user.findFirst({
            where: {
                id: id
            }
        });

        if (!existUser) {
            return {
                ok: false,
                error: 'No existe el usuario'
            }
        }

        await prisma.user.delete({
            where: {
                id: id
            }
        });



        revalidatePath('/giveways');

        return {
            ok: true,
        }


    } catch (error: any) {
        console.log(error)
        return {
            ok: false,
            message: error.message
        }
    }
}
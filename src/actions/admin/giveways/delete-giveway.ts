'use server'

import { auth } from '@/auth.config'
import { Role } from '@prisma/client'
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';



export const deleteGiveway = async (id: string) => {
    const session = await auth()

    if (session?.user.role !== Role.admin) {
        return {
            ok: false,
            error: 'No estás autorizado para eliminar un sorteo'
        }
    }

    try {


        const existGiveway = await prisma.giveway.findFirst({
            where: {
                id: id
            }
        });

        if (!existGiveway) {
            return {
                ok: false,
                error: 'No existe el sorteo'
            }
        }

        await prisma.giveway.delete({
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
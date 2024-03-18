'use server'

import { auth } from "@/auth.config"
import { Role } from "@prisma/client"
import prisma from '@/lib/prisma';
import { revalidatePath } from "next/cache";

export const deletePrize = async (prizeId: string, slug: string) => {


    const session = await auth()

    if (session?.user.role !== Role.admin) {
        return {
            ok: false,
            error: 'No estás autorizado para eliminar un premio'
        }
    }

    try {

        const giveway = await prisma.giveway.findFirst({
            where: {
                slug: slug
            }
        })

        if (!giveway) {
            return {
                ok: false,
                error: 'No existe el sorteo'
            }
        }

        const ezistPrize = await prisma.prize.findFirst({
            where: {
                id: prizeId,
                giveawayId: giveway?.id   
            
            },
            
        });
        if (!ezistPrize) {
            return {
                ok: false,
                error: 'El premio no existe'
            }
        }

        const prizedelete = await prisma.prize.delete({
            where: {
                id: prizeId,
            }
        });


        if (!prizedelete) {
            return {
                ok: false,
                error: 'No se pudo eliminar el premio'
            }
        }
        
        revalidatePath('/admin/')
        revalidatePath('/admin/dashboard')
        revalidatePath('/admin/dashboard/giveway')
        revalidatePath(`/admin/dashboard/giveway/${slug}`)

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
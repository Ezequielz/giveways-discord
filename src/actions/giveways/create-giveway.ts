'use server'

import { auth } from "@/auth.config"
import { Giveway, Role } from "@prisma/client"
import prisma from '@/lib/prisma';
import { revalidatePath } from "next/cache";



export const createGiveway = async (giveway: Giveway) => {
    const session = await auth()

    if (session?.user.role !== Role.admin) {
        return {
            ok: false,
            error: 'No estás autorizado para crear un sorteo'
        }
    }

    try {

      


        const newGiveway = await prisma.giveway.create({
            data: {
                ...giveway,
                quantityWinners: giveway.quantityWinners ? +giveway.quantityWinners : 1,
                participantLimit: giveway.participantLimit! >= 1 ? +giveway.participantLimit! : null,
                effectiveDate: new Date(giveway.effectiveDate),
                
            },
        })
        revalidatePath('/giveways');

        return {
            ok: true,
            giveway: newGiveway,
        }


    } catch (error: any) {
        console.log(error)
        return {
            ok: false,
            message: error.message
        }
    }
}
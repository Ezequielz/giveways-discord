'use server'

import { auth } from '@/auth.config';
import { Giveway, Role } from '@prisma/client';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';



export const updateGiveway = async (giveway: Giveway) => {
    const session = await auth()

    if (session?.user.role !== Role.admin) {
        return {
            ok: false,
            error: 'No estás autorizado para actualizar un sorteo'
        }
    }
    console.log(giveway)
 
    try {

        const existGiveway = await prisma.giveway.findUnique({
            where: {
                id: giveway.id
            },
            include: {
                prizes: true
            }
        });

        if (!existGiveway) {
            return {
                ok: false,
                error: 'No se encontró el sorteo'
            }
        };
       
        const updateGiveway = await prisma.giveway.update({
            where: {
                id: giveway.id
            },
            data: {
                ...giveway,
                participantLimit: giveway.participantLimit! >= 1 ? +giveway.participantLimit! : null,
                effectiveDate: new Date(giveway.effectiveDate),
                status: (+giveway.quantityWinners! === existGiveway.prizes.length) ? 'activo' : 'pendiente',
              
            },
        })

        if (!updateGiveway) {
            return {
                ok: false,
                error: 'No se pudo actualizar el sorteo'
            }
        };
        
        revalidatePath('/giveways');
        revalidatePath('/admin/dashboard/giveway');
        revalidatePath(`/admin/dashboard/giveway/${existGiveway.slug}`);

        return {
            ok: true,
            giveway: updateGiveway,
        }


    } catch (error: any) {
        console.log(error)
        return {
            ok: false,
            message: error.message
        }
    }
}
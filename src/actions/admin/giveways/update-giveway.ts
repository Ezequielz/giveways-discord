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
    // TODO corregir, recibo esto, necesito id o modificar a slug
    // {
    //     quantityWinners: '2',
    //     participantLimit: 0,
    //     name: 'asdasd',
    //     effectiveDate: '2024-03-20',
    //     status: 'pendiente',
    //     slug: 'asdasd'
    //   }
    // (parameter) giveway: {
    //     id: string;
    //     name: string;
    //     slug: string;
    //     status: $Enums.StatusGiveway;
    //     effectiveDate: Date;
    //     participantLimit: number | null;
    //     quantityWinners: number | null;
    //     createdAt: Date;
    //     updatedAt: Date;
    // }
    try {

        const existGiveway = await prisma.giveway.findUnique({
            where: {
                id: giveway.id
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
                quantityWinners: giveway.quantityWinners ? +giveway.quantityWinners : 1,
                participantLimit: giveway.participantLimit! >= 1 ? +giveway.participantLimit! : null,
                effectiveDate: new Date(giveway.effectiveDate),
            },
        })

        if (!updateGiveway) {
            return {
                ok: false,
                error: 'No se pudo actualizar el sorteo'
            }
        };
        
        revalidatePath('/giveways');

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
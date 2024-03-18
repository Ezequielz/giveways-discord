'use server'

import { auth } from '@/auth.config';
import { sleep } from '@/helpers';
import prisma from '@/lib/prisma';
import { Role } from '@prisma/client';

export const getPrizesByGivewayslug = async (slug: string) => {
    const session = await auth()

    if (session?.user.role !== Role.admin) {
        return {
            ok: false,
            error: 'No estás autorizado para crear un sorteo'
        }
    }
    try {


        const existGiveway = await prisma.giveway.findFirst({
            where: {
                slug: slug,
            },
           
        });
        if (!existGiveway) {
            return {
                ok: false,
                error: 'No existe el sorteo'
            }
        };

        const prizesOfGiveway = await prisma.prize.findMany({
            where: {
                giveawayId: existGiveway.id,
            },
            orderBy: {
                position: 'asc'
            }
        })

        if (!prizesOfGiveway) {
            return {
                ok: false,
                error: 'No se encontraron premios para el sorteo'
            }
        }


        return {
            ok: true,
            prizesOfGiveway: prizesOfGiveway,
        }


    } catch (error: any) {
        console.log(error)
        return {
            ok: false,
            message: error.message
        }
    }
}
'use server'

import { auth } from "@/auth.config"
import { Prize, Role, StatusGiveway } from "@prisma/client"
import prisma from '@/lib/prisma';

export const updatePrize = async (prizeToSave: Prize, slug: string) => {

    // console.log(prizeToSave)
    const session = await auth()

    if (session?.user.role !== Role.admin) {
        return {
            ok: false,
            error: 'No estás autorizado para crear un sorteo'
        }
    }

    try {

        const giveway = await prisma.giveway.findFirst({
            where: {
                slug: slug,
            },
            select: {
                id: true,
                slug: true,
                quantityWinners: true,
                prizes: true
            }

        })

        if (!giveway) {
            return {
                ok: false,
                error: 'No se encontro el sorteo'
            }
        }

        const priceUpdated = await prisma.prize.update({
            where: {
                id: prizeToSave.id
            },
            data: {
                ...prizeToSave
            }
        })

        if (!priceUpdated) {
            return {
                ok: false,
                error: 'No se pudo actualizar el sorteo'
            }
        }


        const checkPrizesOfGiveway = await prisma.prize.findMany({
            where: {
                giveawayId: giveway.id
            }
        })

        checkPrizesOfGiveway.map(prize => {
            prize.name
        })
        // Verificar si todos los premios tienen un nombre
        const todosConNombre = checkPrizesOfGiveway.map(prize => prize.name !== '').every(Boolean);

        // Comprobar el estado y emitir el mensaje correspondiente
        if (todosConNombre) {
            await prisma.giveway.update({
                where: {
                    id: giveway.id
                },
                data: {
                    status: StatusGiveway.activo
                }
            })
        } 

    
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
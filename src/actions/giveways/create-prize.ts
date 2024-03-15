'use server'

import { auth } from "@/auth.config"
import { Prize, Role } from "@prisma/client"
import prisma from '@/lib/prisma';

export const createPrizeByGiveway = async (prizesToSave: Prize[], givewayId: string) => {


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
                id: givewayId,
            },
            select: {
                name: true,
                quantityWinners: true,
                prizes: true
            }

        })

        if ( giveway && giveway?.prizes.length >= giveway?.quantityWinners!) {
            return {
                ok: false,
                error: 'No se pueden crear mas premios'
            }
        } 

        const prizes = await prizesToSave.map(async (prize) => {
            await prisma.giveway.update({
                where: {
                    id: givewayId
                },
                select: {
                    name: true
                },
                data: {
                    prizes: {
                        create: {
                            ...prize,
                        }
                    }
                }
            })
        })




        return {
            ok: true,
            prizes: prizes,
            givewayName: giveway?.name,
        }


    } catch (error: any) {
        console.log(error)
        return {
            ok: false,
            message: error.message
        }
    }
}
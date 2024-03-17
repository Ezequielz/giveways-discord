'use server'

import { auth } from "@/auth.config"
import { Prize, Role, StatusGiveway } from "@prisma/client"
import prisma from '@/lib/prisma';

export const updatePrize = async (prizesToSave: Prize[], slug: string) => {


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

        if ( giveway && giveway?.prizes.length >= 3) {
            return {
                ok: false,
                error: 'No se pueden crear mas premios'
            }
        } 

        const prizes = await prizesToSave.map(async (prize) => {
            await prisma.giveway.update({
                where: {
                    slug: slug
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


        if (prizes.length !== 0) {
            await prisma.giveway.update({
                where: {
                    id: giveway?.id
                },
                data: {
                    status: StatusGiveway.activo
                }
            })
        }
        

        return {
            ok: true,
            prizes: prizes,
            givewaySlug: giveway?.slug,
        }


    } catch (error: any) {
        console.log(error)
        return {
            ok: false,
            message: error.message
        }
    }
}
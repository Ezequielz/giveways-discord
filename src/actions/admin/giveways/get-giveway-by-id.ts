'use server'

import { auth } from "@/auth.config"
import { Role } from "@prisma/client"
import prisma from '@/lib/prisma';



export const getGivewayById = async (id: string) => {
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
                id: id
            },
            include: {
                prizes: true,
                participants: true
            }
        })

        return {
            ok: true,
            giveway: giveway,
        }


    } catch (error: any) {
        console.log(error)
        return {
            ok: false,
            message: error.message
        }
    }
}
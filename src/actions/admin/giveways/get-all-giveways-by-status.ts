'use server'

import { auth } from "@/auth.config"
import { Role, StatusGiveway } from "@prisma/client"
import prisma from '@/lib/prisma';



export const getAllGivewaysByStatus = async (status?: StatusGiveway) => {
    const session = await auth()

    if (session?.user.role !== Role.admin) {
        return {
            ok: false,
            error: 'No estás autorizado'
        }
    }

    try {


        const giveways = await prisma.giveway.findMany({
            where:{
                status: status
            },
            include: {
                prizes: true,
                participants: true

            }
        });

        

        if (!giveways) {
            return {
                ok: false,
                error: 'No se encontraron sorteos'
            }
        }

        return {
            ok: true,
            giveways: giveways,
        }


    } catch (error: any) {
        console.log(error)
        return {
            ok: false,
            message: error.message
        }
    }
}
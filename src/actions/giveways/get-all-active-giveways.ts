'use server'

import prisma from '@/lib/prisma';
import { StatusGiveway } from '@prisma/client';

export const getAllActiveGiveways = async () => {
   
    try {


        const giveways = await prisma.giveway.findMany({
            where: {
                status: StatusGiveway.activo
            },
            include: {
                prizes: true,
                participants: true
            }
        })

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
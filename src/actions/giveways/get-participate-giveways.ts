'use server'

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';
import { StatusGiveway } from '@prisma/client';
//TODO terminar obtencion de participantes
export const getParticipateGiveways = async (status?: StatusGiveway) => {
    const session = await auth();
    if (!session) {
        return {
            ok: false,
            message: 'Unauthorized'
        }
    }
// await sleep(5)
    try {


        const participateGiveways = await prisma.participant.findMany({
            where: {
                userId: session.user.id
            },
            include: {

            }
        })

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
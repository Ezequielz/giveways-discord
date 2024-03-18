'use server'

import { auth } from '@/auth.config';
import { sleep } from '@/helpers';
import prisma from '@/lib/prisma';
import { Role } from '@prisma/client';

export const getParticipantByGiveway = async (id: string,) => {
    const session = await auth()

    if (session?.user.role !== Role.admin) {
        return {
            ok: false,
            error: 'No estás autorizado para eliminar un usuario'
        }
    }

  
// await sleep(5)
    try {


        const participants = await prisma.participant.findMany({
            where: {
                giveawayId: id
            }
        })
       
        if (!participants) {
            return {
                ok: false,
                message: 'No se encontraron participantes'
            }
        }

      
        return {
            ok: true,
            participants: participants,

        }


    } catch (error: any) {
        console.log(error)
        return {
            ok: false,
            message: error.message
        }
    }
}
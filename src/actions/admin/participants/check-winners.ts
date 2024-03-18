'use server'

import { auth } from '@/auth.config';
import { sleep } from '@/helpers';
import prisma from '@/lib/prisma';
import { Role } from '@prisma/client';

export const checkWinner = async (givewayId: string) => {
    const session = await auth()

    if (session?.user.role !== Role.admin) {
        return {
            ok: false,
            error: 'No estás autorizado para eliminar un usuario'
        }
    }


    // await sleep(5)
    try {


        const participantsWins = await prisma.participant.findMany({
          where: {
            giveawayId: givewayId,
            winner: true,
          },
          include: {
             user: {
                select: {
                    image: true,
                    name: true
                }
             }
          }

        })


        if (!participantsWins) {
            return {
                ok: false,
                message: 'No se encontraron participantes'
            }
        }

        if (participantsWins.length === 0) {
            return {
                ok: false,
                message: 'No hay ganadores'
            }
        }


        return {
            ok: true,
            participantsWins: participantsWins,

        }


    } catch (error: any) {
        console.log(error)
        return {
            ok: false,
            message: error.message
        }
    }
}
'use server'

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';
import { StatusGiveway } from '@prisma/client';
import { revalidatePath } from 'next/cache';



export const addParticipantBySlugGiveway = async (slug: string) => {

    if (!slug) {
        return {
            ok: false,
            message: 'Debe proporcionar un slug de sorteo'
        }

    }

    const session = await auth();

    if (!session) {
        return {
            ok: false,
            message: 'No autenticado'
        }
    }

    try {

        const givewayExist = await prisma.giveway.findFirst({
            where: {
                slug,
            },
            select: {
                id: true,
                participantLimit: true
            }
        })

      

     

        if (!givewayExist) {
            return {
                ok: false,
                message: 'Giveway no existe'
            }
        }

        const participantOfGiveway = await prisma.participant.count({
            where: {
                giveawayId: givewayExist.id,
            }
        })

        if (givewayExist.participantLimit !== null && givewayExist.participantLimit >= participantOfGiveway) {
            return {
                ok: false,
                message: 'Limite de participantes alcanzado'
            }
        }

        await prisma.giveway.update({
            where: {
                id: givewayExist.id,
                status: StatusGiveway.activo
            },
            data: {
                participants: {
                    create: {
                        userId: session.user.id,
                    }
                }
            }
        })

        //Revalidate Path

        revalidatePath('/');
        revalidatePath('/giveway');
        revalidatePath('/giveways');
        revalidatePath(`/giveway/${slug}`);

        return {
            ok: true,

        };


    } catch (error: any) {
        console.log(error)
        return {
            ok: false,
            message: error.message
        }
    }
}
'use server'


import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const checkUserParticipate = async (slug: string) => {
  
    const session = await auth();
    if (!session) {
        return {
            ok: false,
            message: 'Unauthorized'
        };
    };

    try {


        const userParticipate = await prisma.giveway.findFirst({
            where: {
                slug: slug,
            },
            select: {
                participants : {
                    where: {
                        userId: session.user.id
                    }
                }
            }
        });

        if (userParticipate?.participants.length === 0) {
            return {
                ok: false,
            };
        };

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
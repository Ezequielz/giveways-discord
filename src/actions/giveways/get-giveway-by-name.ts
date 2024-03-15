'use server'

import prisma from '@/lib/prisma';

export const getGivewayByName = async (name: string) => {
  

    try {


        const giveway = await prisma.giveway.findFirst({
            where: {
                name: name
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
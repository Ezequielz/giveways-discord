'use server'

import { sleep } from '@/helpers';
import prisma from '@/lib/prisma';
import { StatusGiveway } from '@prisma/client';

export const getGivewayBySlug = async (slug: string, status?: StatusGiveway) => {
  
// await sleep(5)
    try {


        const giveway = await prisma.giveway.findFirst({
            where: {
                slug: slug,
                status: status,
            },
            include: {
                prizes: true,
                participants: {
                    select: {
                        user: {
                            select: {
                                name: true,
                                image: true,
                                discordId: true
                            }
                           
                        }
                    }
                }
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
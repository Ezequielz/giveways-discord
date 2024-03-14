'use server'

import { auth } from "@/auth.config"
import { Giveway } from "@/interfaces"
import { Role } from "@prisma/client"
import prisma from '@/lib/prisma';



export const createGiveway = async (giveway : Giveway) => {
    const session = await auth()

    if (session?.user.role !== Role.admin) {
        return {
            ok: false,
            error: 'No estás autorizado para crear un sorteo'
        }
    }

    try {

        const { prizes, ...rest} = giveway

        await prisma.giveaway.create({
            data: {
                ...rest,
                prizes: {
                    create: {
                        ...prizes
                    }
                }
            },

            
        })
        await prisma.giveaway.findUnique({
            where: {
                id: ''
            },
            include: {
                prizes: {

                }
            }


        })


    } catch (error) {
        console.log(error)
        return {
            ok: false,
            error: error
        }
    }
}
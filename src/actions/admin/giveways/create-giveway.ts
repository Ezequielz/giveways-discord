'use server'

import { auth } from "@/auth.config"
import { Giveway, Role } from "@prisma/client"
import prisma from '@/lib/prisma';
import { revalidatePath } from "next/cache";



export const createGiveway = async (giveway: Giveway) => {
    const session = await auth()

    if (session?.user.role !== Role.admin) {
        return {
            ok: false,
            error: 'No estás autorizado para crear un sorteo'
        }
    }

    try {


        const fechaActual: Date = new Date();
        const dateCompareToPart: string[] = giveway.effectiveDate.toString().split('-');
        const fechaComparar: Date = new Date(
            parseInt(dateCompareToPart[0]),
            parseInt(dateCompareToPart[1]) - 1,
            parseInt(dateCompareToPart[2])
        );

        fechaActual.setHours(0, 0, 0, 0);
        fechaComparar.setHours(0, 0, 0, 0);
        // console.log(fechaActual)
        // console.log(fechaComparar)

        if (fechaComparar < fechaActual) {
            return {
                ok: false,
                message: 'La fecha de inicio del sorteo no puede ser anterior a la fecha actual'
            }
        }




        const newGiveway = await prisma.giveway.create({
            data: {
                ...giveway,
                quantityWinners: giveway.quantityWinners ? +giveway.quantityWinners : 1,
                participantLimit: giveway.participantLimit! >= 1 ? +giveway.participantLimit! : null,
                effectiveDate: new Date(giveway.effectiveDate),

            },
        })
        {
            Array.from({ length: newGiveway.quantityWinners ?? 1 }, (_, index) => index + 1).map(async (_, index) => {
                await prisma.prize.create({
                    data: {
                        giveawayId: newGiveway.id,
                        name: '',
                        description: ``,
                        image: '',
                        position: index + 1,
                    }
                })

            })
        }


        revalidatePath('/giveways');

        return {
            ok: true,
            giveway: newGiveway,
        }


    } catch (error: any) {
        console.log(error)
        return {
            ok: false,
            message: error.code === 'P2002' || error.code === 'P2002'
                ? 'Nombre de sorteo ya está en uso, pruebe con otro'
                : 'Error al crear el sorteo',
              
        }
    }
}
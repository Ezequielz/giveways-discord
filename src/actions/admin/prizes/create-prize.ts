'use server'

import { auth } from "@/auth.config"
import { Prize, Role, StatusGiveway } from "@prisma/client"
import prisma from '@/lib/prisma';

export const createPrizeByGiveway = async (prizesToSave: Prize[], givewayId: string) => {
    const session = await auth()

    if (session?.user.role !== Role.admin) {
        return {
            ok: false,
            error: 'No estás autorizado para crear un sorteo'
        }
    }

    try {
        const giveway = await prisma.giveway.findFirst({
            where: {
                id: givewayId,
            },
            select: {
                id: true,
                slug: true,
                quantityWinners: true,
                prizes: true
            }

        })

        

        // if ( giveway && giveway?.prizes.length >= giveway?.quantityWinners!) {
        //     return {
        //         ok: false,
        //         error: 'No se pueden crear mas premios'
        //     }
        // } 
        // console.log(prizesToSave)
        // console.log(givewayId)
        const prizes = await prizesToSave.map(async (prize, index) => {
           
            await prisma.giveway.update({
                where: {
                    id: givewayId

                },
                select: {
                    name: true
                },
                data: {
                    prizes: {
                        update: {
                            where: {
                                id: prize.id,
                                // position: prize.position
                            },
                            data: {
                                ...prize,
                            }

                        }
                    }
                }
            })

        });


        if (prizes.length !== 0) {
            await prisma.giveway.update({
                where: {
                    id: giveway?.id
                },
                data: {
                    status: StatusGiveway.activo
                }
            })
        }
        

        return {
            ok: true,
            prizes: prizes,
            givewaySlug: giveway?.slug,
        }


    } catch (error: any) {
        console.log(error)
        return {
            ok: false,
            message: error.message
        }
    }
}

// export const uploadImages = async (images: string) => {

//     try {

//         const uploadPromises = images.map(async (image) => {

//             try {
//                 const buffer = await image.arrayBuffer();
//                 const base64Image = Buffer.from(buffer).toString('base64');
//                 // subir imagen a cloudinary                                                // carpeta
//                 return cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`, { folder: 'tesloShop' })
//                     .then(r => r.secure_url);
//             } catch (error) {
//                 console.log(error);
//                 return null;
//             }

//         });

//         const uploadedImages = await Promise.all(uploadPromises);

//         return uploadedImages;

//     } catch (error) {

//         console.log(error);
//         return null;

//     }

// }
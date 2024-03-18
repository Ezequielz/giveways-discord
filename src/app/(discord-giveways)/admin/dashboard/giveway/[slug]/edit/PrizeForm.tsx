'use client'
import { updatePrize } from "@/actions";
import { Prize } from "@prisma/client";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from 'react';

interface Props {
    prize: Prize;
    slug: string
    index: number
}


export const PrizeForm = ({prize, slug, index}: Props) => {
    // console.log(prize)
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Prize>({
        defaultValues: {
            name: prize.name,
            image: prize.image,
            id: prize.id,
            
        }
    });
    const router = useRouter()

    

    const onSubmit: SubmitHandler<Prize> = async (data) => {
        console.log(data)

        let newImage: any = ''
        if (data.image) {
            for (let i = 0; i < data.image!.length; i++) {
                newImage = data.image![0]
            }
        }
        const prizeUpdated = {
            ...data,
            image: newImage.name ?? ''
        }

       
        const { ok} = await updatePrize(prizeUpdated, slug)
        if (!ok) return;
        router.refresh()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='justify-around mt-2'>
            <div>{index+ 1}º Premio</div>
            <div className="flex gap-2 ">
                <div className='flex flex-col gap-2  bg-violet-600 p-1  rounded-xl'>
                  
                    <input
                        type="text"
                        placeholder="Nombre del premio"
                        className={clsx(" p-0 border rounded-md bg-gray-200 text-slate-800", { 'border-red-500': errors.name })}
                        {...register(`name`, { required: true })}
                    />
                    {errors.name && <p className='text-red-500'>Name is required</p>}

                

                    <div className='flex flex-col  border rounded-md bg-gray-200 '>
                        <Image
                            src={'/default-image.jpg'}
                            alt=''
                            width={50}
                            height={50}
                            className='w-full p-2'
                        />
                        <input
                            type="file"
                            accept="image/png, image/jpeg, image/avif"
                            className={clsx(" text-slate-800", { 'border-red-500': errors.image })}
                            {...register(`image`, { required: true })}
                        />
                    </div>
                    {errors.image && <p className='text-red-500'>Image is required</p>}
                </div>


            </div>
            <button type="submit" className='bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 my-2 px-4 rounded'>
               Actualizar premio
            </button>
        </form>
    )
}

'use client'
import clsx from "clsx";
import Image from "next/image";
import { SubmitHandler, set, useForm } from "react-hook-form";
import { Prize } from "@prisma/client";
import { createPrizeByGiveway, getGivewayBySlug } from "@/actions";
import { useRouter } from "next/navigation";
import { Subtitle } from "@/components";
import { useEffect, useState } from "react";

interface PrizeEditFormProps {
    slug: string;
   
}

export const PrizesEdit = ({ slug }: PrizeEditFormProps) => {
    const [initialState, setInitialState] = useState<Prize[] | []>([])
    const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm<Prize[]>({
        defaultValues: initialState,
    });
    const router = useRouter()

    useEffect(() => {
        if (!slug) return;

        const getPrizes = async() =>{
            const { ok, giveway } =  await getGivewayBySlug(slug)

            if (giveway)

            setInitialState( giveway.prizes )
  
            giveway!.prizes.map((prize, index) => {
                setValue(`${index}.name`, prize.name)
                setValue(`${index}.description`, prize.description)
                setValue(`${index}.image`, prize.image)
                        
            })
        }
        console.log('first')
        getPrizes()
    }, [slug, setValue])

    const onSubmit: SubmitHandler<Prize[]> = async (data) => {
        const prizes: any = []

        Object.values(data).map((prize) => {
            const { image, ...rest } = prize;
            let newImage: any = ''

            if (image) {
                for (let i = 0; i < image!.length; i++) {
                    newImage = image![0]
                }
            }

            let newPrize = {
                ...rest,
                image: newImage.name ?? ''
            }
            prizes.push(newPrize)
        })

        const { ok, givewaySlug, error } = await createPrizeByGiveway(prizes, slug)

        if (ok) {
            router.push(`/giveway/${givewaySlug}`)
        }

    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='justify-around mt-2'>
            <div className="flex gap-4  ">
                {Array.from({ length: initialState.length || 1 }, (_, index) => index + 1).map((_, index) => (
                    <div key={index} className='flex flex-col gap-2  bg-violet-600 p-4  rounded-xl'>
                        <Subtitle subtitle={`${index + 1}º Premio`} />
                        <input
                            type="text"
                            placeholder="Nombre del premio"
                            className={clsx("w-full p-2 border rounded-md bg-gray-200 text-slate-800", { 'border-red-500': errors[index]?.name })}
                            {...register(`${index}.name`, { required: true })}
                        />
                        {errors[index]?.name && <p className='text-red-500'>Name is required</p>}

                        <textarea
                            placeholder="Descripcion del sorteo"
                            className={clsx("w-full p-2 border rounded-md bg-gray-200 text-slate-800", { 'border-red-500': errors[index]?.description })}
                            {...register(`${index}.description`, { required: true })}
                        />
                        {errors[index]?.description && <p className='text-red-500'>Description is required</p>}

                        <div className='flex flex-col p-2 border rounded-md bg-gray-200'>
                            <Image
                                src={'/default-image.jpg'}
                                alt=''
                                width={100}
                                height={100}
                                className='w-full p-2'
                            />
                            <input
                                type="file"
                                accept="image/png, image/jpeg, image/avif"
                                className={clsx("w-full text-slate-800", { 'border-red-500': errors[index]?.image })}
                                {...register(`${index}.image`, { required: true })}
                            />
                        </div>
                        {errors[index]?.image && <p className='text-red-500'>Image is required</p>}
                    </div>
                ))}

            </div>
            <button type="submit" className='bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 my-2 px-4 rounded'>
                confirmar premios editados
            </button>
        </form>
    );
};

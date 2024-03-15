'use client'
import clsx from "clsx";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { Prize } from "@prisma/client";
import { createPrizeByGiveway } from "@/actions";
import { useRouter } from "next/navigation";

interface PrizeFormProps {
    id: string;
    quantity: number;
}

export const PrizesForm = ({ id, quantity }: PrizeFormProps) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Prize[]>();
    const router = useRouter()

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

        const { ok, givewayName, error } = await createPrizeByGiveway(prizes, id)
       
        if (ok) {
            router.push(`/giveway/${givewayName}`)
        }

    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='bg-slate-600 p-4 rounded-xl flex gap-1 justify-around'>
            {Array.from({ length: quantity }, (_, index) => index + 1).map((_, index) => (
                <div key={index} className='flex flex-col gap-2'>
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
            <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-2 px-4 rounded'>
                Crear Sorteo
            </button>
        </form>
    );
};

'use client'
import clsx from "clsx";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { Prize } from "@prisma/client";
import { createPrizeByGiveway } from "@/actions";
import { useRouter } from "next/navigation";
import { Subtitle } from "@/components";

interface PrizeFormProps {
    id: string;
    prizesOfGiveway: Prize[];
}

export const PrizesForm = ({ id, prizesOfGiveway }: PrizeFormProps) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Prize[]>();
    const router = useRouter();

    const onSubmit: SubmitHandler<Prize[]> = async (data) => {
        const prizes: any = []
        // console.log(data)
        Object.values(data).map((prize, index) => {
            const { image, ...rest } = prize;
            let newImage: any = ''

            if (image) {
                for (let i = 0; i < image!.length; i++) {
                    newImage = image![0]
                }
            }

            let newPrize = {
                ...rest,
                position: index + 1,
                image: newImage.name ?? ''
            }
            prizes.push(newPrize);
        })

        const { ok, givewaySlug, error } = await createPrizeByGiveway(prizes, id)
        // console.log(ok)
        if (ok) {
            router.push(`/giveway/${givewaySlug}`);
        }

    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='justify-around mt-2'>
            <div className="flex gap-4  ">
                {Array.from({ length: prizesOfGiveway.length }, (_, index) => index + 1).map((_, index) => (
                    <div key={index} className='flex flex-col gap-2  bg-violet-600 p-4  rounded-xl'>
                        <Subtitle subtitle={`${index + 1}º Premio`} />
                        <input
                            type="text"
                            className="hidden"
                            value={prizesOfGiveway[index].id}
                            {...register(`${index}.id`, { required: true })}
                        />
                        <input
                            type="text"
                            placeholder="Nombre del premio"
                            className={clsx("w-full p-2 border rounded-md bg-gray-200 text-slate-800", { 'border-red-500': errors[index]?.name })}
                            {...register(`${index}.name`, { required: true })}
                        />
                        {errors[index]?.name && <p className='text-red-500'>Name is required</p>}


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
                Crear Sorteo
            </button>
        </form>
    );
};

'use client'
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';
import Image from 'next/image';
import { createGiveway } from '@/actions';
import { Giveway } from '@prisma/client';

interface Props {
    active: boolean
}

export const GivewayForm = ({ active }: Props) => {

    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('');
    const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, getValues, reset, watch } = useForm<Giveway>({
        defaultValues: {
            quantityWinners: 1,
            participantLimit: 0
        }
    });
    const path = usePathname();

    watch('quantityWinners')
    
    const onSubmit: SubmitHandler<Giveway> = async (data) => {

        setErrorMessage('');
        console.log(data)
        // server action
        const resp = await createGiveway(data);
        console.log(resp)

        if (!resp.ok) {
            setErrorMessage(resp.message)

            return;
        };
        router.replace(`${path}?id=${resp.giveway?.id}`);

    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="relative ">
            {active && (
                <div
                    className="absolute top-0 left-0 w-full h-full z-10 bg-black/50"
                />

            )

            }
            <h2>Sorteo</h2>
            <div className='flex flex-col justify-center gap-1'>
                {/* Name */}
                <div className=' relative'>

                    <input
                        type="text"
                        autoFocus
                        placeholder="Nombre del sorteo"
                        className={
                            clsx(
                                "w-full p-2 border rounded-md bg-gray-200 text-slate-800",
                                {
                                    'border-red-500': errors.name,
                                }
                            )
                        }
                        {...register("name", { required: true })}
                    />



                </div >
                <div className='flex gap-2 items-center'>
                    {/* Quantity Winners */}
                    <div className=' flex flex-col gap-0 p-2'>
                        <label htmlFor="quantityWinners">Ganadores</label>
                        <input
                            value={getValues('quantityWinners') ?? 1}
                            id='quantityWinners'
                            min={1}
                            max={3}
                            type="number"
                            placeholder="Cantidad de ganadores"
                            className={
                                clsx(
                                    "mt-2 p-2 border rounded-md bg-gray-200 text-slate-800",
                                    {
                                        'border-red-500': errors.quantityWinners,
                                    }
                                )
                            }
                            {...register("quantityWinners", { min: 1, max: 3 })}
                        // onChange={(e) => onQuantityWinnersChanged(parseInt(e.target.value))}
                        />


                    </div>

                    {/* Participant limit */}
                    <div className=' flex flex-col gap-0 p-2'>
                        <label htmlFor="participantLimit">Participantes</label>
                        <input
                            type="number"
                            min={0}
                            placeholder="Cantidad de participantes"
                            className={
                                clsx(
                                    "mt-2 p-2 border rounded-md bg-gray-200 text-slate-800",
                                    {
                                        'border-red-500': errors.quantityWinners,
                                    }
                                )
                            }
                            {...register("participantLimit", { min: 0 })}
                        />


                    </div>

                    <div className=' flex flex-col gap-0 p-2'>
                        <label htmlFor="effectiveDate">fecha del sorteo</label>
                        <input
                            type="date"
                            className={
                                clsx(
                                    "mt-2 p-2 border rounded-md bg-gray-200 text-slate-800",
                                    {
                                        'border-red-500': errors.effectiveDate,
                                    }
                                )
                            }
                            {...register("effectiveDate", { required: true })}
                        />
                    </div>

                    <div className={
                        clsx(
                            "flex justify-center mt-5",
                            {
                                "hidden": active
                            }
                        )
                    }>

                        <button
                            disabled={isSubmitting}
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-2 px-4 rounded'
                        >
                            <span className="z-5">{isSubmitting ? 'Creando...' : 'Confirmar datos del sorteo'}</span>

                        </button>

                    </div>


                </div>

    
                {/* BUTTON */}


                <div className='relative flex justify-center p-1 mb-1'>
                    <span className="text-red-500  m-auto items-center absolute">{errorMessage}</span>
                </div>

            </div>




        </form>
    )
}
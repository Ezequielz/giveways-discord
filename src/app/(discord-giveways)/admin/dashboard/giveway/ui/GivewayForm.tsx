'use client'
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';
import { createGiveway } from '@/actions';
import { Giveway } from '@prisma/client';

interface Props {
    active: boolean;
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


        data.slug = data.name
            .trim()
            .toLowerCase()
            .replace(/\s+/g, '_') //  espacios con guiones bajos
            .replace(/[^\w\-]+/g, '') // quitar todos los caracteres no alfanuméricos excepto guiones bajos
            .replace(/\-\-+/g, '_') // quitar múltiples guiones bajos con uno solo
            .replace(/^-+/, '') // quitar los guiones bajos del principio del texto
            .replace(/-+$/, ''); // quitar los guiones bajos del fin del texto
        // server action



        const resp = await createGiveway(data);


        if (!resp.ok) {
            setErrorMessage(resp.message ?? '')

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

            <div className='flex flex-col justify-center gap-1'>
                {/* Name */}
                <div className=' relative'>
                    <label htmlFor="name">Nombre</label>
                    <input
                        type="text"
                        id='name'
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
                        {...register("name", { required: true, minLength: 3, maxLength: 50 })}
                    />
                    {errors?.name?.type === 'required' && <p className='text-red-500'>Nombre del sorteo es requerido</p>}
                    {errors?.name?.type === 'minLength' && <p className='text-red-500'>Minimo 3 caracteres</p>}
                    {errors?.name?.type === 'maxLength' && <p className='text-red-500'>Máximo 50 caracteres</p>}


                </div >
                {/* descriocion */}
                <div className=' relative'>
                    <label htmlFor="description">Descripcion (opcional)</label>
                    <textarea
                        id='description'
                        autoFocus
                        placeholder="Descripcion del sorteo"
                        className={
                            clsx(
                                "w-full p-2 border rounded-md bg-gray-200 text-slate-800",
                                {
                                    'border-red-500': errors.name,
                                }
                            )
                        }
                        {...register("description")}
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
                            {...register("quantityWinners", { required: true, min: 1, max: 3 })}
                        // onChange={(e) => onQuantityWinnersChanged(parseInt(e.target.value))}
                        />
                        {errors?.quantityWinners?.type === 'min' && <p className='text-red-500'>Minimo 1 ganador</p>}
                        {errors?.quantityWinners?.type === 'max' && <p className='text-red-500'>Máximo 3 ganadores</p>}
                        {errors?.quantityWinners?.type === 'required' && <p className='text-red-500'>Ganador es requerido</p>}

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
                                        'border-red-500': errors.participantLimit,
                                    }
                                )
                            }
                            {...register("participantLimit", { required: true, min: 0 })}
                        />

                        {errors?.participantLimit?.type === 'min' && <p className='text-red-500'>Minimo 0 = infinito</p>}

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
                        {errors?.effectiveDate?.type === 'required' && <p className='text-red-500'>Fecha del sorteo es requerido</p>}
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
                            className='bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 mt-2 px-4 rounded'
                        >
                            <span className="z-5">{isSubmitting ? 'Creando...' : 'Confirmar datos del sorteo'}</span>

                        </button>

                    </div>


                </div>


                {/* BUTTON */}

                <span className='text-sm text-gray-500/50'>0 = participantes ilimitados</span>
                <div className='relative flex justify-center p-1 mb-1'>
                    <span className="text-red-500  m-auto items-center absolute">{errorMessage}</span>
                </div>

            </div>




        </form>
    )
}
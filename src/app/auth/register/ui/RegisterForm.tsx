'use client'

import { useState } from 'react';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import clsx from 'clsx';

import { login, providerLogin, registerUser } from '@/actions';
import { SignInOptions } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';


type FormInputs = {
    name: string;
    email: string;
    password: string;
};

const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i


export const RegisterForm = () => {

    const [errorMessage, setErrorMessage] = useState('');
    const searchParams = useSearchParams();
    const error = searchParams.get('error');
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormInputs>();

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        setErrorMessage('');
        const { name, email, password } = data;

        // Server action
        const resp = await registerUser({ name, email, password })
        if (!resp.ok) {
            setErrorMessage(resp.message)
            return;
        };

        await login(email.toLowerCase(), password);

        window.location.replace('/');

    };

    const oauthLogin = async () => {
        setErrorMessage('');

        try {
            let options: SignInOptions = {
                callbackUrl: `${window.location.origin}`,
                // redirect: false,
            };

            if (!options) return setErrorMessage(options);
            await providerLogin('google', options);

        } catch (error) {
            console.log(error)
            setErrorMessage('error');
            throw error;
        }


    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col ">


            <label htmlFor="name">Nombre completo</label>
            {errors.name?.type === 'required' && (
                <span className="text-red-500">*El nombre es obligatorio</span>
            )}
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5 text-slate-800",
                        {
                            'border-red-500': errors.name
                        }
                    )
                }
                type="text"
                autoFocus
                {...register('name', { required: true })}
            />


            <label htmlFor="email">Correo electrónico</label>
            {errors.email?.type === 'required' && (
                <span className="text-red-500">*El email es obligatorio</span>
            )}
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5 text-slate-800",
                        {
                            'border-red-500': errors.email
                        }
                    )
                }
                type="email"
                {...register('email', { required: true, pattern: emailRegex })}
            />


            <label htmlFor="password">Contraseña</label>
            {errors.password?.type === 'required' && (
                <span className="text-red-500">*La contraseña es obligatoria</span>
            )}
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5 text-slate-800",
                        {
                            'border-red-500': errors.password
                        }
                    )
                }
                autoComplete='off'
                type="password"
                {...register('password', { required: true, minLength: 6 })}
            />

            <span className="text-red-500">{errorMessage}</span>

            <button
                type='submit'
                disabled={isSubmitting}
                className="w-full group relative h-12 overflow-hidden rounded-lg bg-white text-lg shadow"
            >
                <div className="absolute inset-0 w-3 bg-gradient-to-tr from-violet-600 to-violet-400 shadow-blue-500/40 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                <span className="relative text-black group-hover:text-white">Registrar</span>
            </button>


            {/* divisor l ine */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-slate-300"></div>
                <div className="px-2 text-slate-100">O </div>
                <div className="flex-1 border-t border-slate-300"></div>
            </div>

            <div className="w-full  mb-10 lg:mb-0">
                <span className='text-red-500 text-sm'> {error === 'unauthorized' && 'Usuario baneado'} </span>
                <button
                    onClick={oauthLogin}
                    type="button"
                    className="w-full justify-center flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">

                    <svg className="h-6 w-6 mr-2"
                        width="800px" height="800px" viewBox="0 -28.5 256 256" version="1.1" preserveAspectRatio="xMidYMid">
                        <g>
                            <path
                                d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z"
                                fill="#5865F2" fill-rule="nonzero">

                            </path>
                        </g>
                    </svg>

                    <span>Continuar con Discord</span>

                </button>
            </div>

            <div className='mt-5 flex justify-center gap-2 items-center '>
                Ya tienes una cuenta?

                <Link
                    href="/auth/login"
                    className="btn-secondary text-center text-violet-500 hover:text-violet-400">
                    Ingresá
                </Link>
            </div>

        </form>
    )
}
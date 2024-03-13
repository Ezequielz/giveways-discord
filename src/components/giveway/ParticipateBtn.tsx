'use client'

import { useEffect, useState } from 'react';
import { checkUserMember } from '@/actions';



export const ParticipateBtn = () => {

    const [isMember, setIsMember] = useState(false)

    useEffect(() => {
        const checkUser = async () => {
            return await checkUserMember()
        }
        checkUser().then(res => {
            if (!res.ok) return;

            setIsMember(true)

        })
    }, [])

 

    return (
        <>
            {
                !isMember ? (
                    <a
                        href="https://discord.gg/794jxEqX"
                        target='_blank'
                        rel="noreferrer"
                        className=""
                    >

                        <span className="relative  group-hover:text-white">Unete a DevTalles para participar</span>
                    </a>
                ) : (
                    <button
                        onClick={() => { console.log('participando') }}
                        type='submit'
                        disabled={!isMember}
                        className="w-fit p-2 group relative h-12 overflow-hidden rounded-lg bg-white text-lg shadow"
                    >
                        <div className="absolute inset-0 w-3 bg-gradient-to-tr from-violet-600 to-violet-400 shadow-blue-500/40 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                        <span className="relative text-black group-hover:text-white">Participar</span>
                    </button>
                )
            }

        </>
    )
}

'use client'

import { useEffect, useState } from 'react';
import { addParticipantBySlugGiveway, checkUserMember, checkUserParticipate } from '@/actions';
import { useRouter } from 'next/navigation';

interface Props {
    slug: string;
}

export const ParticipateBtn = ({ slug }: Props) => {

    const [isMember, setIsMember] = useState(true)
    const [isParticipate, setisParticipate] = useState(false)
    const router = useRouter()
    useEffect(() => {
        const checkParticipate = async () => {
            return await checkUserParticipate(slug)
        }
        checkParticipate().then(res => {
       
            if (!res.ok) {
                setisParticipate(false)
                return;
            }else{

                setisParticipate(true)
                return;
            }
        })
    }, [slug])

    // useEffect(() => {
    //     const checkUser = async () => {
    //         return await checkUserMember()
    //     }
    //     checkUser().then(res => {
    //         if (!res.ok) return;

    //         setIsMember(true)

    //     })
    // }, [])

    const handleParticipate = async () => {
        
        const res = await checkUserMember()
        if (!res.ok) {
            setIsMember(false);
            return
        }

        const { ok } = await addParticipantBySlugGiveway(slug)
        if (ok) {
            setisParticipate(true)
        }
    }


    return (
        <>
            {
                !isMember ? (
                    <a
                        onClick={() => setIsMember(true)}
                        href="https://discord.gg/794jxEqX"
                        target='_blank'
                        rel="noreferrer"
                        className=""
                    >

                        <span className="relative  group-hover:text-white">Unete a DevTalles para participar</span>
                    </a>
                ) : (
                    
                    <button
                        onClick={() => { handleParticipate() }}
                        type='submit'
                        disabled={!isMember || isParticipate}
                        className="w-fit p-2 group relative h-12 overflow-hidden rounded-lg bg-white text-lg shadow"
                    >
                        {
                            !isParticipate && (

                                <div className="absolute inset-0 w-3 bg-gradient-to-tr from-violet-600 to-violet-400 shadow-blue-500/40 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                            )
                        }
                        <span className="relative text-black group-hover:text-black"> {isParticipate ? 'Ya estás participando' : 'Participar'} </span>
                    </button>
                )
            }

        </>
    )
}

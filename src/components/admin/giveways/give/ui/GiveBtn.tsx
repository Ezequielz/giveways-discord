'use client'

import { setWinner } from "@/actions"
import { Participant } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useState } from "react"


interface Props {
    participants: Participant[] | undefined
    quantity: number
}

export const GiveBtn = ({ participants, quantity }: Props) => {
    const [error, setError] = useState('')
    const router = useRouter()
    if (!participants) {
        return (
            <div>No hay participantes</div>
        )
    }

    const handleGive = async() => {
        if (participants.length < quantity) {

            setError('No hay suficientes participantes')
            return
        }
        for (let i = 0; i < quantity; i++) {
            const randomIndex = Math.floor(Math.random() * participants.length);
            const winner = participants[randomIndex];
            console.log(winner.userId)

            const position = i + 1
            console.log(position)
            // userId: string, givewayId: string, participantId: string, position: number)
           const {ok, participants: asd} = await setWinner( winner.userId, winner.giveawayId, winner.id, position )
           if(ok) {
            router.refresh()
           
           }
        }

    }

    return (
        <>
            <button
                onClick={handleGive}
                className="bg-violet-500 hover:bg-violet-600 p-2 rounded-xl"
            >
                Sortear
            </button>
            <span className="text-red-500">{error}</span>
        </>
    )
}

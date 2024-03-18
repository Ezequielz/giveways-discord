import { checkWinner, getGivewayBySlug, getParticipantByGiveway } from "@/actions";
import { auth } from "@/auth.config";
import { Title } from "@/components";
import { dateFormat } from "@/helpers";
import { Role } from "@prisma/client";
import Image from "next/image";
import { notFound } from "next/navigation";
import { GiveBtn } from "./ui/GiveBtn";

interface Props {
    slug: string;
}
export const Give = async ({ slug }: Props) => {
    const session = await auth();
    const { giveway } = await getGivewayBySlug(slug)
    if (!giveway) {
        notFound()
    }
    const { participants } = await getParticipantByGiveway(giveway!.id)
    const { ok, participantsWins } = await checkWinner(giveway.id)

    
    return (
        <div>
            <Title title={giveway!.name} />
            <div className="flex gap-2 items-start">

                <div className="w-4/5 flex flex-col items-center justify-center mt-10">

                    <div className="flex gap-2 justify-around items-start">
                        <div className=' w-full flex flex-col items-center justify-start'>
                            <div className='flex flex-col justify-start'>

                                <span>Limite de participantes: {giveway.participantLimit ?? 'ilimitados'} </span>
                                <span>Ganadores: {giveway.quantityWinners} </span>
                                <span>fecha del sorteo: {dateFormat(giveway.effectiveDate)} </span>
                                <span>{giveway.description}</span>
                            </div>

                            <article className="flex flex-col  p-2 my-5">
                                <strong>Premios</strong>
                                <div className='flex justify-center items-start gap-2'>

                                    {
                                        giveway.prizes.map((prize, index) => (
                                            <div
                                                key={prize.id}
                                                className="bg-violet-500/50 flex flex-col w-full p-2 gap-2"
                                            >

                                                {/* <Image
                                                    // src={`/${prize.image}` ?? '/default-image.jpg'}
                                                    src={'/default-image.jpg'}
                                                    width={100}
                                                    height={100}
                                                    alt={prize.name}
                                                    className='w-full'
                                                /> */}
                                                <div className="flex flex-col">
                                                    <span>
                                                        {index + 1}º premio
                                                    </span>
                                                    <span>
                                                        {prize.name}
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>

                            </article>


                        </div>
                        <div className="flex flex-col justify-center gap-5">
                            <Image
                                src={'/codequest/yay.png'}
                                alt="devi prize"
                                width={400}
                                height={400}
                            />
                            {
                                !participantsWins ? (

                                    <GiveBtn participants={participants} quantity={giveway.quantityWinners ?? 1} />
                                ) : (
                                    <div

                                        className="flex flex-col"
                                    >
                                        <strong>Ganadores:</strong>
                                        {
                                            participantsWins?.map(participants => (

                                                <div
                                                    key={participants.id}
                                                    className="flex items-center gap-2"
                                                >
                                                    <span>
                                                        {participants.position}-
                                                    </span>
                                                    <Image
                                                        src={participants.user.image ?? ''}
                                                        alt="imagen del participante ganador"
                                                        height={50}
                                                        width={50}
                                                        className="rounded-full"
                                                    />
                                                    <span  >
                                                        {participants.user.name}
                                                    </span>
                                                </div>

                                            ))
                                        }
                                    </div>

                                )
                            }
                        </div>
                    </div>

                </div>

                <div className="w-1/5 border-2 border-violet-500 p-2 rounded-xl h-fit">
                    Participantes: {giveway?.participants.length}
                    <div className=''>
                        {
                            giveway?.participants.map(participant => (
                                <ol
                                    key={participant.user.discordId}

                                >
                                    <li className='flex gap-2 items-center'>
                                        <Image
                                            src={participant.user.image ?? '/default-image.png'}
                                            alt={participant.user.name ?? ''}
                                            width={20}
                                            height={20}
                                            className='rounded-full'
                                        />
                                        <span className='flex flex-col'>
                                            {participant.user.name}

                                            {
                                                session?.user.role === Role.admin && (
                                                    <span className='text-violet-500/50'>
                                                        -  {participant.user.discordId}
                                                    </span>
                                                )
                                            }
                                        </span>

                                    </li>
                                </ol>
                            ))
                        }


                    </div>
                </div>

            </div>


        </div >
    )
}

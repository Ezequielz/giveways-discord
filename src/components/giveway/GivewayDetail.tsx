import Image from 'next/image';
import { auth } from '@/auth.config';
import { Role, StatusGiveway } from '@prisma/client';
import { getGivewayBySlug } from '@/actions'
import { DiscordBtn, ParticipateBtn, Title } from '..';
import { dateFormat } from '@/helpers';
import { notFound } from 'next/navigation';

interface Props {
    slug: string
}

export const GivewayDetail = async ({ slug }: Props) => {

    const session = await auth()

    const { ok, giveway } = await getGivewayBySlug(slug, StatusGiveway.activo);


    if (!ok || !giveway) {
        notFound()
    }

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

                                                <Image
                                                    // src={`/${prize.image}` ?? '/default-image.jpg'}
                                                    src={'/default-image.jpg'}
                                                    width={100}
                                                    height={100}
                                                    alt={prize.name}
                                                    className='w-full'
                                                />
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

                            {
                                session ? (
                                    <ParticipateBtn slug={slug} />
                                ) : (
                                    <div className="w-fit">
                                        <span>Inicia session para participar</span>
                                        <DiscordBtn label="Continuar con discord" />
                                    </div>
                                )
                            }
                        </div>
                        <Image
                            src={'/codequest/yay.png'}
                            alt="devi prize"
                            width={400}
                            height={400}
                        />
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


        </div>
    )
}

import { getGivewayBySlug } from "@/actions"
import { auth } from "@/auth.config";
import { StatusGiveway } from "@prisma/client";
import { DiscordBtn, ParticipateBtn, Title } from "..";
import Image from "next/image";

interface Props {
    slug: string
}

export const GivewayDetail = async ({ slug }: Props) => {

    const session = await auth()

    const { ok, giveway } = await getGivewayBySlug(slug, StatusGiveway.activo);


    if (!ok) return <div>Error</div>

    return (
        <div>
            <Title title={giveway!.name} />
            <div className="flex gap-2 items-start">

                <div className="w-4/5 flex flex-col items-center justify-center mt-10">

                    <div className="flex gap-2 justify-between items-center w-full">
                        <div>
                            detalles
                            {
                                session ? (
                                    <ParticipateBtn />
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

                <div className="w-1/5 border-2 border-violet-500 p-2 rounded-xl h-screen">
                    Participantes: {giveway?.participants.length}
                </div>

            </div>


        </div>
    )
}

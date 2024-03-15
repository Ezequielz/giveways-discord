import { getAllActiveGiveways } from "@/actions"
import Link from "next/link"
import { Subtitle } from ".."
import Image from "next/image"
import { dateFormat } from "@/helpers"

export const Giveways = async () => {
    const { ok, giveways } = await getAllActiveGiveways()
  
    if (!ok || !giveways) {
        return (
            <div
                className="mt-10 border-2 border-violet-600 hover:scale-105 p-2 rounded-xl h-fit"
            >No se encontraron sorteos activos</div>
        )
    }
    return (
        <div className="grid lg:grid-cols-4 gap-2 my-5">
            {
                giveways.map((giveway) => (
                    <Link
                        href={`/giveway/${giveway.slug}`}
                        key={giveway.id}
                        className="border-2 border-violet-600 hover:scale-105 p-2 rounded-xl h-fit"
                    >
                        <div >
                            <div className="">
                                <Subtitle subtitle={`${giveway.name}`} />
                                <div className="flex text-sm justify-center gap-1 my-1">
                                    <span className="bg-violet-500 px-2 rounded-xl">{giveway.quantityWinners} premios</span>
                                    <span className="bg-violet-500 px-2 rounded-xl">{giveway.participants.length} participantes</span>
                                    <span className="bg-violet-500 px-2 rounded-xl">{dateFormat(giveway.effectiveDate)}</span>

                                </div>
                            </div>
                            <article className="flex flex-col justify-center items-start p-2 gap-2 ">
                                {
                                    giveway.prizes.map((prize, index) => (
                                        <div
                                            key={prize.id}
                                            className="bg-violet-500/50 flex w-full p-2 gap-2"
                                        >

                                            <Image
                                                // src={`/${prize.image}` ?? '/default-image.jpg'}
                                                src={'/default-image.jpg'}
                                                width={50}
                                                height={50}
                                                alt={prize.name}
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

                            </article>

                        </div>
                    </Link>
                ))
            }

        </div>

    )
}

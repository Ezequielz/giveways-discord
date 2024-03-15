import Image from "next/image"
import Link from "next/link"
import { Subtitle } from ".."

export const Home = () => {
    return (
        <div className="flex justify-center items-center mt-10 gap-5">
            <div className="text-3xl -mt-10">
                <Subtitle subtitle="Como participar?" />
                <p className="mt-6">Unete a la comunidad de
                    <a
                        href="https://discord.gg/794jxEqX"
                        target="_blank"
                        rel="noreferrer"
                        className="text-violet-500 hover:text-violet-300 ml-2"
                    >
                        Discord
                    </a>
                    !
                </p>
                <p >Inscribete en
                    <Link href={'/giveways'} className="text-violet-400 hover:text-violet-300 ml-2">
                        sorteos
                    </Link>
                    !
                </p>
                <p>¡Mucha suerte!</p>
            </div>

            <Image
                src={'/codequest/fly.png'}
                alt="Fly"
                width={400}
                height={400}
                priority={true}
            />

        </div>
    )
}



import Link from 'next/link';
import { auth } from '@/auth.config';
import { DiscordBtn } from '../login/DiscordBtn';
import { Avatar } from './Avatar';
import Image from 'next/image';


export const Navbar = async () => {

    const session = await auth();

    return (
        <nav className="flex  px-3 lg:px-10 py-2 justify-between items-center">

            {/* Logo */}
            <div className='relative py-3'>
                <Link
                    href="/">
                    <Image 
                        src={'/codequest/LOGOBLANCO.png'}
                        alt='logo devtalles'
                        width={100}
                        height={50}
                    />
                </Link>
            </div>


            {/* MENU */}
            {
                !session?.user ? (
                    <DiscordBtn />

                ) : (
                    <Avatar img={session.user.image!}/>
                )
            }


        </nav>
    );
};
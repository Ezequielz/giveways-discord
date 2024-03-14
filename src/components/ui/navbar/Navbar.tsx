

import Link from 'next/link';
import { auth } from '@/auth.config';
import { LogoutBtn } from './LogoutBtn';
import { DiscordBtn } from '../DiscordBtn';


export const Navbar = async () => {

    const session = await auth();

    return (
        <nav className="flex  px-3 lg:px-10  justify-between items-center">

            {/* Logo */}
            <div className='relative py-3'>
                <Link
                    href="/">
                    Logo
                </Link>
            </div>


            {/* MENU */}
            {
                !session?.user ? (
                    <DiscordBtn />

                ) : (
                    <LogoutBtn />
                )
            }


        </nav>
    );
};
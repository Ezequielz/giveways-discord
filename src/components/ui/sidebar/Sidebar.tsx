'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import clsx from 'clsx';
import { useUIStore } from '@/store';
import { Role } from '@prisma/client';
import { logout } from '@/actions';




export const Sidebar = () => {

    const { data: session } = useSession();
    const isAuthenticated = !!session?.user
    const isAdmin = (session?.user?.role === Role.admin)

    const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen);
    const closeMenu = useUIStore(state => state.closeSideMenu);

    return (
        <aside >

            {/* Background black */}
            {
                isSideMenuOpen && (
                    <div
                        className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30"
                    />

                )
            }


            {/* Blur */}
            {
                isSideMenuOpen && (
                    <div
                        onClick={closeMenu}
                        className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
                    />

                )
            }

            {/* Sidemenu */}
            <nav
                className={
                    clsx(
                        "fixed p-5 right-0 top-0 w-[300px] h-screen text-slate-100  bg-gradient-to-r from-violet-700 to-neutral-900 shadow-violet-500/40 z-20 shadow-2xl transform transition-all duration-300",
                        {
                            "translate-x-full": !isSideMenuOpen
                        }
                    )
                }>


                <button
                    onClick={() => closeMenu()}
                >
                    X
                </button>


                {/* Menú */}

                {
                    isAuthenticated && (
                        <>


                            <Link
                                href="/giveways"
                                onClick={() => closeMenu()}
                                className="flex items-center mt-6 p-2 hover:bg-gray-100 hover:text-neutral-900 rounded transition-all"
                            >
                                <span className="ml-3 text-xl">Sorteos</span>
                            </Link>
                        
                            <button
                                className="flex w-full items-center mt-6 p-2 hover:bg-gray-100 hover:text-neutral-900 rounded transition-all"
                                onClick={() => logout()}
                            >
                                <span className="ml-3 text-xl">Salir</span>
                            </button>

                            {
                                isAdmin && (
                                    <>
                                        <hr className='my-2' />

                                        <Link
                                            href="/admin/dashboard"
                                            onClick={() => closeMenu()}
                                            className="flex items-center mt-3 p-2 hover:bg-gray-100 hover:text-neutral-900 rounded transition-all"
                                        >

                                            <span className="ml-3 text-xl">Dashboard</span>
                                        </Link>

                                    </>

                                )
                            }
                        </>

                    )
                }

                {
                    !isAuthenticated && (
                        <Link
                            href="/auth/login"
                            onClick={() => closeMenu()}
                            className="flex items-center mt-6 p-2 hover:bg-gray-100 hover:text-neutral-900 rounded transition-all"
                        >
                            <span className="ml-3 text-xl">Ingresar</span>
                        </Link>

                    )
                }

            </nav>
        </aside>
    );
};
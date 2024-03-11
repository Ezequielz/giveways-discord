import Link from 'next/link';
import { redirect } from "next/navigation";
import { auth } from '@/auth.config';

export default async function ShopLayout({ children }: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (session?.user) {
        redirect('/');
    };


    return (
        <main className="flex justify-center">

            <Link
                href={'/'}
                className="absolute top-10 left-10 hover:underline hover:text-violet-500"
            >

                ir a Página principal
            </Link>


            <div className="w-full sm:w-[350px] px-10">

                {children}

            </div>
        </main>
    );
}
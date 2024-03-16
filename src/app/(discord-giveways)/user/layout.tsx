import { auth } from "@/auth.config";
import { redirect } from "next/navigation";



export default async function UserLayout({ children }: {
    children: React.ReactNode;
}) {

    const session = await auth();
    if (!session) {
        redirect('/')
    }
    return (
        <>
            {children}
        </>
    );
}
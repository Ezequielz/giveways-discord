import { Title } from "@/components";
import Link from "next/link";

export default function () {
    return (
        <div>
            <Title title="Administración" />
            <Link
                href={'/admin/dashboard/giveway'}
                className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 mt-2 px-4 rounded"
            >
                Crear sorteo
            </Link>
        </div>
    );
}
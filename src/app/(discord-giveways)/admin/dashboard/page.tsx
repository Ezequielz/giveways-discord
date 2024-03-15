import Link from "next/link";

export default function () {
    return (
        <div>
            <h1 className="mb-2">Admin page</h1>

            <Link
                href={'/admin/dashboard/giveway'}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-2 px-4 rounded"
            >
                Crear sorteo
            </Link>
        </div>
    );
}
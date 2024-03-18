'use client'
import { deleteGiveway } from '@/actions';
import Link from 'next/link'

interface Props {
    id: string;
    slug: string;
}

export const GivewaysBtns = ({ id, slug }: Props) => {

    const handleDelete = async () => {
        await deleteGiveway(id)
    }
    return (
        <>

            <td className="px-6 text-sm leading-5  whitespace-no-wrap border-b border-gray-200">
                {/* <Link href={`/giveway/${giveway.slug}/sort`} > */}
                <Link
                    href={`/admin/dashboard/give/${slug}`}
                    className='bg-orange-500 px-2 py-1 hover:bg-orange-600 rounded-xl text-white'>

                    sortear
                </Link>
                {/* </Link> */}


            </td>
            <td className="px-6 text-sm leading-5  whitespace-no-wrap border-b border-gray-200">
                <Link href={`/admin/dashboard/giveway/${slug}`}
                    className='bg-cyan-500 px-2 py-1 hover:bg-cyan-600 rounded-xl text-white'>
                    editar
                </Link>
            </td>
            <td className="px-6 text-sm leading-5  whitespace-no-wrap border-b border-gray-200">

                <button
                    onClick={() => handleDelete()}
                    className='bg-red-500 px-2 py-1 hover:bg-red-600 rounded-xl text-white'
                >

                    eliminar
                </button>


            </td>
        </>
    )
}

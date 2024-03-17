'use client'
import { deleteGiveway } from '@/actions';
import Link from 'next/link'

interface Props {
    id: string;
    slug: string;
}

export const GivewaysBtns = ({ id, slug }: Props) => {

    const handleDelete = async() => {
        await deleteGiveway(id)
    }
    return (
        <>

            <td className="px-6 text-sm leading-5  whitespace-no-wrap border-b border-gray-200">
                {/* <Link href={`/giveway/${giveway.slug}/sort`} > */}
                <button>

                    sortear
                </button>
                {/* </Link> */}


            </td>
            <td className="px-6 text-sm leading-5  whitespace-no-wrap border-b border-gray-200">
                <Link href={`/admin/dashboard/giveway/${slug}`} >
                <button>
                    editar

                </button>
                </Link>
            </td>
            <td className="px-6 text-sm leading-5  whitespace-no-wrap border-b border-gray-200">
              
                <button
                    onClick={() => handleDelete()}
                >

                    eliminar
                </button>
                

            </td>
        </>
    )
}

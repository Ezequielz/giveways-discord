'use client'
import Link from 'next/link'

interface Props {
    id: string;
    slug: string;
}

export const GivewaysBtns = ({ id, slug }: Props) => {
    return (
        <>

            <td
                className="px-6 text-sm leading-5  whitespace-no-wrap border-b border-gray-200">
                <Link href={`/giveway/${slug}`} >

                    ver
                </Link>
            </td>
            <td className="px-6 text-sm leading-5  whitespace-no-wrap border-b border-gray-200">
                {/* <Link href={`/giveway/${giveway.slug}/sort`} > */}
                <button>

                    sortear
                </button>
                {/* </Link> */}


            </td>
            <td className="px-6 text-sm leading-5  whitespace-no-wrap border-b border-gray-200">
                {/* <Link href={`/giveway/${giveway.slug}/edit`} > */}
                <button>
                    editar

                </button>
                {/* </Link> */}
            </td>
            <td className="px-6 text-sm leading-5  whitespace-no-wrap border-b border-gray-200">
                {/* <Link href={`/giveway/${giveway.slug}/delete`} > */}
                <button>

                    eliminar
                </button>
                {/* </Link> */}

            </td>
        </>
    )
}

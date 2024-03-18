'use client'
import { deleteUser } from '@/actions';

interface Props {
    id: string;
}

export const UserBtns = ({ id }: Props) => {

    const handleDelete = async () => {
        await deleteUser(id)
    }
    return (

        <td className="px-6 text-sm leading-5  whitespace-no-wrap border-b border-gray-200">

            <button
                onClick={() => handleDelete()}
                className='bg-red-500 px-2 py-1 hover:bg-red-600 rounded-xl text-white'
            >

                eliminar
            </button>


        </td>

    )
}

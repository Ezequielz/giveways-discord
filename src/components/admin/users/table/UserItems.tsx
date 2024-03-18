import { getAllGivewaysByStatus, getAllUsers } from '@/actions';
import { dateFormat } from '@/helpers';
import { StatusGiveway } from '@prisma/client';
import clsx from 'clsx';
import Image from 'next/image';
import { UserBtns } from './UserBtns';
import { RolesSelect } from '../roles/RolesSelect';
import { StatusSelect } from '../status/StatusSelect';

interface Props {
    status?: StatusGiveway
}
export const UserItems = async ({ status }: Props) => {
    const { ok, users } = await getAllUsers();

    if (!ok || !users) {
        return <p>Error al obtener los usuarios</p>;
    }
    return (
        <>
            {
                users.map(user => (
                    <tr key={user.id} className={
                        clsx(
                            'text-gray-500 ',
                            {
                                'bg-green-100': user.isActive,
                                'bg-red-200': !user.isActive,
                            }
                        )
                    }>
                        <td className=" px-6 border-b  border-gray-200">
                            <Image
                                src={user.image!}
                                alt='imagen de usuario'
                                width={50}
                                height={50}
                                className='rounded-full'
                            />

                        </td>

                        <td className=" text-sm text-gray-900 border-b border-gray-200 font-light px-6 py-3 whitespace-nowrap">
                            {user.name}
                        </td>

                        <td className="px-6 py-3 whitespace-no-wrap  border-b border-gray-200">
                            {user.discordId}
                        </td>
                        <td
                            className="px-6 text-sm leading-5  whitespace-no-wrap border-b border-gray-200">
                            <StatusSelect isActive={user.isActive} userId={user.id}/>
                        </td>
                        <td
                            className="px-6 text-sm leading-5  whitespace-no-wrap border-b border-gray-200">
                            <RolesSelect userId={user.id} role={user.role} />
                        </td>


                        <UserBtns id={user.id} />


                    </tr>
                ))
            }
        </>
    )
}

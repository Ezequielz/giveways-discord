import { getAllGivewaysByStatus } from '@/actions';
import { dateFormat } from '@/helpers';
import { StatusGiveway } from '@prisma/client';
import { GivewaysBtns } from './GivewaysBtns';
import { StatusSelect } from '../../ui/StatusSelect';

interface Props {
    status?: StatusGiveway
}
export const GivewaysITems = async ({ status }: Props) => {
    const { ok, giveways } = await getAllGivewaysByStatus(status);

    if (!ok || !giveways) {
        return <p>Error al obtener los giveways</p>;
    }
    return (
        <>
            {
                giveways.map(giveway => (
                    <tr key={giveway.id} className='text-gray-500 '>
                        <td className=" px-6 border-b  border-gray-200">
                            {giveway.name}
                        </td>

                        <td className=" text-sm text-gray-900 border-b border-gray-200 font-light px-6 py-3 whitespace-nowrap">
                            {/* <StatusSelect isActive={ giveway.status }/> */}
                        </td>

                        <td className="px-6 py-3 whitespace-no-wrap  border-b border-gray-200">
                            {giveway.quantityWinners}
                        </td>
                        <td
                            className="px-6 text-sm leading-5  whitespace-no-wrap border-b border-gray-200">
                            {giveway.participantLimit ?? 'ilimitados'}</td>
                        <td
                            className="px-6 text-sm leading-5  whitespace-no-wrap border-b border-gray-200">
                            {giveway.participants.length}
                        </td>
                        <td
                            className="px-6 text-sm leading-5  whitespace-no-wrap border-b border-gray-200">
                            {dateFormat(giveway.effectiveDate)}</td>
                            
                        <GivewaysBtns id={giveway.id} slug={giveway.slug} />
                     

                    </tr>
                ))
            }
        </>
    )
}

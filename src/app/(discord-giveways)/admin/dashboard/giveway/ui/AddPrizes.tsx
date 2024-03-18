import React from 'react'
import { PrizesForm } from './PrizesForm'
import { getGivewayById, getPrizesByGivewayslug } from '@/actions';

interface Props {
    id: string;
};

export const AddPrizes = async({ id }: Props) => {
    const { giveway } = await getGivewayById(id);
   

    if (!giveway) {
        return (
            <div>
                No se pudo obtener datos del sorteo con id: {id}
            </div>
        )
    };
    const { prizesOfGiveway } = await getPrizesByGivewayslug(giveway.slug );
  return (
    <PrizesForm  id={id} prizesOfGiveway={prizesOfGiveway!}/>
  )
}

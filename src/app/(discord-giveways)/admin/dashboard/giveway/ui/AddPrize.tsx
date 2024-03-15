import React from 'react'
import { PrizesForm } from './PrizesForm'
import { getGivewayById } from '@/actions';

interface Props {
    id: string
}

export const AddPrize = async({ id }: Props) => {
    const { giveway } = await getGivewayById(id);

    if (!giveway) {
        return (
            <div>
                No se pudo obtener datos del sorteo con id: {id}
            </div>
        )
    };
    
  return (
    <PrizesForm  id={id} quantity={giveway.quantityWinners ?? 1}/>
  )
}

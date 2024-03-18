import { Suspense } from 'react';
import { GivewayForm } from './ui/GivewayForm';
import { Title } from '@/components';
import { AddPrizes } from './ui/AddPrizes';

interface Props {
    searchParams: {
        id?: string
    },
};

export default async function ({ searchParams }: Props) {

    const id = searchParams.id;

    return (
        <div>
            <Title title="Creación de sorteo" />
            <GivewayForm active={!!id} />
            {
                id && (
                    <Suspense fallback={ <div>Cargando creacion de regalos...</div> }>
                        <AddPrizes id={id} />
                    </Suspense>

                )
            }
        </div>
    );
}
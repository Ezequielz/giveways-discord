import { Suspense } from 'react';
import { GivewayForm } from './ui/GivewayForm';
import { Title } from '@/components';
import { AddPrize } from './ui/AddPrize';

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
                        <AddPrize id={id} />
                    </Suspense>

                )
            }
        </div>
    );
}
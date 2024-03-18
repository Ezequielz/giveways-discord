import { Suspense } from 'react';
import { GivewayEdit } from './edit/Givewayedit';
import { PrizesEdit } from './edit/PrizesEdit';
import { getGivewayBySlug } from '@/actions';
import { StatusGiveway } from '@prisma/client';

interface Props {
    params: {
        slug: string
    },
};
export default async function ({ params }: Props) {

    const slug = params.slug;
    const {giveway} = await getGivewayBySlug(slug)
    // console.log(slug)
    if (giveway?.status === StatusGiveway.finalizado) {
        return (
            <div>
                Sorteo finalizado, no se puede modificar.
            </div>
        )
    }
    return (
        <div>
            <GivewayEdit slug={slug} />
            <Suspense fallback={<div>Cargando premios...</div>}>
                <PrizesEdit slug={slug} />
            </Suspense>
        </div>
    );
}
import { Suspense } from 'react';
import { GivewayEdit } from './edit/Givewayedit';
import { PrizesEdit } from './edit/PrizesEdit';

interface Props {
    params: {
        slug: string
    },
};
export default async function ({ params }: Props) {

    const slug = params.slug;
    console.log(slug)
    return (
        <div>
            <GivewayEdit slug={slug} />
            <Suspense fallback={<div>Cargando premios...</div>}>
                <PrizesEdit slug={slug} />
            </Suspense>
        </div>
    );
}
import { Suspense } from "react";
import { GivewayForm } from "../ui/GivewayForm";
import { AddPrize } from "../ui/AddPrize";

interface Props {
    params: {
        slug: string
    },
    searchParams: {
        id?: string
    },
}
export default function ({ params, searchParams }: Props) {
    console.log(params.slug)
    const id = searchParams.id;
    console.log(id)
    return (
        <div>

            <GivewayForm active={!!id} slug={params.slug} />
            {
                id && (
                    <Suspense fallback={<div>Cargando creacion de regalos...</div>}>
                        <AddPrize id={id} />
                    </Suspense>

                )
            }
        </div>
    );
}
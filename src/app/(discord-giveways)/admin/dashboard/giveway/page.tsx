import { getGivewayById } from "@/actions";
import { GivewayForm } from "./ui/GivewayForm";
import { PrizesForm } from "./ui/PrizesForm";
import { Title } from "@/components";
import { AddPrize } from "./ui/AddPrize";
import { Suspense } from "react";

interface Props {
    searchParams: {
        id?: string
    }
}

export default async function ({ searchParams }: Props) {

    const id = searchParams.id;

    console.log(id)
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
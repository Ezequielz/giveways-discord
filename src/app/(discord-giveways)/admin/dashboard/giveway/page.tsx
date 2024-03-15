import { getGivewayById } from "@/actions";
import { GivewayForm } from "./ui/GivewayForm";
import { PrizesForm } from "./ui/PrizesForm";

interface Props {
    searchParams: {
        id?: string
    }
}

export default async function ({ searchParams }: Props) {

    const id = searchParams.id;
    const { giveway } = await getGivewayById(id ?? '');
    
    return (
        <div>
            <h1>Creacion de sorteo</h1>
            <GivewayForm active={!!id} />
            {
                id && giveway!.quantityWinners && (
                   
                        <PrizesForm  id={id} quantity={giveway!.quantityWinners ?? 1}/>

                )
            }
        </div>
    );
}
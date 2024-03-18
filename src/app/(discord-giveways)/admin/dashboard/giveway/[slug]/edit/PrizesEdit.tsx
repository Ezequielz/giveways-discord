
import { getPrizesByGivewayslug } from "@/actions";
import { PrizeForm } from "./PrizeForm";


interface PrizeEditFormProps {
    slug: string;
}

export const PrizesEdit = async({ slug }: PrizeEditFormProps) => {

    const { prizesOfGiveway } = await getPrizesByGivewayslug(slug)

    if (!prizesOfGiveway) return null;
  
    return (
        <>
        
            <div className="flex gap-4  ">
                {prizesOfGiveway.map((prize, index) => (
                    <div key={prize.id} className='relative flex flex-col gap-2 bg-violet-600 p-4  rounded-xl'>
                       <PrizeForm prize={prize} slug={slug} index={index}/>

                    </div>
                ))}

            </div>


        </>
    );
};

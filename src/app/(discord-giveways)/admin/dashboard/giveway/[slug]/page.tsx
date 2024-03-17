import { Suspense } from "react";
import { GivewayForm } from "../ui/GivewayForm";
import { AddPrize } from "../ui/AddPrize";
import { GivewayEdit } from "./edit/Givewayedit";

interface Props {
    params: {
        slug: string
    },

}
export default function ({ params }: Props) {
  
    const slug = params.slug
    return (
        <div>

            <GivewayEdit  slug={slug} />
    
        </div>
    );
}
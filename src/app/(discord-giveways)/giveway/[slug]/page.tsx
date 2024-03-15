import { GivewayDetail, Title } from "@/components";
import { Suspense } from "react";

interface Props {
  params: {
    slug: string
  }
}

export default async function ({params}: Props) {
  
  return (
    <div>
      {/* <Title title="Detalle del sorteo activo"/> */}
      <Suspense fallback={ <div>Cargando detalles...</div> }>
        <GivewayDetail slug={params.slug}/>
      </Suspense>
    
     
    </div>
  );
}
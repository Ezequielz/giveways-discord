import { Giveways, Title } from "@/components";
import Image from "next/image";
import { Suspense } from "react";

export default function () {
  return (
    <div>
      <Title title="Todos los Sorteos activos"/>
      <Suspense fallback={ <div>Cargando sorteos...</div> }>
        <Giveways />
      </Suspense>
      <Image 
        src={'/codequest/wink.png'}
        alt="wink"
        width={300}
        height={300}
        className="absolute bottom-0 right-0"
      />
    </div>
  );
}
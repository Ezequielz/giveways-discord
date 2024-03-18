import { Give, Title } from "@/components";
import { notFound } from "next/navigation";
import { Suspense } from "react";


interface Props {
  params: {
    slug: string
  }
}
export default function ({ params }: Props) {
  const slug = params.slug;


  if (!slug) {
    notFound()
  }
  return (
    <div>
      <Title title="Sortear!" />
      <Suspense fallback={ <div>Cargando participantes</div> }>

        <Give slug={slug} />
      </Suspense>
    </div>
  );
}
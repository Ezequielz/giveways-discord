import { getGivewayByName } from "@/actions";

interface Props {
  params: {
    slug: string
  }
}

export default async function ({params}: Props) {
  const giveway = await getGivewayByName(params.slug)
  console.log(giveway)
  return (
    <div>
      <h1>Detalle del sorteo activo</h1>
      <pre>
        {JSON.stringify(giveway, null, 2)} 
      
      </pre>
    </div>
  );
}
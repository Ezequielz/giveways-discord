import { Give, Title } from "@/components";
import { notFound } from "next/navigation";


interface Props {
  params: {
    slug: string
  }
}
export default function ({params}: Props) {
  const slug = params.slug;


  if (!slug) {
    notFound()
  }
  return (
    <div>
      <Title title="Sortear!"/>

      <Give  slug={slug}/>
    </div>
  );
}
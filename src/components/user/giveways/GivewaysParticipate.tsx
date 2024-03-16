import { auth } from "@/auth.config"


export const GivewaysParticipate = async() => {
    const session = await auth();
    

  return (
    <div>GivewaysParticipate</div>
  )
}

import { checkUserMember } from "@/actions";
import { auth } from "@/auth.config";
import { DiscordBtn, ParticipateBtn } from "@/components";


export default async function () {
  const session = await auth()
  const {ok, data} = await checkUserMember()
  
  return (
    <main className="flex flex-col justify-center items-center">
      <h1>Discord Giveways</h1>

      {
        session ? (
          <ParticipateBtn />
        ) : (
          <div  className="w-fit">
                <span>Inicia session para participar</span>
                <DiscordBtn label="Continuar con discord" />
            </div>
        )
      }
    </main>
  );
}

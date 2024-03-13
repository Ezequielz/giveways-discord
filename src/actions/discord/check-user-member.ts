'use server'

import { auth } from "@/auth.config";

export const checkUserMember = async () => {

  const session = await auth();
  if (!session) return {
      ok: false,
      message: 'Debe iniciar session'
    }

  try {

    const options = {
      method: 'GET',
      headers: {
        //   'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.user.token}`,
        // 'Authorization': `Bot ${process.env.DISCORD_TOKEN}`
      }

    };


    const response = await fetch(`${process.env.DISCORD_API}/v10/users/@me/guilds/1130900724499365958/member`, options);
    const data = await response.json();

    if (data.message)
      return {
        ok: false,
        message: data.message
      }

    return {
      ok: true,
      data
    };

  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error
    };
  };

}
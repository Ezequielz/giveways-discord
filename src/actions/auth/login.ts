'use server'

import { signIn } from '@/auth.config';
import { BuiltInProviderType } from 'next-auth/providers';
import { LiteralUnion, SignInOptions} from 'next-auth/react';

export const Login = async (
  provider?: LiteralUnion<BuiltInProviderType> | undefined,
  options?: SignInOptions | undefined,
  // authorizationParams?: SignInAuthorizationParams | undefined
) => {
  try {
      
    return signIn(provider, options);
  } catch (error) {
      console.log(error)

      return undefined
  }

};
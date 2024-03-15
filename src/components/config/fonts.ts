import { Inter, Montserrat_Alternates,Akaya_Kanadaka,  Agbalumo  } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });


export const textFont = Akaya_Kanadaka({ 
  subsets: ['latin'],
  weight: ['400'],
});
export const subtitleFont = Agbalumo({ 
  subsets: ['latin'],
  weight: ['400'],
});
export const titleFont = Montserrat_Alternates({ 
  subsets: ['latin'],
  weight: ['400','800'],
});
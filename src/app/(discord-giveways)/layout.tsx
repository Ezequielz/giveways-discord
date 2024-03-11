
import { Suspense } from 'react';
import { Navbar } from '@/components';


export default function ShortLayout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
    
      
        <Suspense fallback={ <div>Cargando...</div> }>
            <Navbar />
        </Suspense>
      

      <section className="flex-1 m-auto max-w-[1200px] ">
        {children}
      </section>


    
    </main>
  );
}
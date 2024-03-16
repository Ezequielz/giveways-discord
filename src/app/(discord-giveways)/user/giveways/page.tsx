import { Suspense } from 'react';
import { GivewaysParticipate, Title } from '@/components';

export default function () {
  return (
    <div>
      <Title title="Sorteos que el usaurio está Participando"/>
      <Suspense fallback={ <div>Cargando giveways...</div> }>
        <GivewaysParticipate />
      </Suspense>
    </div>
  );
}
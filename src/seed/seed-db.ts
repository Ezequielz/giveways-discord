

import prisma from '../lib/prisma';
import { initialData } from './seed';



async function main() {
    await prisma.user.deleteMany();

    const { users } = initialData;

    await prisma.user.createMany({
        data: users
    });

    console.log('Seed Ejecutado correctamente');
}



(() => {
    if (process.env.NODE_ENV === 'production') return;
    main();
})();
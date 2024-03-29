'use client'
import { useRouter } from 'next/navigation';
import { IoIosArrowDown } from 'react-icons/io';
import { enqueueSnackbar } from 'notistack';
import { setUserStatus } from '@/actions';

interface Props {
    isActive: boolean;
    userId: string;
   
};


export const StatusSelect = ({ isActive, userId }: Props) => {

    const router = useRouter();

    const updateStatus = async (value: string) => {
        const status: boolean = value === 'true' ? true : false;
        const { ok, message } = await setUserStatus(userId, status);
        if (!ok) {
            // console.log(message);
            return enqueueSnackbar('Hubo un error al cambiar el esatdo', { variant: "error" });
        };

        enqueueSnackbar(`El usuario ahora está ${status ? 'Activo' : 'Baneado'} `, { variant: "success" });
        return router.refresh();



    };

    return (
        <div className="relative inline-flex self-center">
            <IoIosArrowDown size={20} className="absolute top-0.5 right-0.5 pointer-events-none" />
            <select
                onChange={(e) => updateStatus(e.target.value)}
                className="text-sm font-bold rounded border-2 border-violet-700 text-gray-600 h-fit w-fit pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
            >
                <option value="true" selected={isActive}> Activo </option>
                <option value="false" selected={!isActive}> {userId ? 'Baneado' : 'Inactivo'} </option>
            </select>
        </div>
    )
}
'use client'
import Image from 'next/image';
import { useUIStore } from '@/store';

interface Props {
    img: string;
    alt?: string;
}
export const Avatar = ({ img, alt = 'imagen' }: Props) => {
    const openSideMenu = useUIStore(state => state.openSideMenu);
    return (
        <Image
            onClick={openSideMenu}
            src={img}
            alt={alt}
            width={30}
            height={30}
            className="cursor-pointer rounded-full"
        />
    )
}

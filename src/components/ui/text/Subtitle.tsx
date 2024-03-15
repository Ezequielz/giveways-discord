import { subtitleFont } from "@/components/config/fonts";

interface Props {
    subtitle: string;
}

export const Subtitle = ({ subtitle }: Props) => {
    return (
        <h1 className={`
    ${subtitleFont.className}  flex justify-center text-3xl 
    `}>{subtitle}</h1>
    )
}
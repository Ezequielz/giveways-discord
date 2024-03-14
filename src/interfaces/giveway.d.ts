

export interface Giveway {
    name: string;
    effectiveDate: Date;
    prizes: Prize[];
    status?: boolean;
    participantLimit?: number;
    quantityWinners?: number;
    updatedAt?: Date;
}

export interface Prize {
    name: string;
    description: string;
    image: string | null;
}

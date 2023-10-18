export interface Suscription {
    id?: number;
    planName: string;
    paymentId: string;
    paymentAmount: number;
    paymentCurrency: string;
    paymentDate?: string;
    paymentExpirationDate?: string;
}
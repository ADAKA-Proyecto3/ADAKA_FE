export interface Suscription {
    id?: number;
    paymentId: string;
    planName: string;
    paymentAmount: number;
    paymentCurrency: string;
    paymentDate?: string;
    paymentExpirationDate?: string;
    shippingAddress?:{
        provincia: string;
        canton: string;
        distrito: string;
        address: string;

    };
}
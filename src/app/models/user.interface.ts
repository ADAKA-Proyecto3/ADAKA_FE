export interface User {
    id?: number;
    name: string;
    role?: string | null;
    status?: string | null;
    phone: string;
    email: string;
    password?: string | null;
}
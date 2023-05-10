export interface Product {
    id?: number;
    name: string;
    price: number;
    location: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface ProductResponce {
    data: Product[],
    totalPages: number,
    totalItems: number
}
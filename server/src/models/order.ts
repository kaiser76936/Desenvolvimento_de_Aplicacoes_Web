import { Product } from './product';

export interface ProductOrder extends Product {
    quantity: number;
}

export interface Order {
    id: number;                    
    userId: number;               
    products: ProductOrder[];     
    status: string;               
    createdAt: Date;              
    updatedAt?: Date;             
}
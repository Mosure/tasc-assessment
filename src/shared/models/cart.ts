import { CartItem } from './cart-item';

export interface Cart {
    id?: number;
    alias: string;
    timestamp?: Date;
    items: CartItem[];
}

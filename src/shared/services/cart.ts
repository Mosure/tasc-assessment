import React from 'react';
import { Observable, of } from 'rxjs';

import { Cart, CartInfo, CartItem } from '../models';

/**
 * Manages cart state and invoice calculations
 *
 * TODO: Add load cart from remote option
 */
export interface ICartService {
    loadCart: () => void;
    saveCart: () => void;
    purchaseCart: () => Observable<string>;

    getCart: (id?: string) => Observable<Cart>;
    getLocalCart: (cart: Cart) => Cart;
    getCartInfo: (cart: Cart) => CartInfo;

    addToCart: (cartItem: CartItem) => void;
    editItem: (cartItem: CartItem) => void;
    removeItem: (cartItem: CartItem) => CartItem | undefined;

    getCartItemTax: (cartItem: CartItem) => number;
    getCartItemPrice: (cartItem: CartItem) => number;
    getCartItemTaxedPrice: (cartItem: CartItem) => number;
}

/**
 * Implementation of the ICartService
 */
export class CartService implements ICartService {
    protected SALES_TAX = 0.1;
    protected IMPORT_TAX = 0.05;

    protected _cart: Cart = {
        items: [],
    };

    public loadCart = () => {
        const cartData = localStorage.getItem('cart');

        if (cartData) {
            const parsed = JSON.parse(cartData);

            if (parsed.items) {
                this._cart = parsed;
            }
        }
    }

    public saveCart = () => {
        localStorage.setItem('cart', JSON.stringify(this.getCart()));
    }

    public getLocalCart = (): Cart => {
        return this._cart;
    }

    public purchaseCart = (): Observable<string> => {
        // Submit the cart to the server (returning the created cart id)
        // Clear the local cart

        return of('');
    }

    public getCart = (id?: string): Observable<Cart> => {
        // This denotes a remote call instead of the local cart
        if (id) {
            // Get cart from remote
        }

        return of(this._cart);
    }

    public getCartInfo = (cart: Cart): CartInfo => {
        const info: CartInfo = {
            salesTaxes: 0,
            total: 0,
        };

        for (const cartItem of cart.items) {
            info.salesTaxes += this.getCartItemTax(cartItem);
            info.total += this.getCartItemPrice(cartItem);
        }

        return info;
    }

    public addToCart = (cartItem: CartItem) => {

        this.saveCart();
    }

    public editItem = (cartItem: CartItem) => {

        this.saveCart();
    }

    public removeItem = (cartItem: CartItem): CartItem | undefined => {
        this.saveCart();

        return undefined;
    }

    public getCartItemTax = (cartItem: CartItem): number => {
        const cost = this.getCartItemPrice(cartItem);
        let tax = 0;

        if (cartItem.item.taxable) {
            tax += cost * this.SALES_TAX;
        }

        if (cartItem.item.imported) {
            tax += cost * this.IMPORT_TAX;
        }

        return tax;
    }

    public getCartItemPrice = (cartItem: CartItem): number => {
        return cartItem.qty * cartItem.item.price;
    }

    public getCartItemTaxedPrice = (cartItem: CartItem): number => {
        return this.getCartItemPrice(cartItem) + this.getCartItemTax(cartItem);
    }
}

export const CartServiceContext = React.createContext(new CartService());

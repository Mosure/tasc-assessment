import React from 'react';
import { Observable, of, Subject, merge } from 'rxjs';

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

    onUpdate: () => Observable<Cart>;
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

    private _onUpdateSubject = new Subject<Cart>();
    private readonly _STORAGE_CART = 'tasc.cart.v1';

    constructor() {
        this.loadCart();
    }

    public loadCart = () => {
        const cartData = localStorage.getItem(this._STORAGE_CART);

        if (cartData) {
            const parsed = JSON.parse(cartData);

            if (parsed.items) {
                this._cart = parsed;
            }
        }
    }

    public saveCart = () => {
        localStorage.setItem(this._STORAGE_CART, JSON.stringify(this.getLocalCart()));
        this.sendUpdate();
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
        const cart = this.getLocalCart();

        let found = false;
        for (const existingItem of cart.items) {
            if (existingItem.item.id === cartItem.item.id) {
                existingItem.qty += cartItem.qty;
                found = true;
                break;
            }
        }

        if (!found) {
            cart.items.push(cartItem);
        }

        this.saveCart();
    }

    public editItem = (cartItem: CartItem) => {
        const cart = this.getLocalCart();

        for (const existingItem of cart.items) {
            if (existingItem.item.id === cartItem.item.id) {
                existingItem.qty = cartItem.qty;
                break;
            }
        }

        this.saveCart();
    }

    public removeItem = (cartItem: CartItem): CartItem | undefined => {
        const cart = this.getLocalCart();

        const indexToRemove = cart.items.findIndex((item) => item.item.id === cartItem.item.id);

        let removed;
        if (indexToRemove !== -1) {
            removed = cart.items[indexToRemove];
            cart.items.splice(indexToRemove, 1);
        }

        this.saveCart();

        return removed;
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

    public onUpdate = (): Observable<Cart> => {
        return merge(of(this.getLocalCart()), this._onUpdateSubject.asObservable());
    }

    protected sendUpdate = () => {
        this._onUpdateSubject.next(this.getLocalCart());
    }
}

export const CartServiceContext = React.createContext(new CartService());

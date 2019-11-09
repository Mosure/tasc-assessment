import React from 'react';
import { Observable, of, Subject, merge, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import rp, { RequestPromiseOptions } from 'request-promise';
import uuidv1 from 'uuid/v1';

import { Cart, CartInfo, CartItem } from '../models';
import config from '../../config.json';

/**
 * Manages cart state and invoice calculations
 *
 * TODO: Add load cart from remote option
 */
export interface ICartService {
    loadCart: () => void;
    saveCart: () => void;
    purchaseCart: () => Observable<string>;

    getCart: (id: string) => Observable<Cart>;
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
        alias: uuidv1(),
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
        const cart = this.getLocalCart();

        const options: RequestPromiseOptions = {
            baseUrl: config.api.base,
            json: true,
            body: cart,
        };

        return from(rp.post('/invoices', options))
        .pipe(
            tap(() => {
                cart.items = [];
                this.saveCart();
            }),
            map((result) => result.id),
        );
    }

    public getCart = (id: string): Observable<Cart> => {
        const options: RequestPromiseOptions = {
            baseUrl: config.api.base,
            json: true,
        };

        return from(rp.get('/invoices/' + id, options));
    }

    public getCartInfo = (cart: Cart): CartInfo => {
        const info: CartInfo = {
            salesTaxes: 0,
            total: 0,
        };

        for (const cartItem of cart.items) {
            info.salesTaxes += this.getCartItemTax(cartItem);
            info.total += this.getCartItemTaxedPrice(cartItem);
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
            tax += Math.ceil(cost * this.SALES_TAX * 20) / 20;
        }

        if (cartItem.item.imported) {
            tax += Math.ceil(cost * this.IMPORT_TAX * 20) / 20;
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

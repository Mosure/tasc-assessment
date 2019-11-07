import { Cart, CartInfo, CartItem } from '../models';

export class CartService {
    private readonly SALES_TAX = 0.1;
    private readonly IMPORT_TAX = 0.05;

    private _cart: Cart = {
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

    public getCart = (): Cart => {
        return this._cart;
    }

    public getCartInfo = (): CartInfo => {
        const info: CartInfo = {
            salesTaxes: 0,
            total: 0,
        };

        const cart = this.getCart();

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
        const cost = this.getCartItemCost(cartItem);
        let tax = 0;

        if (cartItem.item.taxable) {
            tax += cost * this.SALES_TAX;
        }

        if (cartItem.item.imported) {
            tax += cost * this.IMPORT_TAX;
        }

        return tax;
    }

    public getCartItemCost = (cartItem: CartItem): number => {
        return cartItem.qty * cartItem.item.cost;
    }

    public getCartItemPrice = (cartItem: CartItem): number => {
        return this.getCartItemCost(cartItem) + this.getCartItemTax(cartItem);
    }
}

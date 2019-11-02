import { Cart, CartInfo, CartItem } from '../models';

const SALES_TAX = 0.1;
const IMPORT_TAX = 0.05;

let _cart: Cart = {
    items: [],
};

export const loadCart = () => {
    const cartData = localStorage.getItem('cart');

    if (cartData) {
        const parsed = JSON.parse(cartData);

        if (parsed.items) {
            _cart = parsed;
        }
    }
};

export const saveCart = () => {
    localStorage.setItem('cart', JSON.stringify(getCart()));
};

export const getCart = (): Cart => {
    return _cart;
};

export const getCartInfo = (): CartInfo => {
    const info: CartInfo = {
        salesTaxes: 0,
        total: 0,
    };

    const cart = getCart();

    for (const cartItem of cart.items) {
        info.salesTaxes += getCartItemTax(cartItem);
        info.total += getCartItemPrice(cartItem);
    }

    return info;
};

export const addToCart = (cartItem: CartItem) => {

    saveCart();
};

export const editItem = (cartItem: CartItem) => {

    saveCart();
};

export const removeItem = (cartItem: CartItem): CartItem | undefined => {
    saveCart();

    return undefined;
};

export const getCartItemTax = (cartItem: CartItem): number => {
    const cost = getCartItemCost(cartItem);
    let tax = 0;

    if (cartItem.item.taxable) {
        tax += cost * SALES_TAX;
    }

    if (cartItem.item.imported) {
        tax += cost * IMPORT_TAX;
    }

    return tax;
};

export const getCartItemCost = (cartItem: CartItem): number => {
    return cartItem.qty * cartItem.item.cost;
};

export const getCartItemPrice = (cartItem: CartItem): number => {
    return getCartItemCost(cartItem) + getCartItemTax(cartItem);
};

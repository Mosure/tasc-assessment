import React, { useContext, useEffect, useState } from 'react';
import {
    Typography,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';

import {
    CartServiceContext,
    Cart as CartModel,
} from '../shared';
import { Invoice } from './invoice';

export const InvoiceViewer: React.FC = () => {
    const cartService = useContext(CartServiceContext);
    const { id } = useParams();

    const emptyCart: CartModel = { items: [] };

    const [cartState, setCartState] = useState({
        cart: emptyCart,
        cartInfo: { total: 0, salesTaxes: 0 },
    });

    useEffect(() => {
        const subscription = cartService.getCart(id)
        .subscribe((cart) => {
            if (cart) {
                setCartState({
                    cart,
                    cartInfo: cartService.getCartInfo(cart),
                });
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [id, cartService]);

    return (
        <>
            <Typography variant='h5'>
                Cart Invoice - {id}
            </Typography>

            <Invoice cart={cartState.cart} noActions/>
        </>
    );
};

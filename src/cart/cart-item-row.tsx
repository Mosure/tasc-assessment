import React, { useContext } from 'react';
import {
    TableRow,
    TableCell,
    IconButton,
} from '@material-ui/core';
import CurrencyFormat from 'react-currency-format';

import {
    CartServiceContext,
    CartItem,
} from '../shared';
import { Remove } from '@material-ui/icons';

export interface Props {
    item: CartItem;
    noActions?: boolean;
}

export const CartItemRow: React.FC<Props> = (props: Props) => {
    const cartService = useContext(CartServiceContext);

    const removeItem = () => {
        cartService.removeItem(props.item);
    };

    return (
        <TableRow>
            <TableCell>{props.item.item.name}</TableCell>
            <TableCell align='right'>{props.item.qty}</TableCell>
            <TableCell align='right'>
                <CurrencyFormat
                    value={cartService.getCartItemTaxedPrice(props.item)}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'$'}
                    decimalScale={2}
                    fixedDecimalScale
                />
            </TableCell>
            
            {
                !props.noActions &&
                <TableCell align='right'>
                    <IconButton onClick={removeItem}>
                        <Remove/>
                    </IconButton>
                </TableCell>
            }
        </TableRow>
    );
};

import React, { useContext } from 'react';
import {
    TableRow,
    TableCell,
    IconButton,
    makeStyles,
    createStyles,
    Tooltip,
} from '@material-ui/core';
import CurrencyFormat from 'react-currency-format';
import { Remove, LocalShippingOutlined } from '@material-ui/icons';

import {
    CartServiceContext,
    CartItem,
} from '../shared';

export interface Props {
    item: CartItem;
    noActions?: boolean;
}

const useStyles = makeStyles((theme) =>
    createStyles({
        importedCell: {
            width: '2em',
        },
    }),
);

export const CartItemRow: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const cartService = useContext(CartServiceContext);

    const removeItem = () => {
        cartService.removeItem(props.item);
    };

    return (
        <TableRow>
            <TableCell align='center' className={classes.importedCell}>
                {
                    props.item.item.imported &&
                    <Tooltip title='Imported'>
                        <LocalShippingOutlined/>
                    </Tooltip>
                }
            </TableCell>
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
                    <Tooltip title='Remove'>
                        <IconButton onClick={removeItem}>
                            <Remove/>
                        </IconButton>
                    </Tooltip>
                </TableCell>
            }
        </TableRow>
    );
};

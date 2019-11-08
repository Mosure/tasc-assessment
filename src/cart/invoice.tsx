import React, { useContext } from 'react';
import {
    createStyles,
    makeStyles,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from '@material-ui/core';
import CurrencyFormat from 'react-currency-format';

import {
    CartServiceContext, Cart,
} from '../shared';
import { CartItemRow } from './cart-item-row';

const useStyles = makeStyles((theme) =>
    createStyles({
        table: {
            minWidth: 700,
        },
        tableHeader: {
            fontWeight: 'bold',
        },
    }),
);

export interface Props {
    cart: Cart;
    noActions?: boolean;
}

export const Invoice: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const cartService = useContext(CartServiceContext);

    const cartInfo = cartService.getCartInfo(props.cart);

    return (
        <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell className={classes.tableHeader}>Imported</TableCell>
                    <TableCell className={classes.tableHeader}>Item Name</TableCell>
                    <TableCell className={classes.tableHeader} align='right'>Qty</TableCell>
                    <TableCell className={classes.tableHeader} align='right'>Price</TableCell>

                    {
                        !props.noActions &&
                        <TableCell className={classes.tableHeader} align='right'>Actions</TableCell>
                    }
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    props.cart.items.map((item, index) => (
                        <CartItemRow key={index} item={item} noActions={props.noActions}/>
                    ))
                }
                <TableRow>
                    <TableCell rowSpan={2} colSpan={2}/>
                    <TableCell className={classes.tableHeader}>Taxes</TableCell>
                    <TableCell align='right'>
                        <CurrencyFormat
                            value={cartInfo.salesTaxes}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'$'}
                            decimalScale={2}
                            fixedDecimalScale
                        />
                    </TableCell>

                    {
                        !props.noActions &&
                        <TableCell/>
                    }
                </TableRow>
                <TableRow>
                    <TableCell className={classes.tableHeader}>Total</TableCell>
                    <TableCell align='right'>
                        <CurrencyFormat
                            value={cartInfo.total}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'$'}
                            decimalScale={2}
                            fixedDecimalScale
                        />
                    </TableCell>

                    {
                        !props.noActions &&
                        <TableCell/>
                    }
                </TableRow>
            </TableBody>
        </Table>
    );
};

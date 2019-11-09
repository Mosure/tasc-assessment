import React, { useContext, useEffect, useState } from 'react';
import {
    createStyles,
    makeStyles,
    Card,
    CardContent,
    CardActions,
    Button,
    Grid,
    Typography,
} from '@material-ui/core';
import CurrencyFormat from 'react-currency-format';

import { Item, CartServiceContext } from '../shared';

const useStyles = makeStyles((theme) =>
    createStyles({
        card: {
            height: '100%',
            position: 'relative',
            minHeight: '200px',
        },
        name: {
            color: theme.palette.text.primary,
            fontSize: '1.5rem',
        },
        price: {
            color: theme.palette.text.hint,
            fontSize: '1.25em',
        },
        added: {
            color: theme.palette.text.disabled,
        },
        cardActions: {
            position: 'absolute',
            bottom: '0px',
            width: '100%',
        },
        actionContainer: {
            width: '100%',
        },
    }),
);

export const CatalogItem: React.FC<Item> = (item: Item) => {
    const classes = useStyles();
    const cartService = useContext(CartServiceContext);
    const [itemInCart, setItemInCart] = useState({
        count: 0,
    });

    const addItemToCart = () => {
        cartService.addToCart({
            item,
            qty: 1,
        });
    };

    useEffect(() => {
        const subscription = cartService.onUpdate()
        .subscribe((cart) => {
            for (const cartItem of cart.items) {
                if (cartItem.item.id === item.id) {
                    setItemInCart({
                        count: cartItem.qty,
                    });

                    break;
                }
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [cartService, item.id]);

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant='h2' className={classes.name}>
                    {item.name}
                </Typography>
                <Typography variant='h6' className={classes.price}>
                    <CurrencyFormat
                        value={item.price}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'$'}
                        decimalScale={2}
                        fixedDecimalScale
                    />
                </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Grid
                    container
                    direction='column'
                    alignItems='flex-end'
                    justify='flex-end'
                    spacing={1}
                    className={classes.actionContainer}
                >
                    <Grid item>
                        {
                            itemInCart.count > 0 &&
                            <Typography variant='body2' className={classes.added}>
                                {itemInCart.count} {itemInCart.count > 1 ? 'items' : 'item'} in cart
                            </Typography>
                        }
                    </Grid>
                    <Button size='small' color='primary' onClick={addItemToCart}>Add to Cart</Button>
                </Grid>
            </CardActions>
        </Card>
    );
};

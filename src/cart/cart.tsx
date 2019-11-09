import React, { useContext, useEffect, useState } from 'react';
import {
    createStyles,
    makeStyles,
    Grid,
    Container,
    Paper,
    Button,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import {
    Header,
    Footer,
    CartServiceContext,
    Cart as CartModel,
} from '../shared';
import { Invoice } from './invoice';

const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
            height: '100vh',
            paddingTop: '48px',
        },
        root: {
            width: '100%',
            marginTop: theme.spacing(3),
            overflowX: 'auto',
            paddingBottom: '24px',
        },
        buttonContainer: {
            paddingTop: '24px',
            paddingRight: '24px',
        },
    }),
);

export const Cart: React.FC = () => {
    const classes = useStyles();
    const cartService = useContext(CartServiceContext);
    const history = useHistory();

    const emptyCart: CartModel = { items: [], alias: '' };

    const [cartState, setCartState] = useState({
        cart: emptyCart,
        cartInfo: { total: 0, salesTaxes: 0 },
    });

    useEffect(() => {
        const subscription = cartService.onUpdate()
        .subscribe((cart) => {
            setCartState({
                cart,
                cartInfo: cartService.getCartInfo(cart),
            });
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [cartService]);

    const purchaseCart = () => {
        cartService.purchaseCart()
        .subscribe((cartId: string) => {
            history.push('/invoice/' + cartId);
        });
    };

    return (
        <>
            <Header/>

            <Container maxWidth='md' className={classes.container}>
                <Grid
                    container
                    justify='center'
                >
                    <Paper className={classes.root}>
                        <Invoice cart={cartState.cart}/>

                        <Grid container justify='flex-end' className={classes.buttonContainer}>
                            <Button
                                color='secondary'
                                variant='contained'
                                disabled={cartState.cart.items.length === 0}
                                onClick={purchaseCart}
                            >
                                Purchase
                            </Button>
                        </Grid>
                    </Paper>
                </Grid>
            </Container>

            <Footer/>
        </>
    );
};

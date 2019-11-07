import React, { useContext, useEffect, useState } from 'react';
import {
    createStyles,
    makeStyles,
    Grid,
    Container,
} from '@material-ui/core';

import {
    Header,
    Footer,
    ItemsServiceContext,
    PagedResult,
    Item,
} from '../shared';

const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
            height: '100vh',
            paddingTop: '48px',
        },
    }),
);

export const Cart: React.FC = () => {
    const classes = useStyles();

    return (
        <>
            <Header/>

            <Container maxWidth='lg' className={classes.container}>
                <Grid
                    container
                    justify='center'

                >
                    <Grid item>
                        <Grid
                            container
                            justify='space-between'
                            alignItems='stretch'
                            spacing={6}
                        >
                            
                        </Grid>
                    </Grid>
                </Grid>
            </Container>

            <Footer/>
        </>
    );
};

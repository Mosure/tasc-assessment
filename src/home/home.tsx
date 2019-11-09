import React, { useContext, useEffect, useState } from 'react';
import {
    createStyles,
    makeStyles,
    Grid,
    Container,
    Typography,
} from '@material-ui/core';

import {
    Header,
    Footer,
    ItemsServiceContext,
    PagedResult,
    Item,
} from '../shared';
import { CatalogItem } from './catalog-item';

const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
            height: '100vh',
            paddingTop: '36px',
        },
        itemContainer: {
            padding: '36px',
        },
        title: {
        },
    }),
);

export const Home: React.FC = () => {
    const classes = useStyles();
    const itemsService = useContext(ItemsServiceContext);

    const blankPage: PagedResult<Item> = {
        data: [],
        offset: 0,
        total: 0,
    };

    const [pageResult, setPageResult] = useState(blankPage);

    useEffect(() => {
        const subscription = itemsService.getItems()
            .subscribe((result) => setPageResult(result));

        return () => {
            subscription.unsubscribe();
        };
    }, [itemsService]);

    return (
        <>
            <Header/>

            <Container maxWidth='lg' className={classes.container}>
                <Typography variant='h2' className={classes.title}>
                    Catalog
                </Typography>

                <Grid
                    container
                    justify='center'
                    className={classes.itemContainer}
                >
                    <Grid item>
                        <Grid
                            container
                            justify='space-between'
                            alignItems='stretch'
                            spacing={6}
                        >
                            {
                                pageResult.data.map((item, index) => {
                                    return (
                                        <Grid
                                            item
                                            key={index}
                                            xs={12}
                                            sm={6}
                                            md={4}
                                            lg={3}
                                        >
                                            <CatalogItem {...item}/>
                                        </Grid>
                                    );
                                })
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Container>

            <Footer/>
        </>
    );
};

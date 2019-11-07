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
import { CatalogItem } from './catalog-item';

const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
            height: '100vh',
            paddingTop: '48px',
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
        itemsService.getItems()
            .subscribe((result) => setPageResult(result));
    }, [itemsService]);

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

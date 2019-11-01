import React from 'react';
import {
    createStyles,
    makeStyles,
    Grid,
    Container,
} from '@material-ui/core';

import { Header, Footer } from '../shared';

const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
            height: '100vh',
        },
    }),
);

export const Home: React.FC = () => {
    const classes = useStyles();

    return (
        <>
            <Header/>

            <Container maxWidth='lg'>
                <Grid
                    container
                    justify='center'
                    className={classes.container}
                >
                    Home
                </Grid>
            </Container>

            <Footer/>
        </>
    );
};

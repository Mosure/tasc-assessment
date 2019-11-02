import React from 'react';
import {
    createStyles,
    makeStyles,
    AppBar,
    Toolbar,
    Grid,
    IconButton,
    Badge,
} from '@material-ui/core';

import { Home, ShoppingCart } from '@material-ui/icons';

import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) =>
    createStyles({
        grid: {
            width: '100%',
        },
    }),
);

export const Header: React.FC = () => {
    const classes = useStyles();

    return (
        <>
            <AppBar>
                <Toolbar>
                    <Grid
                        container
                        justify='space-between'
                        alignItems='center'
                        className={classes.grid}
                    >
                        <Grid item>
                            <IconButton
                                to='/'
                                component={Link}
                                color='secondary'
                            >
                                <Home/>
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton
                                to='/cart'
                                component={Link}
                                color='secondary'
                            >
                                <Badge color='error' badgeContent={2}>
                                    <ShoppingCart/>
                                </Badge>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Toolbar/>
        </>
    );
};

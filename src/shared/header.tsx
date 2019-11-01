import React from 'react';
import {
    createStyles,
    makeStyles,
    AppBar,
    Toolbar,
    Grid,
    IconButton,
} from '@material-ui/core';

import { Home, NavigateNext } from '@material-ui/icons';

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
                                to='/'
                                component={Link}
                                color='secondary'
                            >
                                <NavigateNext/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Toolbar/>
        </>
    );
};

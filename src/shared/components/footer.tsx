import React from 'react';
import {
    createStyles,
    makeStyles,
    Grid,
    Typography,
    Link,
} from '@material-ui/core';

const useStyles = makeStyles((theme) =>
    createStyles({
        footer: {
            height: '128px',
            backgroundColor: theme.palette.primary.dark,
        },
        consoleFont: {
            fontFamily: '"SF Mono", "Roboto Mono", "Lucida Console", Monaco, monospace, sans-serif',
            fontSize: '0.86rem',
        },
    }),
);

export const Footer: React.FC = () => {
    const classes = useStyles();

    return (
        <Grid
            container
            justify='center'
            alignItems='center'
            alignContent='center'
            direction='column'
            className={classes.footer}
        >
            <Grid item>
                <Typography className={classes.consoleFont} variant='body2'>
                    Built by {' '}
                    <Link
                        color='secondary'
                        href='https://mitchell.mosure.me'
                        target='_blank'
                    >
                        {'Mitchell Mosure'}
                    </Link>
                </Typography>
            </Grid>
        </Grid>
    );
};

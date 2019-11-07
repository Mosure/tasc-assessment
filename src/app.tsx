import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import { Cart } from './cart';
import { Home } from './home';
import { theme } from './theme';

export const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <BrowserRouter>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route exact path='/cart' component={Cart}/>

                        <Redirect to='/'/>
                    </Switch>
            </BrowserRouter>
        </ThemeProvider>
    );
};

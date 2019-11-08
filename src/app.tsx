import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import { Cart, InvoiceViewer } from './cart';
import { Home } from './home';
import { theme } from './theme';

export const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Home}/>

                    <Route path='/cart' component={Cart}/>

                    <Route path='/invoice/:id' component={InvoiceViewer}/>

                    <Redirect to='/'/>
                </Switch>
            </BrowserRouter>
        </ThemeProvider>
    );
};

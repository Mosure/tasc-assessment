import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import { theme } from './theme';
import { Home } from './home';

export const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <BrowserRouter>
                    <Switch>
                        <Route exact path='/' component={Home}/>

                        <Redirect to='/'/>
                    </Switch>
            </BrowserRouter>
        </ThemeProvider>
    );
};

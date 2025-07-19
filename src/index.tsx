/* @refresh reload */
import './index.css';
import { render } from 'solid-js/web';
import { Route, Router } from "@solidjs/router";

import App from './App';
import NotFound from './pages/not-found';
import SignIn from './pages/sign-in';
import Users from './pages/users';
import Products from './pages/products';
import Dashboard from './pages/dashboard';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'No se encuentra el elemento "root" en el index.html para renderizar la app',
  );
}

render(
    () => (
        <Router>
            <Route path="/" component={App} />
            <Route path="/auth/signin" component={SignIn} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/products" component={Products} />
            <Route path="/users" component={Users} />
            <Route path="**" component={NotFound} />
        </Router>
    ),
    root
);
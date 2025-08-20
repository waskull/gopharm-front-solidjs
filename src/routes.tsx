import { Route, Router } from "@solidjs/router";
import App from './App';
import NotFound from './pages/not-found';
import SignIn from './pages/sign-in';
import Users from './pages/users';
import Products from './pages/products';
import Dashboard from './pages/dashboard';
import { JSX } from "solid-js";

import { useNavigate } from "@solidjs/router";
import { onMount } from "solid-js";
import { authStore } from "./store";


export const PrivateRoute = (props) => {
    const navigate = useNavigate();
    onMount(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) navigate("/auth/signin", { replace: true });
        fetch('https://dummyjson.com/auth/me', {
            method: 'GET',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json', 'Authorization': `${token}` }
        }).then(res => res.json()).then((data: User) => {
            console.log(data);
            if (!data || data?.message === "Invalid/Expired Token!" || data?.message === "Token Expired!") {
                navigate("/auth/signin", { replace: true });
            }
            authStore.login(data.firstName + " " + data.lastName, data.role, data.image);
            if (!authStore.user.isAuthenticated) navigate("/auth/signin", { replace: true })
        }).catch(err => {
            console.log(err);
            navigate("/auth/signin", { replace: true });
        });

    });
    return (
        <>
            {authStore.user.isAuthenticated && props.children}
        </>
    );
};

export const PublicRoute = (props) => {
    onMount(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            fetch('https://dummyjson.com/auth/me', {
                method: 'GET',
                credentials: 'same-origin',
                headers: { 'Content-Type': 'application/json', 'Authorization': `${token}` }
            }).then(res => res.json()).then((data: User) => {
                console.log(data);
                if (!data || data?.message === "Invalid/Expired Token!" || data?.message === "Token Expired!") {
                    return;
                }
                authStore.login(data.firstName + " " + data.lastName, data.role, data.image);
            }).catch(err => {
                console.log(err);
            });
        }
    });
    return (
        <>
            {props.children}
        </>
    );
};

const Routes = (): JSX.Element => {
    return (
        <Router>
            <Route path="/" component={() => <PublicRoute><App /></PublicRoute>} />
            <Route path="/auth/signin" component={() => <PublicRoute><SignIn /></PublicRoute>} />
            <Route path="/dashboard" component={() => <PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/products" component={() => <PrivateRoute><Products /></PrivateRoute>} />
            <Route path="/users" component={() => <PrivateRoute><Users /></PrivateRoute>} />
            <Route path="**" component={NotFound} />
        </Router>
    );
}

export default Routes;


export interface User {
    message?: string;
    id: number
    firstName: string
    lastName: string
    maidenName: string
    age: number
    gender: string
    email: string
    phone: string
    username: string
    password: string
    birthDate: string
    image: string
    bloodGroup: string
    height: number
    weight: number
    eyeColor: string
    hair: Hair
    ip: string
    address: Address
    macAddress: string
    university: string
    bank: Bank
    company: Company
    ein: string
    ssn: string
    userAgent: string
    crypto: Crypto
    role: string
}

export interface Hair {
    color: string
    type: string
}

export interface Address {
    address: string
    city: string
    state: string
    stateCode: string
    postalCode: string
    coordinates: Coordinates
    country: string
}

export interface Coordinates {
    lat: number
    lng: number
}

export interface Bank {
    cardExpire: string
    cardNumber: string
    cardType: string
    currency: string
    iban: string
}

export interface Company {
    department: string
    name: string
    title: string
    address: Address2
}

export interface Address2 {
    address: string
    city: string
    state: string
    stateCode: string
    postalCode: string
    coordinates: Coordinates2
    country: string
}

export interface Coordinates2 {
    lat: number
    lng: number
}

export interface Crypto {
    coin: string
    wallet: string
    network: string
}

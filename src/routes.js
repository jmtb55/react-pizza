import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import Home from './features/home/home';
import DefaultLayout from './shared/layout/defaultLayout';
import Login from './features/auth/login';
import { useSelector } from 'react-redux';

const AuthenticatedGuard = ({ children }) => {
    const authState = useSelector(state => state.auth);
    return authState.session ? <>{children}</> : <><Navigate to='/login'/></>;
}

const UnathenticatedGuard = ({ children }) => {
    const authState = useSelector(state => state.auth);
    return authState.session === null ? <>{children}</> : <><Navigate to='/'/></>;
}

export default function AppRouter () {
    const routes = useRoutes([
        {
            path: '/',
            element: (
                <AuthenticatedGuard>
                    <DefaultLayout>
                        <Home/>
                    </DefaultLayout>
                </AuthenticatedGuard>
            ),
        },
        {
            path: '/login',
            element: (
                <UnathenticatedGuard>
                    <Login/>
                </UnathenticatedGuard>
            ),
        },
        {
            path: '*',
            element: (
                <AuthenticatedGuard>
                    <DefaultLayout>
                        <Home/>
                    </DefaultLayout>
                </AuthenticatedGuard>
            ),
        }
    ]);
    return routes;
}
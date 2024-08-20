import { createBrowserRouter, Navigate } from "react-router-dom";
import { AuthLayout } from "./Pages/_layout/auth";
import { SignIn } from "./Pages/Auth/signIn";
import { SignUp } from "./Pages/Auth/signUp";
import { AppLayout } from "./Pages/_layout/app";
import { Workouts } from "./Pages/App/workouts-page/workouts";
import { Weight } from "./Pages/App/weight-page/weight";
import { Stats } from "./Pages/App/stats-page/stats";
import { ReactNode } from "react";

interface ProtectedRouteProps {
    children: ReactNode
}

// eslint-disable-next-line react-refresh/only-export-components
function ProtectedRoute({ children }: ProtectedRouteProps){
    const userId = localStorage.getItem('userId');

    if(!userId){
        return <Navigate to="/sign-in" replace/>
    }

    return children
}

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <AppLayout />,
            </ProtectedRoute>
        ),
        children: [
            { path: '/', element: <Workouts /> },
            { path: '/weight', element: <Weight /> },
            { path: '/statistics', element: <Stats /> },
        ]
    },
    {
        path: '/',
        element: <AuthLayout />,
        children: [
            { path: '/sign-in', element: <SignIn /> },
            { path: '/sign-up', element: <SignUp /> }
        ]
    }
]);

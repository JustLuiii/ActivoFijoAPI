import { Navigate } from "react-router";
import { ReactNode } from "react";

export const PublicRoute = ({ children }: { children: ReactNode }) => {

    const token = localStorage.getItem("token");
    return !token ? children : <Navigate to="/" replace />
}
import { Navigate, Outlet,  } from "react-router-dom";

const ProtectedRoute = () => {
    const isLoggedIn = localStorage.getItem('id_token') !== null;
    // const isLoggedIn = user && user.loggedIn;
    return (
        isLoggedIn ? (
            <Outlet />
        ) : (
            <Navigate to="/signin" />
        )
    );
}

export default ProtectedRoute;
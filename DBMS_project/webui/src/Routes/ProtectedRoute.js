import { Navigate, Outlet,  } from "react-router-dom";

const useAuth = () => {
    const user = { loggedIn: true, userId: "pinyan" };
    return user && user.loggedIn;
};

const ProtectedRoute = () => {
    const isLoggedIn = useAuth();
    return (
        isLoggedIn ? (
            <Outlet />
        ) : (
            <Navigate to="/signin" />
        )
    );
}

export default ProtectedRoute;
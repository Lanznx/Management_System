import { Navigate, Outlet, Route} from "react-router-dom";

const useAuth = () => {
    const user = { loggedIn: false, userId: null };
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
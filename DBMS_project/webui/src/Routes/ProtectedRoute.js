import { Navigate,  } from "react-router-dom";

const useAuth = () => {
    const user = { loggedIn: false, userId: null };
    return user && user.loggedIn;
};

const ProtectedRoute = () => {
    const isLoggedIn = useAuth();
    return (
        <Route
            render={() =>
                isLoggedIn ? (
                    <Navigate to="/sys/dashboard" />
                ) : (
                    <Navigate to="/signin" />
                )
            } 
        />
}

export default ProtectedRoute;
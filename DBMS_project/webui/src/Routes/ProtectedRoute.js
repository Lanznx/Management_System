import { Navigate,  } from "react-router-dom";

const useAuth = () => {
    const user = { loggedIn: true, userId: "pinyan" };
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
import { Navigate,  } from "react-router-dom";

const useAuth = () => {
    const user = { loggedIn: false, userId: null };
    return user && user.loggedIn;
};

const ProtectedRoute = ({ children, ...rest }) => {
    const isLoggedIn = useAuth();
    return (
        <Route
            {...rest}
            render={({ location }) =>
                isLoggedIn ? (
                    children
                ) : (
                    <Navigate to={{ pathname: "/signin", state: { from: location } }} />
                )
            }
        />
    );
}

export default ProtectedRoute;
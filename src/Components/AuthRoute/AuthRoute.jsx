import { jwtDecode } from 'jwt-decode';
import { Navigate } from 'react-router-dom';

function AuthRoute({ children }) {
    const currentTime = Date.now();
    const localStorageToken = localStorage.getItem("token");

    if (localStorageToken) {
        const decodedToken = jwtDecode(localStorageToken);
        console.log(decodedToken);

        const isAuthenticated = decodedToken.exp * 1000 > currentTime;
        console.log(isAuthenticated)
        if (isAuthenticated) {
            return children;

        }
        else {
            return <Navigate to="/login" replace />
        }
    } else {
        // If there is no token, redirect to login
        return <Navigate to="/login" replace />;
    }
}

export default AuthRoute;
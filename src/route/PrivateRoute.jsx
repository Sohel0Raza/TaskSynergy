
import { Navigate, useLocation } from "react-router-dom";
import useLocalStorage from "use-local-storage";

const PrivateRoute = ({ children }) => {
    const [loginUser, setLoginUser] = useLocalStorage("loginUser");
    console.log('loginUser :', loginUser);
    const location = useLocation()
    if (loginUser) {
        return children
    }
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>

};

export default PrivateRoute;
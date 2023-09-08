
import { Navigate, useLocation } from "react-router-dom";
import useUser from "../hooks/useUser";

const PrivateRoute = ({ children }) => {
    const [user, loading] = useUser()
    const location = useLocation()
    if (loading) {
      return  <div className="flex justify-center md:mt-52"><span className="loading loading-bars loading-xs"></span>
           <span className="loading loading-bars loading-sm"></span>
           <span className="loading loading-bars loading-md"></span>
           <span className="loading loading-bars loading-lg"></span></div>
   }
    if (user && !loading) {
        return children
    }
    
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>

};

export default PrivateRoute;
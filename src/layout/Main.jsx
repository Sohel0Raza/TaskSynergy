import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../shared/Navbar";

const Main = () => {
    const location = useLocation()
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signup')
    return (
        <div>
           {noHeaderFooter || <Navbar></Navbar>}
            <Outlet />
        </div>
    );
};

export default Main;
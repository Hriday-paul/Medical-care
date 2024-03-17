import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../../Components/Shared/Navbar/Navbar";
import Footer from "../../Components/Shared/Footer/Footer";

const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet />
            <Footer/>
            <ScrollRestoration />
        </div>
    );
};

export default Root;
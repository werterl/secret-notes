import {Outlet} from "react-router-dom";

import Header from "../components/Header";
import config from "../config";

// The MainLayout component represents the global layout for all pages
export default function MainLayout() {
    return (
        <>
            <Header
                image={config.APP_LOGO}
                caption={config.APP_NAME}
            />
            <Outlet/>
        </>
    );
}

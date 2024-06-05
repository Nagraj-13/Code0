import App from "./App";
import Dashboard from "./Components/Dashboard";
import AnimalMap from "./Components/AnimalMap";
import AnimalPath from "./Components/AnimalPath";
import {Route,createBrowserRouter, createBrowserRouterFromElements} from "react-router-dom";

const router = createBrowserRouter(
    createBrowserRouterFromElements(
        <Route path="/" element={<App/>}>
            <Route path="" element={<Dashboard/>}/>
            <Route path="" element={<Dashboard/>}/>
        </Route>
    )
)
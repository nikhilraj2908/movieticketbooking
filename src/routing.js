import { BrowserRouter, Route, Routes} from "react-router-dom";
import './components/loginform/loginform'
import { Loginform } from "./components/loginform/loginform";
import Dashboard from "./components/dashboard/dashboard";
import { Ticketbooking } from "./components/ticketbooking/ticketbooking";
import { Registeruser } from "./components/registerform/registeruser";
export function Routing() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Dashboard/>}></Route>
                    <Route path="/loginuser" element={<Loginform/>}></Route>
                    <Route path="/registeruser" element={<Registeruser/>}></Route>
                    <Route path="/ticketbooking" element={<Ticketbooking/>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}
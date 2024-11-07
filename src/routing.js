import { BrowserRouter, Route, Routes} from "react-router-dom";
import './components/loginform/loginform'
import { Loginform } from "./components/loginform/loginform";
import Dashboard from "./components/dashboard/dashboard";
import { Ticketbooking } from "./components/ticketbooking/ticketbooking";
import { Registeruser } from "./components/registerform/registeruser";
import { useCookies } from "react-cookie";
import { Admindashboard } from "./admin/admindashboard";
import { Adminmainpage } from "./admin/adminmainpage";
export function Routing() {
    const[cookie,setcookie,removecookie]=useCookies();
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Dashboard/>}></Route>
                    <Route path="/loginuser" element={<Loginform/>}></Route>
                    <Route path="/registeruser"  element={<Registeruser/>}></Route>
                    <Route path="/ticketbooking" element={cookie.username?<Ticketbooking/>:<Dashboard/>}></Route>
                    <Route path="/admindashboard" element={<Admindashboard/>}></Route>
                    <Route path="/adminmainpage"element={<Adminmainpage/>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}
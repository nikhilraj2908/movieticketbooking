import { BrowserRouter, Route, Routes } from "react-router-dom";
import './components/loginform/loginform'
import { Loginform } from "./components/loginform/loginform";
import Dashboard from "./components/dashboard/dashboard";
import { Ticketbooking } from "./components/ticketbooking/ticketbooking";
import { Registeruser } from "./components/registerform/registeruser";
import { useCookies } from "react-cookie";
import { Admindashboard } from "./admin/admindashboard";
import { Adminmainpage } from "./admin/adminmainpage";
import { Adminlogin } from "./admin/adminloginpage";
import { Ticketbookpage } from "./components/ticketbooking/ticketbookpage";
import { Ticketgeneration } from "./components/ticketbooking/ticketgeneration";
export function Routing() {
    const [cookie, setcookie, removecookie] = useCookies();
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Dashboard />}></Route>
                    <Route path="/loginuser" element={<Loginform />}></Route>
                    <Route path="/registeruser" element={<Registeruser />}></Route>
                    <Route path="/ticketbooking" element={cookie.username ? <Ticketbooking /> : <Dashboard />}></Route>
                    <Route path="/admindashboard" element={cookie.admin ? <Admindashboard /> : <Adminlogin />}></Route>
                    <Route path="/adminmainpage" element={cookie.admin ? <Adminmainpage /> : <Adminlogin />}></Route>
                    <Route path="/adminlogin" element={<Adminlogin />}></Route>
                    <Route path='/ticketbookpage/:id' element={cookie.username ? <Ticketbookpage /> : <Loginform />}></Route>
                    <Route path="/ticketgeneration/:id" element={<Ticketgeneration/>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}
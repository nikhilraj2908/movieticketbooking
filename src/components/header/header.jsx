import { useCookies } from "react-cookie"
import './header.css'
import { Link } from "react-router-dom";
import { useState } from "react";
export function Header() {
    const [cookie,setcookie,removecookie]=useCookies();
    const[selecteditem,setselecteditem]=useState("home");
    function logoutclick(){
        removecookie('username');
    }
    function navitemclick(item){
        setselecteditem(item)
    }
    return (

        <>
            <div className="position-sticky top-0 z-2">
                <header className="px-5 bg-light d-flex justify-content-between align-items-center" style={{height:"10vh"}}>
                    <div className="fs-4">Logo</div>
                    <nav className="d-flex fs-6">
                        <span className={`nav-items ${selecteditem=="home"?"bg-primary btn text-light":"bg-light"}`} onClick={()=>navitemclick("home")}> <Link to='/ticketbooking'>Home</Link></span>
                        <span className={`nav-items ${selecteditem=="showtimings"?"bg-primary btn text-light":"bg-light"}`} onClick={()=>navitemclick("showtimings")}><a  href="javascript:void(0)">Showtimings</a></span>
                        <span className={`nav-items ${selecteditem=="cinema"?"bg-primary btn text-light":"bg-light"}`} onClick={()=>navitemclick("cinema")}><a href="javascript:void(0)">Cinema</a></span>
                        <span className={`nav-items ${selecteditem=="offers"?"bg-primary btn text-light":"bg-light"}`} onClick={()=>navitemclick("offers")}><a href="javascript:void(0)">Offers</a></span>
                        <span className={`nav-items ${selecteditem=="more"?"bg-primary btn text-light":"bg-light"}`} onClick={()=>navitemclick("more")}>
                            <select className="form-select " style={{border:"none", backgroundColor:"transparent"}}>
                                <option>More</option>
                                <option>advertise</option>
                                <option>About us</option>
                                <option>experience</option>
                                <option>Corporate Boking</option>
                            </select>
                        </span>
                    </nav>
                    <div>
                        <button onClick={logoutclick} className="btn btn-danger">Logout</button>
                    </div>
                </header>
            </div>
        </>
    )
}
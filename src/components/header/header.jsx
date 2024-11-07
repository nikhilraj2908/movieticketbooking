import { useCookies } from "react-cookie"
import './header.css'
export function Header() {
    const [cookie,setcookie,removecookie]=useCookies();
    function logoutclick(){
        removecookie('username');
    }
    return (

        <>
            <div className="position-sticky top-0 z-2">
                <header className="px-5 bg-light d-flex justify-content-between align-items-center" style={{height:"10vh"}}>
                    <div className="fs-4">Logo</div>
                    <nav className="d-flex fs-6">
                        <span className="nav-items">home</span>
                        <span className="nav-items">showtimings</span>
                        <span className="nav-items">cinema</span>
                        <span className="nav-items">Offers</span>
                        <span className="nav-items">
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
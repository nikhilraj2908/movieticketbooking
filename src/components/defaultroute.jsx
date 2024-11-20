import { Link } from "react-router-dom";

export function Defaultcomponent(){
    return(
        <>
            <h2 className="text-danger">404 wrong route parameter</h2>
            <Link to="/">Go to home</Link>
        </>
    )
}
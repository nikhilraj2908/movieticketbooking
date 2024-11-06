import { useNavigate } from "react-router-dom";

const Dashboard=()=>{
    const navigate=useNavigate();
    function loginuserclicked(){
        navigate('/loginuser');
    }  
    function registeruserclicked(){
        navigate('/registeruser');
    }
    return(
        <>
            <div className="d-flex justify-content-center  align-items-center" style={{height:"100vh"}}>
                <button onClick={loginuserclicked} className="btn btn-warning me-3">login user</button>
                <button onClick={registeruserclicked} className="btn btn-success">register user</button>
            </div>
        </>
    )
}
export default Dashboard;
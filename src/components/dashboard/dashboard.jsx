import { useNavigate } from "react-router-dom";
import "./dashboard.css"
const Dashboard = () => {
    const navigate = useNavigate();
    function loginuserclicked() {
        navigate('/loginuser');
    }
    function registeruserclicked() {
        navigate('/registeruser');
    }
    function loginadminclicked(){
        navigate('/admindashboard');
    }
    return (
        <>
            <div className="dashboard-bg">
                <div className="d-flex justify-content-center  align-items-center" style={{ height: "100vh" }}>
                    <button onClick={loginuserclicked} className="btn btn-warning me-3">Login user</button>
                    <button onClick={registeruserclicked} className="btn btn-success me-3">Register user</button>
                    <button onClick={loginadminclicked} className="btn btn-danger ">Login as admin</button>
                </div>
            </div>
        </>
    )
}
export default Dashboard;
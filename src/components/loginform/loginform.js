import axios from "axios";
import { useState } from "react"
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import './loginform.css'
export function Loginform(){
    const navigate=useNavigate();
    const[userdetails,setuserdetails]=useState();
    const [cookie,setcookie,removecookie]=useCookies();
    async function frmsubmit(e){
        e.preventDefault();
        try{
            const responce=await axios.post("http://127.0.0.1:2000/loginuser",userdetails)
            navigate('/ticketbooking');
            alert("loged in sufully")
            setcookie("username",userdetails.uname)
        }
        catch(err){
            console.log(err);
            alert("wrong info entered");
        }
    }
    function handlechange(e){
        const name=e.target.name;
        const value=e.target.value;
        setuserdetails({...userdetails,[name]:value});
    }
    return(
        <>
            <div className="login-bg">
            <form onSubmit={frmsubmit} className="d-flex text-light   justify-content-center align-items-center " style={{height:"100vh"}}>
                <dl className="p-4 m-4 bg-transparent rounded " style={{border:"1px solid gray", boxShadow:"1px 1px 7px 5px"}}>
                    <h4>Login user</h4>
                    <dt>username</dt>
                    <dd>
                        <input onChange={handlechange} className='form-control' name="uname" placeholder="username"></input>
                    </dd>
                    <dt>password</dt>
                    <dd>
                        <input onChange={handlechange} className="form-control" type="password" name="password" placeholder="password"></input>
                    </dd>
                    <button className="w-100 btn btn-success bi bi-person-fill">login</button>
                    <p>don't have account <Link to="/registeruser">register</Link>now </p>
                </dl>
            </form>
            </div>
        </>
    )
}
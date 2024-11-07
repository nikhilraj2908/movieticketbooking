import { useState } from "react"
import axios from 'axios';
import { Link } from "react-router-dom";
import './registeruser.css'
export function Registeruser(){
    const [userdetails, setUserdetails] = useState({
                uname: '',
                password: '',
                email: ''
            });
        
    function handlechange(e){       
        const name=e.target.name;
        const value=e.target.value;
        setUserdetails(prevstate=>({...prevstate,[name]:value}))
    }
    async function frmsubit(e) {
        e.preventDefault(); 
        try {
            const response = await axios.post("http://127.0.0.1:2000/registeruser", userdetails); // Send userdetails in the request body
            console.log(response.data); // Handle the response as needed
            alert("user registered succefully")
            setUserdetails({
                uname: '',
                password: '',
                email: ''
            })
        } catch (error) {
            console.error("There was an error registering the user!", error); // Handle errors
        }
    }
    return(
        <>
            
            <div className="registeruser-bg">
            <form onSubmit={frmsubit} className="d-flex text-light justify-content-center align-items-center " style={{height:"100vh"}} >
                
                <dl className="p-4 m-4 bg-transparent rounded" style={{border:"1ps solid gray", boxShadow:"1px .5px 7px 5px"}}>
                    <h4>Register yourself</h4>
                    <dt>username</dt>
                    <dd>
                        <input onChange={handlechange} className='form-control' value={userdetails.uname} name="uname" placeholder="username"></input>
                    </dd>
                    <dt>password</dt>
                    <dd>
                        <input onChange={handlechange}  className="form-control" value={userdetails.password} name="password" placeholder="password"></input>
                    </dd>
                    <dt>mailid</dt>
                    <dd >
                        <input onChange={handlechange}  type="email" value={userdetails.email} name="email" placeholder="enter mail id" className="form-control" ></input>
                    </dd>
                    <button className="w-100 btn btn-success bi bi-person-fill">Register</button>
                    <p>already have acount <Link to='/loginuser'> login</Link></p>
                </dl>
            </form>
            </div>
        </>
    )
}
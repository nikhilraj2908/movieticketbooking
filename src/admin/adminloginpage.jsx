import {Formik,Field, ErrorMessage,Form} from 'formik';
import * as Yup from "yup"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
export function Adminlogin(){
    const[cookies,setcookie,removecookie]=useCookies(['admin']);
    const navigate=useNavigate();
    const initialValues={
        AdminName:"",
        AdminPassword:""
    }

   const validationSchema=Yup.object({
    AdminName:Yup.string().min(3,"min 3 letters should be there"),
    AdminPassword:Yup.string().min(3,"min 3 letters should be there")
   })

  async function onSubmit(value,{resetForm}){
    try{
        const response=await axios.post("http://127.0.0.1:2000/loginadmin",value);
    if (response.status === 200) {
        alert("Login successful");
        setcookie('admin', value.AdminName);
        navigate('/admindashboard')
        resetForm();
    }}
    catch(err){
        alert("check your credentials")
        console.log(err);
    }
}

   
    return(
        <>
           <div className='admindashboard-bg d-flex text-light justify-content-center align-items-center' style={{height:"100vh"}}>
           <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >

                <Form className='p-3' style={{border:"1px solid gray", boxShadow:"1px .5px 7px 2px"}}>
           <h4>Admin login</h4>

                    <div>
                        <div>
                            <label htmlFor='AdminName'>Admin Username </label>
                            <Field name="AdminName" type="text" id="AdminName" className="form-control"></Field>
                            <ErrorMessage name='AdminName' component="div" style={{color:"red"}}></ErrorMessage>
                        </div>
                        <div>
                            <label htmlFor='AdminPassword'>Admin Password</label>
                            <Field name="AdminPassword" className="form-control" type="password" id="AdminPassword"></Field>
                            <ErrorMessage name="AdminPassword" component="div" style={{color:"red"}}></ErrorMessage>    
                        </div>
                        <div>
                            <button type="submit" className=" mt-2 w-100 btn btn-primary">Login</button>
                        </div>
                        <div className='d-flex justify-content-between'>
                            go to 
                        <Link className='' to='/'>dashboard </Link>
                        /   
                        <Link to="/loginuser">Userlogin</Link>
                        </div>
                    </div>
                </Form>

            </Formik>
           </div>
        </>
    )
}
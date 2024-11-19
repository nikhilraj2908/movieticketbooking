import axios from "axios";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom"
import { useReactToPrint } from "react-to-print";
export function Ticketgeneration(){
    const param=useParams();
    const contentRef = useRef();
    const[ticketdata,setticketdata]=useState({})
    const printticcketclicked = useReactToPrint({ contentRef });
    
    async function getticketdetails() {
        try {
            const response = await axios.get(`http://127.0.0.1:2000/getticket/${param.id}`);
            console.log("API Response:", response.data); // Debugging log
            setticketdata(response.data); // Set the actual ticket data
        } catch (error) {
            console.error("Error fetching ticket details:", error);
        }
    }
    useEffect(()=>{
        getticketdetails()
        console.log(param);
    },[])

    return(
        <>
            <div className="bg-dark text-light  d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
                <div ref={contentRef} className="card w-25" style={{height:"60%"}}>
                    <div className=" card-header">
                        <h1 className="text-center">Print ticket</h1>
                    </div>
                    <div className="card-body">
                        <dl>
                            <dt>Movie Name</dt>
                            <dd>{ticketdata.moviename}</dd>
                            <dt>Date</dt>
                            <dd>{moment(ticketdata.date).format('MMMM Do YYYY')}</dd>
                            <dt>Time</dt>
                            <dd>{ticketdata.time}</dd>
                            <dt>Venue</dt>
                            <dd>{ticketdata.cinema}</dd>
                        </dl>
                    </div>
                    <div className="card-footer">
                        <button onClick={printticcketclicked} className="btn btn-warning">Print</button>
                    </div>
                </div>
                
            </div>
        </>
    )
}
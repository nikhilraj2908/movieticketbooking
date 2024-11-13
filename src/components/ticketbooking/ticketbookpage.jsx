import { useEffect, useState } from "react";
import { Header } from "../header/header";
import pvrsimg from '../../assets/images/moviepvrs.png'
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";

export function Ticketbookpage() {
    const params = useParams()
    const [moviedata, setmoviedata] = useState({});
    const [image, setimage] = useState("");
    const[selecteddate,setselecteddate]=useState("today")
    async function getmoviedata(movieid) {
        const movie = await axios.get(`http://127.0.0.1:2000/movie/${movieid}`);
        setmoviedata(movie.data);
    }
    useEffect(() => {
        console.log(params.id);
        getmoviedata(params.id);
    }, [params.id]);
    function btndateclick(day){
        setselecteddate(day)
    }
    return (
        <div>
            <Header></Header>
            <div className="row bg-secondary">
                <span className="col-3 ">
                    <figure className="d-flex justify-content-center align-items-center" style={{ height: "350px" }}>
                        <img
                            src={`http://127.0.0.1:2000/fileById/${moviedata.photoId}`}
                            alt="movie poster"
                            width="55%"
                        ></img>
                        {/* <figcaption className="d-block">cvbnm</figcaption> */}
                    </figure>
                </span>
                <span className="col-9">
                    <div className="d-flex align-items-center" style={{ height: "350px" }}>
                        <div >
                            <h3 className="mb-4">TITLE : {moviedata.name?moviedata.name.toUpperCase():"loading..."}</h3>
                            <div className="my-2">
                                <span>U/A</span>
                                <span className="mx-2 bi bi-box-fill">&nbsp;2h48min</span>
                                <span className="bi bi-box-fill ">&nbsp;{moviedata.subtitle ? "SUBTITLE : AVAILABLE" : "SUBTITLE : NOT AVAILABLE "}</span>
                                <span className="bi bi-box-fill mx-1">&nbsp; LANGUAGE : {moviedata.language?moviedata.language.toUpperCase():"loading...."}</span>
                            </div>
                            <div className="w-75 my-2"><p>MOVIE DESCRIPTION : Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum nemo aut dolores eligendi odit dolore iure, iste ad, nobis sapiente officia dolorum quasi minus saepe hic magnam. Eaque, debitis non.</p></div>
                            <div>
                                <img src={pvrsimg} alt="pvr" width="30%"></img>
                            </div>
                            <button className="p-0 mt-4 btn btn-link text-dark" >View more</button>
                        </div>
                    </div>
                </span>
            </div>
            <div  className="d-flex btn-group col-3 m-2">
                <button onClick={()=>btndateclick("today")} className={`btn ${selecteddate==="today"?"btn-primary":"btn-light"}`}>{moment().format('MMMM DD')}</button>    
                <button onClick={()=>btndateclick("tomorrow")} className={`btn ${selecteddate==="tomorrow"?"btn-primary":"btn-light"} `}>{moment().add(1, 'days').format('MMMM DD')}</button>    
            </div>
            <div className="bg-light " style={{height:"100vh"}}>

            </div>
        </div>
    )
}
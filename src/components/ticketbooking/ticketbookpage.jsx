import { useEffect, useState } from "react";
import { Header } from "../header/header";
import pvrsimg from '../../assets/images/moviepvrs.png'
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";
import SeatMap from "../seatscomponent/seatscomponent";
import { Field, Form, Formik } from "formik";

export function Ticketbookpage() {
    const params = useParams()
    const [moviedata, setmoviedata] = useState({});
    const [image, setimage] = useState("");
    const [selecteddate, setselecteddate] = useState("today")
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [finaldata,setfinaldata]=useState({})
    async function getmoviedata(movieid) {
        const movie = await axios.get(`http://127.0.0.1:2000/movie/${movieid}`);
        setmoviedata(movie.data);
    }
    useEffect(() => {
        console.log(params.id);
        getmoviedata(params.id);
    }, [params.id]);
    function btndateclick(day) {
        setselecteddate(day)
    }

    const handleSelectedSeats = (seats) => {
        console.log('Selected seats:', seats);
        setSelectedSeats(seats);
    };
    const initialValues = {
        date: "",
        time: "",
        cinema: "",
        seatscount: selectedSeats,
    }
    async function onSubmit(values, { resetForm }) {
        const updatedValues = {
            ...values,
            seatscount: selectedSeats, // Get the latest selectedSeats here
        };
        console.log("form submitted succefully", updatedValues)
        setfinaldata(updatedValues);
        resetForm();
    }
    async function bookClick(){
        const data=await axios.post('http://127.0.0.1:2000/ticketdata',finaldata);
        console.log(data);
    }
    return (
        <div>
            <Header></Header>
            <div  className="container-fluid">
                <div className=" d-flex bg-secondary text-light ">
                    <span className="col-3 ">
                        <div className="d-flex justify-content-center align-items-center" style={{ height: "390px" }}>
                            <figure className="text-center">
                                <img
                                    src={`http://127.0.0.1:2000/fileById/${moviedata.photoId}`}
                                    alt="movie poster"
                                    width="55%"
                                ></img>
                                <figcaption className="d-block">Poster : {moviedata.name}</figcaption>
                            </figure>
                        </div>

                    </span>
                    <span className="col-9">
                        <div className="d-flex align-items-center" style={{ height: "350px" }}>
                            <div >
                                <h3 className="mb-4">TITLE : {moviedata.name ? moviedata.name.toUpperCase() : "loading..."}</h3>
                                <div className="my-2">
                                    <span>U/A</span>
                                    <span className="mx-2 bi bi-box-fill">&nbsp;2h48min</span>
                                    <span className="bi bi-box-fill ">&nbsp;{moviedata.subtitle ? "SUBTITLE : AVAILABLE" : "SUBTITLE : NOT AVAILABLE "}</span>
                                    <span className="bi bi-box-fill mx-1">&nbsp; LANGUAGE : {moviedata.language ? moviedata.language.toUpperCase() : "loading...."}</span>
                                </div>
                                <div className="w-75 my-2"><p>MOVIE DESCRIPTION : Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum nemo aut dolores eligendi odit dolore iure, iste ad, nobis sapiente officia dolorum quasi minus saepe hic magnam. Eaque, debitis non.</p></div>
                                <div>
                                    <img src={pvrsimg} alt="pvr" width="30%"></img>
                                </div>
                                <button className="p-0 mt-4 btn btn-link text-light" >View more</button>
                            </div>
                        </div>
                    </span>
                </div>
                <div className="d-flex btn-group col-3 m-2">
                    <button onClick={() => btndateclick("today")} className={`btn ${selecteddate === "today" ? "btn-primary" : "btn-light"}`}>{moment().format('MMMM DD')}</button>
                    <button onClick={() => btndateclick("tomorrow")} className={`btn ${selecteddate === "tomorrow" ? "btn-primary" : "btn-light"} `}>{moment().add(1, 'days').format('MMMM DD')}</button>
                </div>
                <div className="bg-light  w-100 p-0 m-0" >
                    <div className="bg-dark text-light" >
                        <SeatMap onSeatSelectionChange={handleSelectedSeats} />
                        {
                            console.log(selectedSeats)
                        }
                        <Formik
                            initialValues={initialValues}
                            onSubmit={onSubmit}
                        >
                            {({ handleSubmit }) => (
                                <Form className="d-flex justify-content-center mb-3" onSubmit={handleSubmit}>
                                    <div >More Information</div>
                                    <div className="mx-1">
                                        <Field required as="select" name="time" className="form-select text-secondary mx-5">
                                            <option value="">Select Timing</option>
                                            <option value="9:00 AM">9:00 AM</option>
                                            <option value="12:00 PM">12:00 PM</option>
                                            <option value="3:00 PM">3:00 PM</option>
                                            <option value="9:00 PM">9:00 PM</option>
                                        </Field>
                                    </div>
                                    <div className="mx-1">
                                        <Field required as="select" name="date" className="form-select text-secondary mx-5">
                                            <option value="">Select Date</option>
                                            <option value={moment().format('YYYY-MM-DD')}>{moment().format('MMMM Do YYYY')}</option>
                                            <option value={moment().add(1, 'days').format('YYYY-MM-DD')}>{moment().add(1, 'days').format('MMMM Do YYYY')}</option>
                                        </Field>
                                    </div>
                                    <div className="ms-1 me-2">
                                        <Field required as="select" name="cinema" className="form-select text-secondary mx-5">
                                            <option value="">Select Cinema</option>
                                            <option value="PVR vijaynagar indore">PVR vijaynagar indore</option>
                                            <option value="PVR nandanagr indore">PVR nandanagr indore</option>
                                            <option value="PVR C21 mall indore">PVR C21 mall indore</option>
                                        </Field>
                                    </div>
                                    <div className="w-25 ms-5">
                                        <button type="submit" className=" btn btn-warning">Confirm details</button>
                                    </div>
                                </Form>)}
                        </Formik>
                        <div className="pb-3 d-flex justify-content-center">
                            <button onClick={bookClick} className="w-75 5 btn btn-primary" >Book Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
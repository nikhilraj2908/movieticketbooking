import { Header } from "../header/header";
import img1 from '../../assets/images/banner.jpg';
import img2 from '../../assets/images/banner2.avif';
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment"
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import * as Yup from 'yup'
export function Ticketbooking() {
    const [selectedlanguage, setselectedlanguage] = useState([])
    const [realmoviedata, setrealmoviedata] = useState([]);
    const [checkbox, setcheckbox] = useState()
    const navigate = useNavigate();
    const [quickmoviedata, setquickmoviedata] = useState({})
    async function getdata() {
        const moviedata = await axios.get("http://127.0.0.1:2000/allmovies")
        setrealmoviedata(moviedata.data)
        setselectedlanguage(moviedata.data)
    }
    useEffect(() => {
        getdata();

    }, [])
    function languageselect(e) {
        const selectedValue = e.target.value;
        if (selectedValue === "All languages") {
            setselectedlanguage(realmoviedata); // Show all movies
        } else {
            const filteredMovies = realmoviedata.filter(movie => movie.language.includes(selectedValue));
            setselectedlanguage(filteredMovies); // Show filtered movies based on selected language
        }
    }
    function checkboxclicked() {
        if (checkbox) {
            setcheckbox(false);
            setselectedlanguage(realmoviedata);
        } else {
            setcheckbox(true);
            const filteredMovies = realmoviedata.filter(movie => movie.subtitle === true);
            setselectedlanguage(filteredMovies);
        }
    }
    function categorychange(e) {
        const selectedmovie = e.target.value;
        if (selectedmovie === "All Genres") {
            setselectedlanguage(realmoviedata);
        } else {
            const filtermovie = realmoviedata.filter(movie => movie.genre.includes(selectedmovie));
            setselectedlanguage(filtermovie);
        }
    }
    function bookticketclicked(id) {
        navigate(`/ticketbookpage/${id}`)
        console.log(id)

    }
    const initialValues = {
        moviename: "",
        date: "",
        cinema: "",
        time: ""
    }
    async function onSubmit(values, { resetForm }) {
        setquickmoviedata(values)
        console.log("form submitted succefully", values)
        resetForm();
    }

    return (
        <>
            <Header />
            <div >
                <div className="carousel slide" id="carouselExample" data-bs-ride="carousel" data-bs-interval="3000">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={img1} style={{ width: "100%" }}></img>
                        </div>
                        <div className="carousel-item">
                            <img src={img2} style={{ width: "100%" }}></img>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    </button>
                </div>
                <div className="position-sticky z-2 top-0  bg-light  py-3">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                    >
                        {({ values }) => (
                            <Form className="d-flex justify-content-around align-items-center">
                                <div>
                                    <b>Quick Book</b>
                                </div>
                                <div>
                                    <Field as="select" name="moviename" className="form-select text-secondary mx-5">
                                        <option value="">Select Movie</option>
                                        {selectedlanguage.map((movie, index) => (
                                            <option key={index} value={movie.name}>{movie.name}</option>
                                        ))}
                                    </Field>
                                </div>
                                <div>
                                    <Field as="select" name="date" className="form-select text-secondary mx-5">
                                        <option value="">Select Date</option>
                                        <option value={moment().format('YYYY-MM-DD')}>{moment().format('MMMM Do YYYY')}</option>
                                        <option value={moment().add(1, 'days').format('YYYY-MM-DD')}>{moment().add(1, 'days').format('MMMM Do YYYY')}</option>
                                    </Field>
                                </div>
                                <div>
                                    <Field as="select" name="cinema" className="form-select text-secondary mx-5">
                                        <option value="">Select Cinema</option>
                                        <option value="PVR vijaynagar indore">PVR vijaynagar indore</option>
                                        <option value="PVR nandanagr indore">PVR nandanagr indore</option>
                                        <option value="PVR C21 mall indore">PVR C21 mall indore</option>
                                    </Field>
                                </div>
                                <div>
                                    <Field as="select" name="time" className="form-select text-secondary mx-5">
                                        <option value="">Select Timing</option>
                                        <option value="9:00 AM">9:00 AM</option>
                                        <option value="12:00 PM">12:00 PM</option>
                                        <option value="3:00 PM">3:00 PM</option>
                                        <option value="9:00 PM">9:00 PM</option>
                                    </Field>
                                </div>
                                <button type="submit" className="btn btn-success ms-4">Book Now</button>
                            </Form>
                        )}
                    </Formik>

                </div>
                <div className="d-flex justify-content-between align-items-center px-5 p-2">
                    <div className="" >
                        <b>Now Showing</b>
                    </div>
                    <div className="d-flex ">
                        <span style={{ alignContent: "center" }}>
                            <input onChange={checkboxclicked} type="checkbox" />Subtitles
                        </span>
                        <span className="mx-4">
                            <select onChange={categorychange} className="mx-3 form-select">
                                <option value="All Genres">All Genres</option>
                                <option value="Sci-fic">sci-fic</option>
                                <option value="Action">Action</option>
                                <option value="Adventure">Adventure</option>

                            </select>
                        </span>
                        <span className="ms-4">
                            <select onChange={languageselect} className="form-select">
                                <option value="All languages">All Languages</option>
                                <option value='Hindi'>Hindi</option>
                                <option value="English">English</option>
                                <option value="Hindi/English">Hindi/English</option>
                                <option value="Hindi/Telgu">Hindi/Telgu</option>
                            </select>
                        </span>
                    </div>
                </div>
                <div className="d-flex flex-wrap justify-content-around" style={{ marginLeft: "3rem", marginRight: "3rem" }}>
                    {
                        selectedlanguage.map(movie => (
                            <div key={movie.id} className="card my-3   " style={{ width: "17rem" }}>
                                <div className="card-body">
                                    {movie.photoId ? (
                                        <img
                                            src={`http://localhost:2000/fileById/${movie.photoId}`}
                                            alt={movie.name}
                                            style={{ width: "100%", height: "55vh" }}
                                        />
                                    ) : (
                                        'No Image'
                                    )}

                                </div>
                                <div className="card-footer">
                                    <div className="d-flex justify-content-between">
                                        <h6 className="card-title">{movie.name.toUpperCase()}</h6>
                                        <div>{movie.subtitle ? "subtitle-Yes" : "subtitle-No "}</div>
                                    </div>
                                    <div className="d-flex justify-content-between pb-2">
                                        <div style={{ width: "40%" }}>{movie.language}</div>
                                        <div>{movie.genre}</div>
                                    </div>
                                    <button className="btn btn-success w-100" onClick={() => bookticketclicked(movie.id)}>Book Ticket</button>
                                </div>
                            </div>)
                        )
                    }
                </div>
            </div>
        </>
    )
}
import axios from "axios";
import { useState } from "react";
import './admindashboard.css';
import { Link } from "react-router-dom";

export function Admindashboard() {
    const [files, setFile] = useState(null);
    const [moviedata, setmoviedata] = useState({
        name: "",
        genre: "",
        subtitle: "",
        language: ""
    });

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    async function frmsubmit(e) {
        e.preventDefault();
        // Prepare form data to send to the server
        const formData = new FormData();
        formData.append('name', moviedata.name);
        formData.append('genre', moviedata.genre);
        formData.append('subtitle', moviedata.subtitle);
        formData.append('language', moviedata.language);
        formData.append('file', files); // Append the file
    
        try {
            const response = await axios.post('http://localhost:2000/moviedetails', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                alert("Details added successfully.");
                setmoviedata({
                    name: "",
                    genre: "",
                    subtitle: "",
                    language: ""
                });
                setFile(null);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was a problem submitting the form.');
        }
    }

    function handlechange(e) {
        const { name, value } = e.target;
        setmoviedata({
            ...moviedata,
            [name]: name === "subtitle" ? value === "true" : value
        });
    }

    return (
        <div className="admindashboard-bg">
            <form onSubmit={frmsubmit} className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <dl className="bg-transparent text-light rounded p-3" style={{border:"1px solid gray", boxShadow:"1px .5px 7px 5px"}}>
                    <h4>Welcome to admin panel</h4>

                    <dt>Name</dt>
                    <dd>
                        <input
                            onChange={handlechange}
                            value={moviedata.name}
                            placeholder="Enter movie name"
                            name="name"
                            className="form-control"
                            type="text"
                        />
                    </dd>

                    <dt>Genre</dt>
                    <dd>
                        <input onChange={handlechange} type="radio" name="genre" value="Adventure" checked={moviedata.genre === "Adventure"} /> Adventure
                        <input onChange={handlechange} className="ms-3" name="genre" type="radio" value="Action" checked={moviedata.genre === "Action"} /> Action
                        <input onChange={handlechange} className="ms-3" name="genre" type="radio" value="Romantic" checked={moviedata.genre === "Romantic"} /> Romantic
                        <input onChange={handlechange} className="ms-3" name="genre" type="radio" value="Sci-fic" checked={moviedata.genre === "Sci-fic"} /> Sci-fic
                    </dd>

                    <dt>Subtitle</dt>
                    <dd>
                        <input onChange={handlechange} type="radio" name="subtitle" value="true" checked={moviedata.subtitle === true} /> True
                        <input onChange={handlechange} className="ms-3" type="radio" name="subtitle" value="false" checked={moviedata.subtitle === false} /> False
                    </dd>

                    <dt>Language</dt>
                    <dd>
                        <input onChange={handlechange} type="radio" name="language" value="Hindi" checked={moviedata.language === "Hindi"} /> Hindi
                        <input onChange={handlechange} className="ms-3" type="radio" name="language" value="Hindi/English" checked={moviedata.language === "Hindi/English"} /> Hindi/English
                        <input onChange={handlechange} className="ms-3" type="radio" name="language" value="English" checked={moviedata.language === "English"} /> English
                        <input onChange={handlechange} className="ms-3" type="radio" name="language" value="Hindi/Telgu" checked={moviedata.language === "Hindi/Telgu"} /> Hindi/Telgu
                    </dd>

                    <dt>Poster</dt>
                    <dd>
                        <input onChange={handleFileChange} className="form-control" type="file" name="poster"/>
                    </dd>
                    
                    <button className="btn btn-success">Add Movie</button>
                    <p>go to  <Link to="/adminmainpage">edit page</Link></p>
                </dl>
            </form>
        </div>
    );
}

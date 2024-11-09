import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export function Adminmainpage() {
    const [data, setdata] = useState([]);
    const [editdata, seteditdata] = useState([])


    async function getdata() {
        try {
            const response = await axios.get("http://127.0.0.1:2000/allmovies");
            setdata(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        getdata();
    }, [deleteclicked])
    function deleteclicked(id) {
        axios.delete(`http://127.0.0.1:2000/deletemovie/${id}`);
    }

    function handleFileChange(e) {
        const file = e.target.files[0];
        seteditdata((prevData) => ({
            ...prevData,
            poster: file,
        }));
    }
    function handlechange(e) {
        const { name, value } = e.target;
        seteditdata((prevData) => ({
            ...prevData,
            [name]: name === "subtitle" ? value === "true" : value,
        }));
    }

    async function frmsubmit(e) {
        e.preventDefault();
        console.log(editdata); // Check the data before submitting
        try {
            const formData = new FormData();
            formData.append("name", editdata.name);
            formData.append("genre", editdata.genre);
            formData.append("subtitle", editdata.subtitle);
            formData.append("language", editdata.language);
            if (editdata.poster) {
                formData.append("file", editdata.poster);
            }
            await axios.put(`http://127.0.0.1:2000/editmovie/${editdata.id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            alert("edited data successfully");
            seteditdata({
                name:"",
                genre:"",
                subtitle:"",
                language:"",
            })
            await getdata();
        } catch (error) {
            console.error("Error updating movie:", error);
        }
    }



    async function editclicked(id) {
        const response = await axios.get(`http://127.0.0.1:2000/movie/${id}`)
        seteditdata(response.data);
    }
    return (
        <>
            <h3>Admin dashboard</h3>
            <table className="table over table-striped table-bordered">
                <thead>
                    <tr> {/* Wrap <th> elements in a <tr> */}
                        <th>Movie Name</th>
                        <th>Subtitle</th>
                        <th>Genre</th>
                        <th>Language</th>
                        <th>Poster</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.subtitle ? "true" : "false"}</td>
                                <td>{item.genre}</td>
                                <td>{item.language}</td>
                                <td>
                                    {item.photoId ? (

                                        <img src={`http://127.0.0.1:2000/fileById/${item.photoId}`}
                                            alt={item.name}
                                            style={{ height: "10vh" }}
                                        />
                                    ) :
                                        ("no photo id")
                                    }
                                </td>
                                <td><button onClick={() => deleteclicked(item.id)} className="btn btn-danger">delete</button></td>
                                <td><button data-bs-toggle="modal" data-bs-target="#modal" onClick={() => editclicked(item.id)} className="btn btn-warning">edit</button></td>
                            </tr>
                        )
                        )
                    }
                </tbody>
            </table>
            <div className="modal fade" id="modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4>Edit movie details</h4>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={frmsubmit} className="d-flex justify-content-center align-items-center">
                                <dl className=" rounded p-3" >
                                    <dt>Name</dt>
                                    <dd>
                                        <input
                                            onChange={handlechange}
                                            value={editdata.name}
                                            placeholder="Enter movie name"
                                            name="name"
                                            className="form-control"
                                            type="text"
                                        />
                                    </dd>

                                    <dt>Genre</dt>
                                    <dd>
                                        <input onChange={handlechange} type="radio" name="genre" value="Adventure" checked={editdata.genre === "Adventure"} /> Adventure
                                        <input onChange={handlechange} className="ms-3" name="genre" type="radio" value="Action" checked={editdata.genre === "Action"} /> Action
                                        <input onChange={handlechange} className="ms-3" name="genre" type="radio" value="Romantic" checked={editdata.genre === "Romantic"} /> Romantic
                                        <input onChange={handlechange} className="ms-3" name="genre" type="radio" value="Sci-fic" checked={editdata.genre === "Sci-fic"} /> Sci-fic
                                    </dd>

                                    <dt>Subtitle</dt>
                                    <dd>
                                        <input onChange={handlechange} type="radio" name="subtitle" value="true" checked={editdata.subtitle === true} /> True
                                        <input onChange={handlechange} className="ms-3" type="radio" name="subtitle" value="false" checked={editdata.subtitle === false} /> False
                                    </dd>

                                    <dt>Language</dt>
                                    <dd>
                                        <input onChange={handlechange} type="radio" name="language" value="Hindi" checked={editdata.language === "Hindi"} /> Hindi
                                        <input onChange={handlechange} className="ms-3" type="radio" name="language" value="Hindi/English" checked={editdata.language === "Hindi/English"} /> Hindi/English
                                        <input onChange={handlechange} className="ms-3" type="radio" name="language" value="English" checked={editdata.language === "English"} /> English
                                        <input onChange={handlechange} className="ms-3" type="radio" name="language" value="Hindi/Telgu" checked={editdata.language === "Hindi/Telgu"} /> Hindi/Telgu
                                    </dd>

                                    <dt>Poster</dt>
                                    <dd>
                                        <input onChange={handleFileChange} className="form-control" type="file" name="poster" />
                                    </dd>
                                    <button className="w-100 btn btn-success">Edit Movie details</button>
                                </dl>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <p>go to  <Link to="/adminmainpage">edit page</Link></p>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
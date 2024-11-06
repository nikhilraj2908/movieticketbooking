import { Header } from "../header/header";
import img1 from '../../assets/images/banner.jpg';
import img2 from '../../assets/images/banner2.avif';
export function Ticketbooking() {
    return (
        <>
            <Header />
            <div className="">
                <div className="carousel slide"id="carouselExample" data-bs-ride="carousel" data-bs-interval="3000">
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
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </>
    )
}
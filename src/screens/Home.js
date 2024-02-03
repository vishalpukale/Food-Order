import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
// import Carousal from '../components/Carousal'


export default function Home() {

    const [search, setSearch] = useState('')

    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);

    const loadData = async () => {
        try {
            let responce = await fetch("http://localhost:5001/api/foodData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            responce = await responce.json();
            // console.log(responce[0], responce[1]);
            setFoodItem(responce[0])
            setFoodCat(responce[1])

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadData();
    }, []);


    return (
        <div>

            <div> <Navbar></Navbar> </div>


            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" style={{ objectFit: "contain !important" }}>
                    <div className="carousel-inner" id='carousel'>
                        <div className='carousel-caption' style={{ zIndex: "100" }}>
                            <div className="d-flex justify-content-center">
                                <input className="form-control me-2 " type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                                {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
                            </div>
                        </div>

                        <div className="carousel-item active">
                            <img src="https://source.unsplash.com/random/900x300?burger" style={{ filter: "brightness(30%)" }} className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900x300?pizza" style={{ filter: "brightness(30%)" }} className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900x300?pasta" style={{ filter: "brightness(30%)" }} className="d-block w-100" alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>


            <div className='container'>
                {
                    foodCat !== 0 ? foodCat.map((data) => {
                        return (
                            <div className='row mb-3'>
                                <div key={data._id} className='fs-4 m-3'>
                                    {data.CategoryName}
                                </div>
                                <hr />

                                {foodItem !== 0 ? foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase()))).map(filterItems => {
                                    return (
                                        <div key={filterItems._id} className=' col-12 col-sm-6 col-md-4 col-lg-3'>
                                            <Card foodItem = {filterItems}
                                                options={filterItems.options[0]}
                                            ></Card>
                                        </div>
                                    )
                                }) : <div>No such data Found</div>}

                            </div>
                        )
                    })
                        : ""
                }
            </div>
            <div> <Footer></Footer> </div>

        </div>
    )
}

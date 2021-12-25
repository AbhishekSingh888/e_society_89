import React from 'react'

function Home() {
    return (
        <>
            <div className="container my-3">
                <div className="row">
                    <div className="col-3 border border-2 rounded mx-1">
                        <h5 className='text-center text-primary'>User Details</h5>
                        <div className="container d-flex my-100">
                            <ul>
                                <li>
                                    Name:-
                                </li>
                                <li>
                                    Username:-
                                </li>
                                <li>
                                    Desc:-
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-5 border border-2 rounded mx-1">
                        <h5 className='text-center text-primary'>Feed</h5>
                        <div class="card-body border">
                            <h5 class="card-title">Special title treatment</h5>
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                        <div class="card-body border">
                            <h5 class="card-title">Special title treatment</h5>
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>                        <div class="card-body border">
                            <h5 class="card-title">Special title treatment</h5>
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>                        <div class="card-body border">
                            <h5 class="card-title">Special title treatment</h5>
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>                        <div class="card-body border">
                            <h5 class="card-title">Special title treatment</h5>
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                    <div className="col-3 border border-2 rounded mx-1">
                        <h5 className='text-center text-primary'>Search User</h5>
                        <form className="d-flex my-100">
                            <input className="form-control me-2" type="search" placeholder="@username" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home

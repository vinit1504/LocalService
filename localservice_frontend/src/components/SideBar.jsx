import React from 'react'
import { Link } from 'react-router-dom';

const SideBar = () => {




    const path = window.location.pathname;
    const serviceProviderLinks = [


        {
            name: "DASHBOARD",
            link: "/serviceprovider/Dashboard",
            icon: "dashboard"

        },
        {
            name: "ADD SERVICE",
            link: "/serviceprovider/addservice",
            icon: "add"

        },
        {
            name: "MY SERVICES",
            link: "/serviceprovider/servicelist",
            icon: "table_view"

        },
        {
            name: "PROFILE",
            link: "/serviceprovider/profile",
            icon: "person"

        }



    ]

    const userLinks = [
        {
            name: "USER DASHBOARD",
            link: "/user/dashboard",
            icon: "dashboard"

        },
        {
            name: "BOOK SERVICE",
            link: "/user/bookservice",
            icon: "add"

        },
        {
            name: "MY BOOKINGS",
            link: "/user/mybookings",
            icon: "table_view"

        },
        {
            name: "PROFILE",
            link: "/user/profile",
            icon: "person"
        }
        // {
        //     name:"payment Booking",
        //     link:"/user/paymentbooking"
        // }
    ];

    return (
        <div>

            {/* <main class="main-content border-radius-lg "> */}
            <aside
                class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3  bg-gradient-dark"
                id="sidenav-main" >

                <div class="sidenav-header active bg-gradient-primary">
                    {/* <i class="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
                        aria-hidden="true" id="iconSidenav"></i> */}

                    <div class="navbar-brand m-0">
                        <img src="../assets/img/logo-ct-dark.png" class="navbar-brand-img h-100 " style={{ background: "transparent" }} alt="main_logo" />
                        <span class="ms-1 font-weight-bold " style={{ color: "black", fontSize: "20px" }}>Local Service </span>

                    </div>
                </div>


                <hr class="horizontal light mt-0 mb-2" />

                <div class="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
                    <ul class="navbar-nav">

                        {/* <li class="nav-item">
                                <Link className="nav-link text-white " to="/serviceprovider/dashboard">

                                    <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <i class="material-icons opacity-10">dashboard</i>
                                </div>

                                    <span class="nav-link-text ms-1">Dashboard</span>
                                </Link>
                            </li> */}


                        {path.includes("serviceprovider")
                            ? serviceProviderLinks.map((serpro) => {
                                return (
                                    <li class="nav-item ">
                                        <Link className="nav-link text-white active bg-gradient-dark black" to={serpro.link}>

                                            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                                <i class="material-icons opacity-10">{serpro.icon}</i>

                                            </div>

                                            <span class="nav-link-text ms-1">{serpro.name}</span>

                                        </Link>
                                    </li>
                                )
                            })
                            : userLinks.map((user) => {

                                return (
                                    <li class="nav-item">
                                        <Link className="nav-link text-white active bg-gradient-dark black" to={user.link}>

                                            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                                <i class="material-icons opacity-10">{user.icon}</i>
                                            </div>

                                            <span class="nav-link-text ms-1">{user.name}</span>

                                        </Link>
                                    </li>
                                )

                            })
                        }
                        {/* <li class="nav-item">
                            <Link class="nav-link text-white active bg-gradient-primary" to="/serviceprovider/profile">
                                <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <i class="material-icons opacity-10">person</i>
                                </div>
                                <span class="nav-link-text ms-1">Profile</span>
                            </Link>
                        </li> */}
                    </ul>

                </div>


            </aside>
            {/* </main> */}
        </div>
    )
}

export default SideBar

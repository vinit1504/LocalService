// import React from 'react'
// import SideBar from '../SideBar'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart,
    LinearScale,
    LineElement,
} from "chart.js";
// import axios from "axios";
import { Bar } from 'react-chartjs-2';
import CustomeLoader from '../CustomeLoader';
Chart.register(CategoryScale);
Chart.register(ArcElement);
Chart.register(LinearScale);
Chart.register(BarElement);

const ServiceProviderDashboard = () => {

    const [isLoading, setisLoading] = useState([])
    const [book, setbook] = useState([])
    // const [count, setcount] = useState(0)



    const getAllservice = async () => {
        const id = localStorage.getItem("id")
        // alert(id)
        try {

            setisLoading(true)
            const res = await axios.get("http://localhost:4000/services/services/provider/" + id);

            console.log("service", res.data.data);
            setisLoading(false)

            // console.log(res.data.data.length)

            if (res.data.data && res.data.data.length > 0) {

                const categoryCounts = {};

                for (const service of res.data.data) {
                    // service ma category che k nai check karse
                    if (service.category) {

                        //category nu name set karse
                        const categoryName = service.category.name;

                        //check karse k categoryName pelethi che k nai
                        if (categoryCounts[categoryName]) {
                            // jo hoy toh count vadhshe
                            categoryCounts[categoryName]++;
                        } else {
                            // navi category aave toh ene count ma add kari ne initial value 1 aapse
                            categoryCounts[categoryName] = 1;
                        }
                    }
                }
                const transformedData = {
                    labels: Object.keys(categoryCounts),
                    datasets: [
                        {
                            label: "Service",
                            data: Object.values(categoryCounts),
                            backgroundColor: [
                                "rgba(255, 99, 132, 0.6)",
                                "rgba(54, 162, 235, 0.6)",
                                "rgba(255, 206, 86, 0.6)",
                            ],
                            borderWidth: 1,
                        },
                    ],
                };
                setdata(transformedData);
            }
        } catch (error) {
            console.error("Error fetching service:", error);
            alert("Error fetching service");
        }
    };

    const getBookings = async () => {
        const id = localStorage.getItem("id")

        try {

            setisLoading(true)
            const res = await axios.get("http://localhost:4000/bookings/booking/provider/" + id)

            console.log(res.data.data)
            setbook(res.data.data)
            setisLoading(false)



        } catch (error) {

            console.log(error)
        }

    }

    const deletebooking = async (id) => {


        try {

            setisLoading(true)
            const res = await axios.delete("http://localhost:4000/bookings/booking/" + id)
            console.log(res)
            console.log(res.data.data)
            if (res.status === 200) {
                toast.success('🦄 Booking canceled successfully...', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",

                });
            }

            getBookings()
            setisLoading(false)


        } catch (error) {
            console.log(error)
        }

    }

    const [data, setdata] = useState({
        labels: [],
        datasets: [],
    });


    useEffect(() => {

        getBookings()
        getAllservice();

    }, [])

    return (

        <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />

            {isLoading ? (
                <CustomeLoader />
            ) : (
                <>
                        <div className="row mt-5">
                            <div className="col-12">
                                <div className="card my-4" style={{ marginInlineStart: "15px", marginInlineEnd: "10px" }}>
                                    <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2" >
                                        <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                                            <h6 className="text-white text-capitalize ps-3">
                                                Bookings for me...
                                            </h6>
                                        </div>
                                    </div>
                                    <div className="card-body px-0 pb-2">
                                        <div className="table-responsive p-0">
                                            <table className="table align-items-center mb-0">
                                                <thead style={{ color: "black" }}>
                                                    <tr >
                                                        <th className="text-uppercase text-center text-black text-xxs font-weight-bolder opacity-10 ">
                                                            user
                                                        </th>
                                                        <th className="text-center text-uppercase text-black text-xxs font-weight-bolder opacity-10 ">
                                                            Total Amount
                                                        </th>
                                                        <th className="text-center text-uppercase text-black text-xxs font-weight-bolder opacity-10">
                                                            Status
                                                        </th>
                                                        <th className="text-center text-uppercase text-black text-xxs font-weight-bolder opacity-10">
                                                            Action
                                                        </th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {book?.map((booking) => {
                                                        return (
                                                            <tr >
                                                                <td>
                                                                    <div className="d-flex flex-column text-center justify-content-center">
                                                                        <h6 className="mb-0 text-sm">
                                                                            {booking?.user?.name}
                                                                        </h6>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <p className="text-xs text-center font-weight-bold mb-0">
                                                                        {booking?.totalAmount}
                                                                    </p>
                                                                </td>
                                                                <td className="align-middle text-center text-sm">
                                                                    <span className="badge badge-sm bg-gradient-default"
                                                                        style={{ color: "black", background: "darkgray" }}
                                                                    >
                                                                        {booking.status}
                                                                    </span>
                                                                </td>
                                                                <td className="align-middle text-center text-sm">
                                                                    <button className="badge badge-sm bg-gradient-info" onClick={() => deletebooking(booking?._id)} style={{ color: "white" }}>
                                                                        CANCEL BOOKING
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container-fluid mt-8 mb-8">
                            <div className="row justify-content-center">
                                <div className="col-lg-8">
                                    <div className="card">
                                        <div
                                            className="card-header bg-gradient-primary"
                                            style={{
                                                textAlign: "center",
                                                justifyContent: "center",
                                                alignContent: "center",
                                                color: "White",
                                                width: "auto",
                                                height: "auto",
                                                // marginInlineStart: "15px"
                                            }}
                                        >
                                            Total categorywise my services...
                                        </div>
                                        <div className="card-body bg-gradient-light">
                                            <Bar data={data} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                </>
            )}


        </>
    )
}

export default ServiceProviderDashboard

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import CustomeLoader from '../CustomeLoader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ServiceList = () => {



    const [isLoading, setisLoading] = useState([])
    const [services, setservices] = useState([]);

    const fetchMyService = async () => {
        const id = localStorage.getItem("id")
        setisLoading(true)

        try {

            if (id !== undefined || id !== null) {

                const res = await axios.get("http://localhost:4000/services/services/provider/" + id)
                console.log(res.data.data)
                setservices(res.data.data)
                setisLoading(false)

            }
        } catch (error) {

            alert("No service found !")

        }
    }

    const changehandler = async (e) => {

        try {

            setisLoading(true)

            const res = await axios.get("http://localhost:4000/services/filterservice",
                {
                    params: {
                        servicename: e.target.value,
                    },
                })
            console.log("res in searchHandler", res.data.data)
            setservices(res.data.data)
            setisLoading(false)


        } catch (error) {
            setservices([])
        }
    }



    const deleteservice = async (id) => {

        try {

            setisLoading(true)

            const res = await axios.delete("http://localhost:4000/services/services/" + id)

            // console.log("Service deleted succesfully..")

            if (res.status === 200) {
                toast.success('🦄 service deleted successfully..', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",

                });
                setTimeout(() => {
                    fetchMyService()

                }, 500);
            }
            setisLoading(false)


        } catch (error) {

            console.log(error)
        }
    }

    useEffect(() => {

        fetchMyService()
    }, [])


    return (
        <>


            <div className="main-content border-radius-lg ">
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
                <div className='row'>
                    <div className="col-md-12">

                        <div className="card strpied-tabled-with-hover" style={{ border: "2px" }} >
                            <div className="card-header ">
                                <h4 className="card-title">My Services</h4>
                                <p className="card-category">Services added by you..</p>
                            </div>
                            <input
                                type="text"
                                placeholder='search for services...'
                                onChange={(e) => {
                                    changehandler(e)
                                }} />
                            {
                                isLoading ? (
                                    <CustomeLoader />
                                ) : (
                                    <>
                                        <div className="card-body table-full-width table-responsive">
                                            <table className="table table-hover table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>Service name</th>
                                                        <th>category</th>
                                                        <th>SubCategory</th>
                                                        <th style={{ justifyContent: "center" }}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        services?.map((service) => {

                                                            return (

                                                                <tr>
                                                                    <td>{service?.servicename}</td>
                                                                    <td>{service?.category?.name}</td>
                                                                    <td>{service?.subcategory?.name}</td>
                                                                    {/* <td>Action</td> */}
                                                                    <td>
                                                                        <button className="btn btn-info" onClick={() => { }}>
                                                                            <Link to={`/serviceprovider/details/${service._id}`}>DETAILS</Link>
                                                                        </button>

                                                                        <button className="btn btn-success">
                                                                            <Link to={`/serviceprovider/update/${service._id}`}>UPDATE</Link>
                                                                        </button>
                                                                        <button className="btn btn-danger" onClick={() => { deleteservice(service._id) }}>DELETE</button>
                                                                    </td>


                                                                </tr>
                                                            )
                                                        })
                                                        }

                                                    </tbody>
                                                </table>
                                            </div>
                                    </>
                                )
                            }
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default ServiceList

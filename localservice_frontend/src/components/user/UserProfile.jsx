import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import CustomeLoader from '../CustomeLoader'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserProfile = () => {

    const [user, setuser] = useState('')
    const id = localStorage.getItem("id")
    const [isLoading, setisLoading] = useState([])


    const { register, handleSubmit } = useForm({
        defaultValues: async () => {
            const res = await axios.get("http://localhost:4000/users/user/" + id)


            return {
                email: res.data.data.email,
                name: res.data.data.name,
                phone: res.data.data.phone

            }
        }

    })

    const submitHandler = async (data) => {

        setisLoading(true)
        const res = await axios.put("http://localhost:4000/users/user/" + id, data)
        console.log(res.data)
        setisLoading(false)

        if (res.status === 200) {
            toast.success('🦄 User updated successfully..', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                // transition: Bounce,
            });
        }
        getuser()

    }

    const getuser = async () => {


        setisLoading(true)
        const res = await axios.get("http://localhost:4000/users/user/" + id)
        console.log(res.data.data)
        setuser(res.data.data)
        setisLoading(false)
    }
    useEffect(() => {
        getuser()
    }, [])

    const clickhandler = async () => {

        setisLoading(true)
        localStorage.removeItem("id");
        window.location.href = "/"
        setisLoading(false)



    }
    return (
        <div className="container-fluid px-2 px-md-4">
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
            {
                isLoading ? (

                    <CustomeLoader />
                ) : (
                    <>


                            <div
                                className="page-header min-height-300 border-radius-xl mt-4"
                                style={{
                                    backgroundImage:
                                        'url("https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")'
                                }}
                            >
                                <span className="mask  bg-gradient-primary  opacity-6" />
                            </div>
                            <div className="card card-body mx-3 mx-md-4 mt-n6">
                                <div className="row gx-4 mb-2">
                                    <div className="col-auto">
                                        <div className="avatar avatar-xl position-relative">

                                        </div>
                                    </div>
                                    <div className="col-auto my-auto">
                                        <div className="h-100">
                                            <h3 className="mb-1 font-weight-bolder" style={{ color: "black" }}>{user?.name}</h3>
                                            <h6 className="mb-0 font-weight-normal text-sm font-weight-bolder">Role/{user?.role?.name}</h6>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0 mx-auto mt-3" style={{ width: "300px" }}>
                                        <div className="nav-wrapper position-relative end-0">
                                            <ul className="nav nav-pills nav-fill p-1" role="tablist">

                                                <li className="nav-item" role="presentation">
                                                    <Button
                                                        onClick={clickhandler}
                                                        className="nav-link mb-0 btn btn-danger px-0 py-1 "
                                                        data-bs-toggle="tab"
                                                        href="javascript:;"
                                                        role="tab"
                                                        aria-selected="false"
                                                        tabIndex={1}
                                                    >
                                                        <i className="material-icons  text-lg position-relative">
                                                            login
                                                        </i>
                                                        <span className="ms-1">Log-out</span>
                                                    </Button>
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="page-header align-items-start min-vh-100">

                                    <div className="container my-auto">
                                        <div className="row">
                                            <div className="col-lg-4 col-md-8 col-12 mx-auto">
                                                <div className="card z-index-0 fadeIn3 fadeInBottom">
                                                    <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                                        <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                                                            <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">Update User</h4>
                                                        </div>
                                                    </div>

                                                    <div className="card-body">

                                                        <form onSubmit={handleSubmit(submitHandler)} role="form" class="text-start">

                                                            <div className="input-group input-group-outline my-3">

                                                                <input type="text" className="form-control font-weight-bolder" placeholder="Email.."  {...register("email")} />

                                                            </div>

                                                            <div className="input-group input-group-outline my-3">

                                                                <input type="text" className="form-control font-weight-bolder" placeholder="Name"  {...register("name")} />
                                                            </div>

                                                            <div className="input-group input-group-outline my-3">

                                                                <input type="text" className="form-control font-weight-bolder mb-0" placeholder="Phone"  {...register("phone")} />
                                                            </div>

                                                            <div className="text-center">
                                                                <button type="submit"
                                                                    className="btn bg-gradient-primary w-100 my-4 mb-2"

                                                                    value="submit" >
                                                                    Update
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                    </>
                )
            }
        </div>
    )
}

export default UserProfile

import { Button } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
// import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {

    const [serviceprovider, setserviceprovider] = useState('')
    const id = localStorage.getItem("id")


    const { register, handleSubmit } = useForm({
        defaultValues: async () => {
            const res = await axios.get("http://localhost:4000/sproviders/sprovider/" + id)


            return {
                email: res.data.data.email,
                name: res.data.data.name,
                phone: res.data.data.phone

            }
        }

    })

    const submitHandler = async (data) => {

        const res = await axios.put("http://localhost:4000/sproviders/sprovider/" + id, data)
        console.log(res.data)
        if (res.status === 200) {
            toast.success('🦄 Serviceprovider updated successfully..', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",

            });

        }
        getServiceprovider()

    }

    const getServiceprovider = async () => {


        const res = await axios.get("http://localhost:4000/sproviders/sprovider/" + id)
        console.log(res.data.data)
        setserviceprovider(res.data.data)
    }
    useEffect(() => {
        getServiceprovider()
    }, [])

    const clickhandler = async () => {

        localStorage.removeItem("id");
        window.location.href = "/"
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

                            <img src="../assets/img/icons/profile.png" alt="profile_image" />

                        </div>
                    </div>
                    <div className="col-auto my-auto">
                        <div className="h-100">
                            <h3 className="mb-1 font-weight-bolder" style={{ color: "black" }}>{serviceprovider?.name}</h3>
                            <h6 className="mb-0 font-weight-normal text-sm font-weight-bolder">Role/{serviceprovider?.role?.name}</h6>
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
                {/* <div className="row">
                    <div className="row">
                        <div className="col-12 col-xl-4">
                            <div className="card card-plain h-100">
                                <div className="card-header pb-0 p-3">
                                    <h6 className="mb-0">Platform Settings</h6>
                                </div>
                                <div className="card-body p-3">
                                    <h6 className="text-uppercase text-body text-xs font-weight-bolder">
                                        Account
                                    </h6>
                                    <ul className="list-group">
                                        <li className="list-group-item border-0 px-0">
                                            <div className="form-check form-switch ps-0">
                                                <input
                                                    className="form-check-input ms-auto"
                                                    type="checkbox"
                                                    id="flexSwitchCheckDefault"
                                                    defaultChecked=""
                                                />
                                                <label
                                                    className="form-check-label text-body ms-3 text-truncate w-80 mb-0"
                                                    htmlFor="flexSwitchCheckDefault"
                                                >
                                                    Email me when someone follows me
                                                </label>
                                            </div>
                                        </li>
                                        <li className="list-group-item border-0 px-0">
                                            <div className="form-check form-switch ps-0">
                                                <input
                                                    className="form-check-input ms-auto"
                                                    type="checkbox"
                                                    id="flexSwitchCheckDefault1"
                                                />
                                                <label
                                                    className="form-check-label text-body ms-3 text-truncate w-80 mb-0"
                                                    htmlFor="flexSwitchCheckDefault1"
                                                >
                                                    Email me when someone answers on my post
                                                </label>
                                            </div>
                                        </li>
                                        <li className="list-group-item border-0 px-0">
                                            <div className="form-check form-switch ps-0">
                                                <input
                                                    className="form-check-input ms-auto"
                                                    type="checkbox"
                                                    id="flexSwitchCheckDefault2"
                                                    defaultChecked=""
                                                />
                                                <label
                                                    className="form-check-label text-body ms-3 text-truncate w-80 mb-0"
                                                    htmlFor="flexSwitchCheckDefault2"
                                                >
                                                    Email me when someone mentions me
                                                </label>
                                            </div>
                                        </li>
                                    </ul>
                                    <h6 className="text-uppercase text-body text-xs font-weight-bolder mt-4">
                                        Application
                                    </h6>
                                    <ul className="list-group">
                                        <li className="list-group-item border-0 px-0">
                                            <div className="form-check form-switch ps-0">
                                                <input
                                                    className="form-check-input ms-auto"
                                                    type="checkbox"
                                                    id="flexSwitchCheckDefault3"
                                                />
                                                <label
                                                    className="form-check-label text-body ms-3 text-truncate w-80 mb-0"
                                                    htmlFor="flexSwitchCheckDefault3"
                                                >
                                                    New launches and projects
                                                </label>
                                            </div>
                                        </li>
                                        <li className="list-group-item border-0 px-0">
                                            <div className="form-check form-switch ps-0">
                                                <input
                                                    className="form-check-input ms-auto"
                                                    type="checkbox"
                                                    id="flexSwitchCheckDefault4"
                                                    defaultChecked=""
                                                />
                                                <label
                                                    className="form-check-label text-body ms-3 text-truncate w-80 mb-0"
                                                    htmlFor="flexSwitchCheckDefault4"
                                                >
                                                    Monthly product updates
                                                </label>
                                            </div>
                                        </li>
                                        <li className="list-group-item border-0 px-0 pb-0">
                                            <div className="form-check form-switch ps-0">
                                                <input
                                                    className="form-check-input ms-auto"
                                                    type="checkbox"
                                                    id="flexSwitchCheckDefault5"
                                                />
                                                <label
                                                    className="form-check-label text-body ms-3 text-truncate w-80 mb-0"
                                                    htmlFor="flexSwitchCheckDefault5"
                                                >
                                                    Subscribe to newsletter
                                                </label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-xl-4">
                            <div className="card card-plain h-100">
                                <div className="card-header pb-0 p-3">
                                    <div className="row">
                                        <div className="col-md-8 d-flex align-items-center">
                                            <h6 className="mb-0">Profile Information</h6>
                                        </div>
                                        <div className="col-md-4 text-end">
                                            <a href="javascript:;">
                                                <i
                                                    className="fas fa-user-edit text-secondary text-sm"
                                                    data-bs-toggle="tooltip"
                                                    data-bs-placement="top"
                                                    aria-hidden="true"
                                                    aria-label="Edit Profile"
                                                    data-bs-original-title="Edit Profile"
                                                />
                                                <span className="sr-only">Edit Profile</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body p-3">
                                    <p className="text-sm">
                                        Hi, I’m Alec Thompson, Decisions: If you can’t decide, the
                                        answer is no. If two equally difficult paths, choose the one
                                        more painful in the short term (pain avoidance is creating an
                                        illusion of equality).
                                    </p>
                                    <hr className="horizontal gray-light my-4" />
                                    <ul className="list-group">
                                        <li className="list-group-item border-0 ps-0 pt-0 text-sm">
                                            <strong className="text-dark">Full Name:</strong> &nbsp; Alec
                                            M. Thompson
                                        </li>
                                        <li className="list-group-item border-0 ps-0 text-sm">
                                            <strong className="text-dark">Mobile:</strong> &nbsp; (44) 123
                                            1234 123
                                        </li>
                                        <li className="list-group-item border-0 ps-0 text-sm">
                                            <strong className="text-dark">Email:</strong> &nbsp;
                                            alecthompson@mail.com
                                        </li>
                                        <li className="list-group-item border-0 ps-0 text-sm">
                                            <strong className="text-dark">Location:</strong> &nbsp; USA
                                        </li>
                                        <li className="list-group-item border-0 ps-0 pb-0">
                                            <strong className="text-dark text-sm">Social:</strong> &nbsp;
                                            <a
                                                className="btn btn-facebook btn-simple mb-0 ps-1 pe-2 py-0"
                                                href="javascript:;"
                                            >
                                                <i className="fab fa-facebook fa-lg" aria-hidden="true" />
                                            </a>
                                            <a
                                                className="btn btn-twitter btn-simple mb-0 ps-1 pe-2 py-0"
                                                href="javascript:;"
                                            >
                                                <i className="fab fa-twitter fa-lg" aria-hidden="true" />
                                            </a>
                                            <a
                                                className="btn btn-instagram btn-simple mb-0 ps-1 pe-2 py-0"
                                                href="javascript:;"
                                            >
                                                <i className="fab fa-instagram fa-lg" aria-hidden="true" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-xl-4">
                            <div className="card card-plain h-100">
                                <div className="card-header pb-0 p-3">
                                    <h6 className="mb-0">Conversations</h6>
                                </div>
                                <div className="card-body p-3">
                                    <ul className="list-group">
                                        <li className="list-group-item border-0 d-flex align-items-center px-0 mb-2 pt-0">
                                            <div className="avatar me-3">
                                                <img
                                                    src="../assets/img/kal-visuals-square.jpg"
                                                    alt="kal"
                                                    className="border-radius-lg shadow"
                                                />
                                            </div>
                                            <div className="d-flex align-items-start flex-column justify-content-center">
                                                <h6 className="mb-0 text-sm">Sophie B.</h6>
                                                <p className="mb-0 text-xs">
                                                    Hi! I need more information..
                                                </p>
                                            </div>
                                            <a
                                                className="btn btn-link pe-3 ps-0 mb-0 ms-auto w-25 w-md-auto"
                                                href="javascript:;"
                                            >
                                                Reply
                                            </a>
                                        </li>
                                        <li className="list-group-item border-0 d-flex align-items-center px-0 mb-2">
                                            <div className="avatar me-3">
                                                <img
                                                    src="../assets/img/marie.jpg"
                                                    alt="kal"
                                                    className="border-radius-lg shadow"
                                                />
                                            </div>
                                            <div className="d-flex align-items-start flex-column justify-content-center">
                                                <h6 className="mb-0 text-sm">Anne Marie</h6>
                                                <p className="mb-0 text-xs">Awesome work, can you..</p>
                                            </div>
                                            <a
                                                className="btn btn-link pe-3 ps-0 mb-0 ms-auto w-25 w-md-auto"
                                                href="javascript:;"
                                            >
                                                Reply
                                            </a>
                                        </li>
                                        <li className="list-group-item border-0 d-flex align-items-center px-0 mb-2">
                                            <div className="avatar me-3">
                                                <img
                                                    src="../assets/img/ivana-square.jpg"
                                                    alt="kal"
                                                    className="border-radius-lg shadow"
                                                />
                                            </div>
                                            <div className="d-flex align-items-start flex-column justify-content-center">
                                                <h6 className="mb-0 text-sm">Ivanna</h6>
                                                <p className="mb-0 text-xs">About files I can..</p>
                                            </div>
                                            <a
                                                className="btn btn-link pe-3 ps-0 mb-0 ms-auto w-25 w-md-auto"
                                                href="javascript:;"
                                            >
                                                Reply
                                            </a>
                                        </li>
                                        <li className="list-group-item border-0 d-flex align-items-center px-0 mb-2">
                                            <div className="avatar me-3">
                                                <img
                                                    src="../assets/img/team-4.jpg"
                                                    alt="kal"
                                                    className="border-radius-lg shadow"
                                                />
                                            </div>
                                            <div className="d-flex align-items-start flex-column justify-content-center">
                                                <h6 className="mb-0 text-sm">Peterson</h6>
                                                <p className="mb-0 text-xs">Have a great afternoon..</p>
                                            </div>
                                            <a
                                                className="btn btn-link pe-3 ps-0 mb-0 ms-auto w-25 w-md-auto"
                                                href="javascript:;"
                                            >
                                                Reply
                                            </a>
                                        </li>
                                        <li className="list-group-item border-0 d-flex align-items-center px-0">
                                            <div className="avatar me-3">
                                                <img
                                                    src="../assets/img/team-3.jpg"
                                                    alt="kal"
                                                    className="border-radius-lg shadow"
                                                />
                                            </div>
                                            <div className="d-flex align-items-start flex-column justify-content-center">
                                                <h6 className="mb-0 text-sm">Nick Daniel</h6>
                                                <p className="mb-0 text-xs">
                                                    Hi! I need more information..
                                                </p>
                                            </div>
                                            <a
                                                className="btn btn-link pe-3 ps-0 mb-0 ms-auto w-25 w-md-auto"
                                                href="javascript:;"
                                            >
                                                Reply
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 mt-4">
                            <div className="mb-5 ps-3">
                                <h6 className="mb-1">Projects</h6>
                                <p className="text-sm">Architects design houses</p>
                            </div>
                            <div className="row">
                                <div className="col-xl-3 col-md-6 mb-xl-0 mb-4">
                                    <div className="card card-blog card-plain">
                                        <div className="card-header p-0 mt-n4 mx-3">
                                            <a className="d-block shadow-xl border-radius-xl">
                                                <img
                                                    src="../assets/img/home-decor-1.jpg"
                                                    alt="img-blur-shadow"
                                                    className="img-fluid shadow border-radius-xl"
                                                />
                                            </a>
                                        </div>
                                        <div className="card-body p-3">
                                            <p className="mb-0 text-sm">Project #2</p>
                                            <a href="javascript:;">
                                                <h5>Modern</h5>
                                            </a>
                                            <p className="mb-4 text-sm">
                                                As Uber works through a huge amount of internal management
                                                turmoil.
                                            </p>
                                            <div className="d-flex align-items-center justify-content-between">
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-primary btn-sm mb-0"
                                                    fdprocessedid="mbwgix"
                                                >
                                                    View Project
                                                </button>
                                                <div className="avatar-group mt-2">
                                                    <a
                                                        href="javascript:;"
                                                        className="avatar avatar-xs rounded-circle"
                                                        data-bs-toggle="tooltip"
                                                        data-bs-placement="bottom"
                                                        aria-label="Elena Morison"
                                                        data-bs-original-title="Elena Morison"
                                                    >
                                                        <img
                                                            alt="Image placeholder"
                                                            src="../assets/img/team-1.jpg"
                                                        />
                                                    </a>
                                                    <a
                                                        href="javascript:;"
                                                        className="avatar avatar-xs rounded-circle"
                                                        data-bs-toggle="tooltip"
                                                        data-bs-placement="bottom"
                                                        aria-label="Ryan Milly"
                                                        data-bs-original-title="Ryan Milly"
                                                    >
                                                        <img
                                                            alt="Image placeholder"
                                                            src="../assets/img/team-2.jpg"
                                                        />
                                                    </a>
                                                    <a
                                                        href="javascript:;"
                                                        className="avatar avatar-xs rounded-circle"
                                                        data-bs-toggle="tooltip"
                                                        data-bs-placement="bottom"
                                                        aria-label="Nick Daniel"
                                                        data-bs-original-title="Nick Daniel"
                                                    >
                                                        <img
                                                            alt="Image placeholder"
                                                            src="../assets/img/team-3.jpg"
                                                        />
                                                    </a>
                                                    <a
                                                        href="javascript:;"
                                                        className="avatar avatar-xs rounded-circle"
                                                        data-bs-toggle="tooltip"
                                                        data-bs-placement="bottom"
                                                        aria-label="Peterson"
                                                        data-bs-original-title="Peterson"
                                                    >
                                                        <img
                                                            alt="Image placeholder"
                                                            src="../assets/img/team-4.jpg"
                                                        />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-md-6 mb-xl-0 mb-4">
                                    <div className="card card-blog card-plain">
                                        <div className="card-header p-0 mt-n4 mx-3">
                                            <a className="d-block shadow-xl border-radius-xl">
                                                <img
                                                    src="../assets/img/home-decor-2.jpg"
                                                    alt="img-blur-shadow"
                                                    className="img-fluid shadow border-radius-lg"
                                                />
                                            </a>
                                        </div>
                                        <div className="card-body p-3">
                                            <p className="mb-0 text-sm">Project #1</p>
                                            <a href="javascript:;">
                                                <h5>Scandinavian</h5>
                                            </a>
                                            <p className="mb-4 text-sm">
                                                Music is something that every person has his or her own
                                                specific opinion about.
                                            </p>
                                            <div className="d-flex align-items-center justify-content-between">
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-primary btn-sm mb-0"
                                                    fdprocessedid="j2l2ta"
                                                >
                                                    View Project
                                                </button>
                                                <div className="avatar-group mt-2">
                                                    <a
                                                        href="javascript:;"
                                                        className="avatar avatar-xs rounded-circle"
                                                        data-bs-toggle="tooltip"
                                                        data-bs-placement="bottom"
                                                        aria-label="Nick Daniel"
                                                        data-bs-original-title="Nick Daniel"
                                                    >
                                                        <img
                                                            alt="Image placeholder"
                                                            src="../assets/img/team-3.jpg"
                                                        />
                                                    </a>
                                                    <a
                                                        href="javascript:;"
                                                        className="avatar avatar-xs rounded-circle"
                                                        data-bs-toggle="tooltip"
                                                        data-bs-placement="bottom"
                                                        aria-label="Peterson"
                                                        data-bs-original-title="Peterson"
                                                    >
                                                        <img
                                                            alt="Image placeholder"
                                                            src="../assets/img/team-4.jpg"
                                                        />
                                                    </a>
                                                    <a
                                                        href="javascript:;"
                                                        className="avatar avatar-xs rounded-circle"
                                                        data-bs-toggle="tooltip"
                                                        data-bs-placement="bottom"
                                                        aria-label="Elena Morison"
                                                        data-bs-original-title="Elena Morison"
                                                    >
                                                        <img
                                                            alt="Image placeholder"
                                                            src="../assets/img/team-1.jpg"
                                                        />
                                                    </a>
                                                    <a
                                                        href="javascript:;"
                                                        className="avatar avatar-xs rounded-circle"
                                                        data-bs-toggle="tooltip"
                                                        data-bs-placement="bottom"
                                                        aria-label="Ryan Milly"
                                                        data-bs-original-title="Ryan Milly"
                                                    >
                                                        <img
                                                            alt="Image placeholder"
                                                            src="../assets/img/team-2.jpg"
                                                        />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-md-6 mb-xl-0 mb-4">
                                    <div className="card card-blog card-plain">
                                        <div className="card-header p-0 mt-n4 mx-3">
                                            <a className="d-block shadow-xl border-radius-xl">
                                                <img
                                                    src="../assets/img/home-decor-3.jpg"
                                                    alt="img-blur-shadow"
                                                    className="img-fluid shadow border-radius-xl"
                                                />
                                            </a>
                                        </div>
                                        <div className="card-body p-3">
                                            <p className="mb-0 text-sm">Project #3</p>
                                            <a href="javascript:;">
                                                <h5>Minimalist</h5>
                                            </a>
                                            <p className="mb-4 text-sm">
                                                Different people have different taste, and various types of
                                                music.
                                            </p>
                                            <div className="d-flex align-items-center justify-content-between">
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-primary btn-sm mb-0"
                                                    fdprocessedid="89kltc"
                                                >
                                                    View Project
                                                </button>
                                                <div className="avatar-group mt-2">
                                                    <a
                                                        href="javascript:;"
                                                        className="avatar avatar-xs rounded-circle"
                                                        data-bs-toggle="tooltip"
                                                        data-bs-placement="bottom"
                                                        aria-label="Peterson"
                                                        data-bs-original-title="Peterson"
                                                    >
                                                        <img
                                                            alt="Image placeholder"
                                                            src="../assets/img/team-4.jpg"
                                                        />
                                                    </a>
                                                    <a
                                                        href="javascript:;"
                                                        className="avatar avatar-xs rounded-circle"
                                                        data-bs-toggle="tooltip"
                                                        data-bs-placement="bottom"
                                                        aria-label="Nick Daniel"
                                                        data-bs-original-title="Nick Daniel"
                                                    >
                                                        <img
                                                            alt="Image placeholder"
                                                            src="../assets/img/team-3.jpg"
                                                        />
                                                    </a>
                                                    <a
                                                        href="javascript:;"
                                                        className="avatar avatar-xs rounded-circle"
                                                        data-bs-toggle="tooltip"
                                                        data-bs-placement="bottom"
                                                        aria-label="Ryan Milly"
                                                        data-bs-original-title="Ryan Milly"
                                                    >
                                                        <img
                                                            alt="Image placeholder"
                                                            src="../assets/img/team-2.jpg"
                                                        />
                                                    </a>
                                                    <a
                                                        href="javascript:;"
                                                        className="avatar avatar-xs rounded-circle"
                                                        data-bs-toggle="tooltip"
                                                        data-bs-placement="bottom"
                                                        aria-label="Elena Morison"
                                                        data-bs-original-title="Elena Morison"
                                                    >
                                                        <img
                                                            alt="Image placeholder"
                                                            src="../assets/img/team-1.jpg"
                                                        />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-md-6 mb-xl-0 mb-4">
                                    <div className="card card-blog card-plain">
                                        <div className="card-header p-0 mt-n4 mx-3">
                                            <a className="d-block shadow-xl border-radius-xl">
                                                <img
                                                    src="https://images.unsplash.com/photo-1606744824163-985d376605aa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                                    alt="img-blur-shadow"
                                                    className="img-fluid shadow border-radius-xl"
                                                />
                                            </a>
                                        </div>
                                        <div className="card-body p-3">
                                            <p className="mb-0 text-sm">Project #4</p>
                                            <a href="javascript:;">
                                                <h5>Gothic</h5>
                                            </a>
                                            <p className="mb-4 text-sm">
                                                Why would anyone pick blue over pink? Pink is obviously a
                                                better color.
                                            </p>
                                            <div className="d-flex align-items-center justify-content-between">
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-primary btn-sm mb-0"
                                                    fdprocessedid="f2io19"
                                                >
                                                    View Project
                                                </button>
                                                <div className="avatar-group mt-2">
                                                    <a
                                                        href="javascript:;"
                                                        className="avatar avatar-xs rounded-circle"
                                                        data-bs-toggle="tooltip"
                                                        data-bs-placement="bottom"
                                                        aria-label="Peterson"
                                                        data-bs-original-title="Peterson"
                                                    >
                                                        <img
                                                            alt="Image placeholder"
                                                            src="../assets/img/team-4.jpg"
                                                        />
                                                    </a>
                                                    <a
                                                        href="javascript:;"
                                                        className="avatar avatar-xs rounded-circle"
                                                        data-bs-toggle="tooltip"
                                                        data-bs-placement="bottom"
                                                        aria-label="Nick Daniel"
                                                        data-bs-original-title="Nick Daniel"
                                                    >
                                                        <img
                                                            alt="Image placeholder"
                                                            src="../assets/img/team-3.jpg"
                                                        />
                                                    </a>
                                                    <a
                                                        href="javascript:;"
                                                        className="avatar avatar-xs rounded-circle"
                                                        data-bs-toggle="tooltip"
                                                        data-bs-placement="bottom"
                                                        aria-label="Ryan Milly"
                                                        data-bs-original-title="Ryan Milly"
                                                    >
                                                        <img
                                                            alt="Image placeholder"
                                                            src="../assets/img/team-2.jpg"
                                                        />
                                                    </a>
                                                    <a
                                                        href="javascript:;"
                                                        className="avatar avatar-xs rounded-circle"
                                                        data-bs-toggle="tooltip"
                                                        data-bs-placement="bottom"
                                                        aria-label="Elena Morison"
                                                        data-bs-original-title="Elena Morison"
                                                    >
                                                        <img
                                                            alt="Image placeholder"
                                                            src="../assets/img/team-1.jpg"
                                                        />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className="page-header align-items-start min-vh-100">

                    <div className="container my-auto">
                        <div className="row">
                            <div className="col-lg-4 col-md-8 col-12 mx-auto">
                                <div className="card z-index-0 fadeIn3 fadeInBottom">
                                    <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                        <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                                            <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">Update Serviceprovider</h4>
                                        </div>
                                    </div>

                                    <div className="card-body">

                                        <form onSubmit={handleSubmit(submitHandler)} role="form" class="text-start">


                                            <div className="input-group input-group-outline my-3">

                                                <input type="text" className="form-control font-weight-bolder" placeholder="Email.."  {...register("email")} />

                                            </div>

                                            {/* <div className="input-group input-group-outline my-3">

                                                <select {...register("category")}>

                                                    <option>SELECT Category</option>
                                                    {categories?.map((cat) => {
                                                        return (
                                                            <>
                                                                <option value={cat._id}>{cat.name}</option>
                                                            </>
                                                        );
                                                    })}
                                                </select>
                                            </div> */}

                                            {/* <div className="input-group input-group-outline my-3">

                                                <select {...register("subcategory")}>

                                                    <option>SELECT Sub-Category</option>
                                                    {subcategories?.map((subcat) => {
                                                        return (
                                                            <>
                                                                <option value={subcat._id}>{subcat.name}</option>
                                                            </>
                                                        );
                                                    })}
                                                </select>
                                            </div> */}

                                            {/* <div className="input-group input-group-outline my-3">

                                                <select {...register("type")}>

                                                    <option>SELECT Type</option>
                                                    {types?.map((type) => {
                                                        return (
                                                            <>
                                                                <option value={type._id}>{type.name}</option>
                                                            </>
                                                        );
                                                    })}
                                                </select>
                                            </div> */}

                                            <div className="input-group input-group-outline my-3">

                                                <input type="text" className="form-control font-weight-bolder" placeholder="Name"  {...register("name")} />
                                            </div>

                                            <div className="input-group input-group-outline my-3">

                                                <input type="text" className="form-control font-weight-bolder mb-0" placeholder="Phone"  {...register("phone")} />
                                            </div>

                                            <div className="text-center">
                                                <button type="submit"
                                                    className="btn bg-gradient-primary w-100 my-4 mb-2"
                                                    // onClick={() => postApiData()}
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
        </div>

    )
}

export default Profile

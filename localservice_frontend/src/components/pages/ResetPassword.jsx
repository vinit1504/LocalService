import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'

const ResetPassword = () => {


    const location = useLocation()
    const navigate = useNavigate()
    const [role, setrole] = useState()


    const { register, handleSubmit } = useForm({
        defaultValues: {
            email: location?.state?.email,
            role: location?.state?.role,
        },
    })

    const submitHandler = async (data) => {

        //put update...

        const dataToSend = {
            email: location?.state?.email,
            password: data.password,

        }

        if (location?.state?.role == "User") {

            const res = await axios.post("http://localhost:4000/users/user/resetpassword", data);
            if (res.data.flag == 1) {
                alert("Password reset success")
                navigate("/")
            }
            else {
                alert("Password reset failed")
                navigate("/") //login....
            }
        } else if (location?.state?.role == "service provider") {

            const res = await axios.post("http://localhost:4000/sproviders/sprovider/resetpassword", data);
            if (res.data.flag == 1) {
                alert("Password reset success")
                navigate("/")
            }
            else {
                alert("Password reset failed")
                navigate("/") //login....
            }

        }


    }

    return (
        <div
            className="page-header align-items-start min-vh-100"
            style={{
                backgroundImage:
                    'url("https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80")'
            }}
        >
            <span className="mask bg-gradient-dark opacity-6" />
            <div className="container my-auto">
                <div className="row">
                    <div className="col-lg-4 col-md-8 col-12 mx-auto">
                        <div className="card z-index-0 fadeIn3 fadeInBottom">
                            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                                    <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">
                                        Forgot Password
                                    </h4>

                                </div>
                            </div>
                            <div className="card-body">
                                <form
                                    role="form"
                                    className="text-start"
                                    onSubmit={handleSubmit(submitHandler)}
                                >

                                    <div className="input-group input-group-outline my-3">

                                        <input
                                            type="email"
                                            placeholder='Enter Email..'

                                            {...register("role")}
                                            className="form-control" disabled />
                                    </div>

                                    <div className="input-group input-group-outline my-3">

                                        <input
                                            type="email"
                                            placeholder='Enter Email..'

                                            {...register("email")}
                                            className="form-control" disabled />
                                    </div>

                                    <div className="input-group input-group-outline my-3">

                                        <input
                                            type="text"
                                            placeholder='Enter new password..'

                                            {...register("password")}
                                            className="form-control" />
                                    </div>

                                    <input
                                        className="btn bg-gradient-primary w-100 my-4 mb-2"
                                        type='submit'
                                        value="Submit">
                                    </input>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword

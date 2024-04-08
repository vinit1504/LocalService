import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'

const ForgotPassword = () => {

    const { register, handleSubmit } = useForm();
    const [role, setrole] = useState("65ccb273d0984494fb621f7b")
    const navigate = useNavigate()

    const submithandler = async (data) => {

        console.log(data)
        try {

            if (role == "65ccb273d0984494fb621f7b") {

                const res = await axios.post("http://localhost:4000/users/user/isuserexist", data)

                console.log(res.data)
                if (res.data.flag == 1) {
                    console.log("Email exist", res.data.data.email);
                    //setData in location
                    navigate("/resetpwd", {
                        state: {
                            email: res.data.data.email,
                            role: res.data.data.role.name
                        },

                    });
                }

            } else if (role == "65ccbf3ee5c62d495e19360e") {

                const res = await axios.post("http://localhost:4000/sproviders/sprovider/isserproexist", data)

                console.log(res.data)
                if (res.data.flag == 1) {
                    console.log("Email exist", res.data.data.email);
                    //setData in location
                    navigate("/resetpwd", {
                        state: {
                            email: res.data.data.email,
                            role: res.data.data.role.name
                        },

                    });
                }

            }
        }

        catch (e) {

            console.log(e)
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
                                    onSubmit={handleSubmit(submithandler)}
                                >

                                    <div className="input-group input-group-outline my-3"
                                    >

                                        <select
                                            className="input-group input-group-outline mb-3"
                                            value={role}
                                        onChange={(e) => setrole(e.target.value)}
                                        >
                                            <option>SELECT ROLE</option>
                                            <option value="65ccb273d0984494fb621f7b">
                                                User
                                            </option>
                                            <option value="65ccbf3ee5c62d495e19360e">
                                                Service Provider
                                            </option>
                                        </select>
                                    </div>

                                    <div className="input-group input-group-outline my-3">

                                        <input
                                            type="email"
                                            placeholder='Enter Email..'

                                            {...register("email")}
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

export default ForgotPassword

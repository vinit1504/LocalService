import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Address = () => {

    const [addresses, setaddresses] = useState([])
    const getuserbyid = async () => {

        try {
            const id = localStorage.getItem("id")
            const res = await axios.get("http://localhost:4000/users/user/" + id)
            console.log(res.data.data)
            setaddresses(res.data.data.addresses)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {

        getuserbyid()
    }, [])
    return (
        <div className="container-fluid py-4">

            <div className="row">
                <div className="col-12">
                    <div className="card my-4">
                        <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                            <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                                <h6 className="text-white text-capitalize ps-3">Select Address before payment...</h6>
                            </div>
                        </div>
                        <div className="card-body px-0 pb-2">
                            <div className="table-responsive p-0">
                                <table className="table align-items-center mb-0">
                                    <thead>
                                        <tr>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                Address
                                            </th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                                City
                                            </th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                State
                                            </th>
                                            {/* <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                pincode
                                            </th> */}
                                            <th className="text-secondary opacity-7" />
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {addresses?.map((address) => {
                                            return (



                                                <tr>
                                                    <td>
                                                        <div className="d-flex px-2 py-1">

                                                            <div className="d-flex flex-column justify-content-center">
                                                                <h6 className="mb-0 text-sm">{address.address}</h6>

                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p className="text-xs font-weight-bold mb-0">{address.city}</p>

                                                    </td>
                                                    <td className="align-middle text-center text-sm">

                                                        <p className="text-xs font-weight-bold mb-0">{address.state}</p>

                                                    </td>
                                                    {/* <td className="align-middle text-center">
                                                        <span className="text-secondary text-xs font-weight-bold">
                                                            23/04/18
                                                        </span>
                                                    </td> */}
                                                    <td className="align-middle">
                                                        <a
                                                            href="javascript:;"
                                                            className="badge badge-sm bg-gradient-success"
                                                            data-toggle="tooltip"
                                                            data-original-title="Edit user"
                                                        >
                                                            Select
                                                        </a>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default Address

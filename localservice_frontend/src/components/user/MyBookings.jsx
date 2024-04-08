import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomeLoader from '../CustomeLoader';

const MyBookings = () => {

  // const navigate = useNavigate()
  const [isLoading, setisLoading] = useState(false)
  const [bookings, setbookings] = useState([])


  const getBookings = async () => {
    const id = localStorage.getItem("id")

    try {

      setisLoading(true)
      const res = await axios.get("http://localhost:4000/bookings/booking/user/" + id)
      console.log(res.data.data)
      setbookings(res.data.data)
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
      setisLoading(false)

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

    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {

    getBookings()
  }, [])

  return (

    <div className="col-12 mt-4" >

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
      <div className="mb-5 ps-3">
        <h4 className="mb-1 font-weight-bolder" style={{ marginInlineStart: "22px" }}>Bookings</h4>
        {/* <p className="font-weight-bolder">You can book services shown below...</p> */}
      </div>
      {isLoading ? (
        <CustomeLoader />
      ) : (
        <>

            <div className="row" >
              {
                bookings?.map((booking) => {

                  return (
                    <div className="col-xl-3 col-md-6 mb-xl-0 mb-5" style={{ width: "425px", marginInlineStart: "15px" }}>
                      <div className="card card-blog card-plain">
                        <div className="card-header p-0 mt-n4 mx-3">
                          <a className="col-xl-3 col-md-6 mb-xl-0 mb-5">
                            <img
                              src="https://res.cloudinary.com/dduum8wwj/image/upload/v1710050022/nlbo5vmlukyctyv9wt7h.jpg"
                              alt="img-blur-shadow"
                              className="img-fluid shadow border-radius-xl justify-content-center "
                              style={{ height: "250px" }}
                            />
                          </a>
                        </div>
                        <div className="card-body p-3">


                          <p className="mb-0 text-sm">
                            <h6> Service Id :</h6>{booking?.serviceId}.<br></br>
                            <h6>Service-Provider Id :</h6> {booking?.serviceprovider}.<br></br>
                            <h6>totalAmount :</h6>{booking?.totalAmount}.<br></br>
                            <h6>Status of payment :</h6>{booking?.status}.<br></br>

                          </p>
                          <div className="d-flex align-items-center justify-content-between">
                            {/* <button
                            type="button"
                            className="btn bg-gradient-primary w-100 my-2 mb-4"


                          > */}
                            <Link
                              to={`/user/paymentdemo/${booking._id}`}
                              className="btn bg-gradient-primary w-100 my-2 mb-4"
                            >
                              pay now
                            </Link>

                            {/* </button> */}
                          </div>
                          <div className="d-flex align-items-center justify-content-between">
                            <button
                              type="button"
                              className="btn bg-gradient-primary w-100 my-2 mb-4"
                              onClick={() => deletebooking(booking._id)} >

                              Cancel booking
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  )
                })
              }


            </div>
        </>
      )}
    </div>
  )
}

export default MyBookings

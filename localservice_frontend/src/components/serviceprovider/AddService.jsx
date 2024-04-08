import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import CustomeLoader from "../CustomeLoader";

const AddService = () => {


  const { register, handleSubmit, reset } = useForm();
  const [categories, setcategories] = useState([]);
  const [subcategories, setSubcategories] = useState([])
  const [types, setTypes] = useState([])
  const [isLoading, setisLoading] = useState(false)
  const navigate = useNavigate()


  const submitHandler = async (data) => {

    // var userObj = Object.assign(data);
    // console.log("userObj...", userObj);
    const id = localStorage.getItem("id")
    const dataObj = Object.assign(data, { serviceprovider: id })

    setisLoading(true);
    try {
      //api calling...


      if (id !== undefined) {

        const res = await axios.post("http://localhost:4000/services/services", dataObj);
        console.log(res.data.data)
        console.log(data);
        toast.success('🦄 Service added successfully...', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",

        });
        setTimeout(() => {
          navigate("/serviceprovider/servicelist")

        }, 2000);

        // alert("data posted")
      } else if (res.status == 500) {

        alert("Data not posted")
      }


    } catch (e) {

      console.log(e)
      toast.error('🦄 Error in creating service !', {
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
    reset();
    setisLoading(false);

  }


  const loadCategories = async () => {

    setisLoading(true)

    const res = await axios.get("http://localhost:4000/categories/category");
    // console.log(res.data.data);
    setcategories(res.data.data);
    setisLoading(false)

  };


  const loadSubCategories = async () => {

    setisLoading(true)
    const res = await axios.get("http://localhost:4000/Scategories/Scategory");
    // console.log(res.data.data);
    setSubcategories(res.data.data);
    setisLoading(false)

  };

  const loadTypes = async () => {

    setisLoading(true)
    const res = await axios.get("http://localhost:4000/types/type")
    // console.log(res.data.data)
    setTypes(res.data.data)
    setisLoading(false)

  }

  useEffect(() => {
    loadCategories();
    loadSubCategories();
    loadTypes();
  }, []);


  return (



    <div className="page-header align-items-start min-vh-100">
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
              <div className="container my-auto">
                <div className="row">
                  <div className="col-lg-4 col-md-8 col-12 mx-auto">
                    <div className="card z-index-0 fadeIn3 fadeInBottom">
                      <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                        <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                          <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">Add Service</h4>
                        </div>
                      </div>



                      <div className="card-body">

                        <form onSubmit={handleSubmit(submitHandler)} role="form" class="text-start">


                          <div className="input-group input-group-outline my-3">

                            <input type="text" className="form-control font-weight-bolder" placeholder="Service Name.."  {...register("servicename")} />

                          </div>
                          <div className="input-group input-group-outline my-3">

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
                          </div>

                          <div className="input-group input-group-outline my-3">

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
                          </div>

                          <div className="input-group input-group-outline my-3">

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
                          </div>

                          <div className="input-group input-group-outline my-3">

                            <input type="text" className="form-control font-weight-bolder" placeholder="Fees"  {...register("fees")} />
                          </div>

                          <div className="input-group input-group-outline my-3">

                            <input type="text" className="form-control font-weight-bolder mb-0" placeholder="Area"  {...register("area")} />
                          </div>

                          <div className="input-group input-group-outline my-3">

                            <input type="text" className="form-control font-weight-bolder mb-0" placeholder="City"  {...register("city")} />
                          </div>

                          <div className="input-group input-group-outline my-3">

                            <input type="text" className="form-control font-weight-bolder mb-0" placeholder="State"  {...register("state")} />
                          </div>

                          {/* <div className="input-group input-group-outline my-3"> */}

                          {/* <label >file</label> */}
                          {/* <input type="file" placeholder="choose image"{...register("myImage")} /> */}

                          {/* </div> */}

                          <div className="text-center">
                            <input type="submit"
                              className="btn bg-gradient-primary w-100 my-4 mb-2"
                              // onClick={() => postApiData()}
                              value="submit" />
                          </div>


                        </form>


                      </div>

                    </div>
                  </div>
                </div>
              </div>
          </>
        )
      }
    </div>

  );
};

export default AddService;

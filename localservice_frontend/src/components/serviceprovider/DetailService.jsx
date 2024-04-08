import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import CustomeLoader from '../CustomeLoader';

// import React from 'react'

const DetailService = () => {
    const cards = [{
        id: 1,
        title: "Card 1",
        content: "This is content of card"

    }]

    const [isLoading, setisLoading] = useState([])
    const navigate = useNavigate()
    const [service, setservice] = useState([])
    const id = useParams().id;

    const submitHandler = async () => {
        try {

            setisLoading(true)
            const res = await axios.get(
                "http://localhost:4000/services/services/" + id
            );
            console.log(res.data.data);
            setservice(res.data.data);
            setisLoading(false)

        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        submitHandler()

    }, [])

    return (


        <div className="container mt-5">
            {isLoading ? (
                <CustomeLoader />
            ) : (
                <>
                        <div className="row">
                            {cards.map((card) => (
                                <div key={card.id} className="col-md-4 mb-4">
                                    <div className="card" style={{ border: '2px solid black' }}>
                                        <img
                                            src="https://res.cloudinary.com/dduum8wwj/image/upload/v1710050022/nlbo5vmlukyctyv9wt7h.jpg"
                                            className="card-img-top"
                                            alt={`Card ${service._id}`}
                                        />

                                        <div className="card-body p-4">
                                            {/* <h5 className="card-title">{service.servicename}</h5> */}


                                            <h3 className="card-title " style={{ color: 'solid black' }}>{service?.servicename}...</h3>
                                            <p className="card-title">
                                                <h6> Category :-</h6>
                                                {service?.category?.name}
                                            </p>
                                            <p className="card-title">
                                                <h6> Sub-Category :-</h6>
                                                {service?.subcategory?.name}
                                            </p>
                                            <p className="card-title">
                                                <h6> Type :-</h6>
                                                {service?.type?.name}
                                            </p>
                                            <p className="card-title">
                                                <h6> Fees :-</h6>
                                                {service?.fees}
                                            </p>
                                            <p className="card-title">
                                                <h6> Area :-</h6>
                                                {service?.area}
                                            </p>
                                            <p className="card-title">
                                                <h6> City :-</h6>
                                                {service?.city}
                                            </p>
                                            <p className="card-title">
                                                <h6> State :-</h6>
                                                {service?.state}
                                            </p>


                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                </>
            )}
        </div>
    )
}

export default DetailService
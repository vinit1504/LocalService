import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import Sign_in from "../components/pages/Sign_in"


const useAuth = () => {

    const [isAuthenticated, setisAuthenticated] = useState(false)

    useEffect(() => {

        if (localStorage.getItem("id") != null) {

           setisAuthenticated(true)
        }
    },[])

    return isAuthenticated;
}

export const ProtectedRoutes = ()=>{

    const auth = useAuth();
    console.log("auth...",auth)

    return auth == true ? <Outlet/> :<Sign_in/>
}
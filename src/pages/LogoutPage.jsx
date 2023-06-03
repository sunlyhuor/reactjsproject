import JsCookie from "js-cookie"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function LogoutPage(){
        const navigate = useNavigate()
       
        useEffect(()=>{
            JsCookie.remove("logined")
            JsCookie.remove("code")
            JsCookie.remove("isAdmin")
            localStorage.setItem("access_token" , "")
            localStorage.setItem("refresh_token" , "")
            navigate("/signin")
        } , [] )

    return(
        <>
            <h1>Logout ..............</h1>
        </>
    )
}
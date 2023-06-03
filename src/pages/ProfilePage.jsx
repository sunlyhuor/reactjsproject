import axios from "axios"
import { useState } from "react"
import { BackendLink } from "../assets/components/components"
import JsCookie from "js-cookie"
import { useNavigate } from "react-router-dom"
import LoadingComponent from "../assets/components/Loading"

export default function ProfilePage(){

    let [ Loading , setLoading ] = useState(false)
    let [ Profile , setProfile ] = useState({})
    const navigate = useNavigate()

    async function fetchProfile(){
        try {
            setLoading( false )
            const datas = await axios.get( BackendLink() + "/api/v1/auth/user/profile" , {
                headers:{
                    "access_token":localStorage.getItem("access_token")
                }
            } )
            setProfile( datas.data.responses[0] )
            // console.log( datas.data.responses[0] )
        } catch (error) {
            setLoading( false )
            // console.log( error )
        }finally{
            setLoading( true )
        }
    }

    useState(()=>{

        if( JsCookie.get("logined") == "true" ){
            fetchProfile()
        }else{
            navigate("/signout")
        }


    } , [] )

    return(
        <main>
            <section className=" w-10/12 m-auto" >

                {
                    Loading?(
                        <div className="flex justify-evenly flex-wrap " >
                            <div>
                                <img className="w-[200px] rounded-[50%] border-[5px] border-blue-600" src={ Profile.auth_photo } alt="" />
                            </div>
                            <div>
                                <h2 className="text-center text-3xl py-[20px] underline "  >Personal Details</h2>
                                <form>
                                    <div className="flex flex-col mb-[6px] " >
                                        <label htmlFor="">FirstName</label>
                                        <input type="text" disabled value={ Profile.auth_firstname  } />
                                    </div>
                                    {/*  */}
                                    <div className="flex flex-col mb-[6px] " >
                                        <label htmlFor="">LastName</label>
                                        <input type="text" disabled value={ Profile.auth_lastname } />
                                    </div>
                                    {/*  */}
                                    <div className="flex flex-col mb-[6px] " >
                                        <label htmlFor="">UserName</label>
                                        <input type="text" disabled value={ Profile.auth_username } />
                                    </div>
                                    {/*  */}
                                    <div className="flex flex-col mb-[6px] " >
                                        <label htmlFor="">Email</label>
                                        <input type="text" disabled value={ Profile.auth_email } />
                                    </div>
                                    {/*  */}
                                    <div className="flex flex-col mb-[6px] " >
                                        <label htmlFor="">Phone</label>
                                        <input type="text" disabled value={ ( Profile.auth_phone == null ) ? "NULL" : Profile.auth_phone } />
                                    </div>
                                </form>
                            </div>
                        </div>
                    ):(
                        <div className="text-center" >
                            <LoadingComponent />
                        </div>
                    )
                }

            </section>
        </main>
    )
}
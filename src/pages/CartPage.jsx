import axios from "axios"
import { BackendLink } from "../assets/components/components"
import { useEffect, useState } from "react"
import { Link , useNavigate } from "react-router-dom"
import JsCookie from "js-cookie"
import LoadingComponent from "../assets/components/Loading"


export default function CartPage(){
    let [ Cart , setCart ] = useState([])
    let [ Loading , setLoading ] = useState(false)


    const navigate = useNavigate()

    async function fetchCart(){
        try {  
            setLoading(false)
            const datas = await axios.get( BackendLink() + "/api/v1/buycourse/mycart" , {
                headers:{
                    "access_token": localStorage.getItem("access_token") 
                }
            } )
            // console.log(datas)
            // console.log( datas.data.responses )
            setCart(datas.data.responses)

        } catch (error) {
            // console.log(error)
            setLoading(false)
            // console.log( error.response.data )
        }finally{
            setLoading(true)
        }
    }

    useEffect(()=>{

        if( JsCookie.get("logined") == "true" ){
            fetchCart()
        }else{
            navigate("/signout")
        }
    
    } , [] )
    
    return(
        <main>
            
            <h1 className="text-center p-[10px] mb-[10px] text-2xl underline font-bold" >My Carts</h1>
            <div className="flex w-10/12 m-auto gap-[20px] flex-wrap justify-center" >

                {
                    (Loading)?(

                        ( Cart.length < 1 )?(
                            <h1>No more</h1>
                        ):(

                        Cart.map((d , k)=>(
                            
                            <div key={k} className="min-[0px]:w-full sm:w-5/12 lg:w-3/12 xl-4/12 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <div>
                                    <img className="h-[150px] w-full rounded-t-lg" src={ d.course.course_thumbnail } alt="product image" />
                                </div>
                                <div className="px-5 pb-5">
                                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{d.course.course_title}</h5>
                                    <p>
                                        Bought on : { `${new Date( d.buy_course_createat ).getDate()}-${new Date( d.buy_course_createat ).getMonth()+1}-${new Date( d.buy_course_createat ).getFullYear()}` }
                                    </p>
                                    <p>
                                        Expired on : { `${new Date( d.expired_date ).getDate()}-${new Date( d.expired_date ).getMonth()+1}-${new Date( d.expired_date ).getFullYear()}` }
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-3xl font-bold text-gray-900 dark:text-white">${ d.buy_price }</span>
                                        {
                                            ( d.status.status_name.toLowerCase() == "padding" ) ? (
                                                <span>{ d.status.status_name }</span>
                                            ): (
                                                d.status.status_name == "Wrong TID"?(
                                                    <span className="py-[5px] px-[10px] bg-red-600 text-white rounded cursor-pointer" >{ d.status.status_name }</span>
                                                ):(
                                                    ( new Date() < new Date( d.expired_date ) )?(
                                                        <Link to={"/courses/"+d.course.course_title } ><button className="bg-blue-600 text-white py-[3px] px-[10px] rounded " > WATCH NOW </button></Link>
                                                    ):(
                                                        <Link to={"/courses/"+d.course.course_title } ><button className="bg-blue-600 text-white py-[3px] px-[10px] rounded " > BUY THIS COURSE AGAIN </button></Link>
                                                    )
                                                )
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        )

                        ))

                    ):(
                        <div className="text-center" >
                            <LoadingComponent />
                        </div>  
                    )
                }

            </div>

            


        </main>
    )
}
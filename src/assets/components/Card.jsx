// import course_style from "@/styles/course.module.css"
import { Link } from "react-router-dom"
import "../../assets/css/card.css"
import { useState } from "react"
import ByCourse from "./BuyCourse"
import { useNavigate } from "react-router-dom"
import JsCookie from "js-cookie"
import axios from "axios"

export default function CardComponent({ buycourses , id , title , picture , link , button , discount , price , date , type , created , month , cart , count }){
    let [ BuyCourseLoad , setBuyCourseLoad ] = useState(false)
    const navigate = useNavigate()
    const sybol = " > "

    // console.log( buycourses )
    
    function CheckBuy( code , array ){

            const datas = array.find(d=>{
                return d.auth.auth_code == code
            })
            if(datas) return true
            else return false

    }

    function getExpireDate( code , array ){
        const data = array.find( d=> {return (d.auth.auth_code == code && new Date() < new Date(d.expired_date))} )
        if( data ) return true
        else return false
    }

    // async function FechingCourse(){
    //     try {
    //         const datas = await axios.get("")
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    return(
        <>
            <ByCourse course_id={id} course_title={title} BuyCourseLoad={ BuyCourseLoad } SetBuyCourseLoad={ ()=> setBuyCourseLoad( !BuyCourseLoad ) } />
            <aside className="hover:scale-[1.01] relative hover:duration-300 max-w-sm bg-white min-[0px]:w-full sm:md:w-6/12 md:w-[48%] lg:w-3/12 xl:w-[24%] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <Link className="w-[250px] h-[150px] block w-full overflow-hidden" to={link}>
                        <img width={200} height={100} className="rounded object-auto w-full h-[150px] hover:scale-110 hover:duration-300" src={picture} alt="Error" />
                    </Link>
                    <div className="p-5">
                        <Link to={link}>
                            <h5 className={`lg:text-sm xl:text-xl font-bold tracking-tight text-gray-900 dark:text-white hover:underline hover:duration-300 title` }>{ title }</h5>
                        </Link>
                        {
                            (type == "course")?(
                                <>
                                    <div>
                                        <span>
                                            {price? ( new Date().getTime() < new Date(date).getTime() ? <del>{"$"+price}</del> :"$" + price ) :""} { (new Date().getTime() < new Date(date).getTime()) ? sybol : "" } { (new Date().getTime() < new Date(date).getTime()) ? "$"+ (price - ( discount * price /100 )) : "" }
                                        </span>
                                        <span className="absolute top-[0px] right-[-10px] bg-red-600 text-white rotate-45 text-sm px-[20px] z-[25]">
                                            {
                                                (new Date().getTime() < new Date(date).getTime()) ? <span>{discount}%</span> : <span></span>
                                            }
                                        </span>
                                    </div>
                                    <div>
                                        <span>
                                            Date : { month }/{ (month <= 1) ? <sub>Month</sub> : <sub>Months</sub> }
                                        </span>
                                    </div>
                                </>
                            ):""
                        }
                        <p className="mb-[5px]" >
                            Posted on : { `${new Date( created ).getDate()}-${new Date( created ).getMonth()+1}-${ new Date( created ).getFullYear() }` }
                        </p>
                        {
                            type == "course"?(
                                <p className="mb-[5px]" >
                                    Count : { count }
                                </p>
                            ):""
                        }
                        <p className="mb-[5px]" >
                            {
                                new Date().getTime() < new Date( date ).getTime() ? (
                                    <>
                                        Discount end on : { `${new Date( date ).getDate()}-${new Date( date ).getMonth()+1}-${ new Date( date ).getFullYear() }` }
                                    </>
                                ):"No discount yet!"
                            }
                        </p>
                        <div className="flex justify-between" >
                            <Link to={link}  >
                                <button className={"button mt-[10px] "} ><span>{button}</span><i></i></button>
                            </Link>
                            {
                                ( type == "course" )?
                                    (   
                                        JsCookie.get("logined") == "true" ? (
                                            ( buycourses.length < 1 )?(
                                                <button className={"button mt-[10px] "} onClick={()=> setBuyCourseLoad(true) } ><span>ADD TO CART</span><i></i></button>
                                            ):(
                                                ( CheckBuy( JsCookie.get("code") , buycourses ) )?(
                                                    ( getExpireDate( JsCookie.get("code") , buycourses ) )?(
                                                        ( buycourses[0].status.status_id == 2 )?(
                                                            <Link to={"/courses/"+title}>
                                                                <button className={"button mt-[10px] "} ><span>watching now</span><i></i></button>
                                                            </Link>
                                                        ):(
                                                            ( buycourses[0].status.status_id == 1 )?(
                                                                <button className={"button mt-[10px] "} ><span>Padding</span><i></i></button>
                                                            ):(
                                                                <button className={"button mt-[10px] "} ><span>WRONG TID</span><i></i></button>
                                                            )
                                                        )
                                                    ):(
                                                        <button className={"button mt-[10px] "} onClick={()=> setBuyCourseLoad(true) } ><span>buy again</span><i></i></button>
                                                    )
                                                    // ( buycourses[0].status.status_id == 2 )?(
                                                    //     <Link to={"/courses/"+title}>
                                                    //         <button className={"button mt-[10px] "} ><span>watching now</span><i></i></button>
                                                    //     </Link>
                                                    // ):(
                                                    //     <button className={"button mt-[10px] "} ><span>{buycourses[0].status.status_name}</span><i></i></button>
                                                    // )
                                                ):(
                                                    <button className={"button mt-[10px] "} onClick={()=> setBuyCourseLoad(true) } ><span>ADD TO CART</span><i></i></button>
                                                )
                                            )
                                        ):(
                                            <button className={"button mt-[10px] "} onClick={()=> navigate("/signin") } ><span>GO TO LOGIN</span><i></i></button>
                                        )

                                    ):""
                            }
                        </div>
                    </div>
            </aside>
        </>
    )
}
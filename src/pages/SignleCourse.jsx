import { useParams , Link, json, useNavigate } from "react-router-dom"
import { BackendLink } from "../assets/components/components"
import axios from "axios"
import { useEffect, useState } from "react"
import LoadingComponent from "../assets/components/Loading"
import "../assets/css/card.css"
import JsCookie from "js-cookie"
import ByCourse from "../assets/components/BuyCourse"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLock , faLockOpen } from "@fortawesome/free-solid-svg-icons"
import ReactPlayer from "react-player"


export default function SignleCoursePage(){
    const {title} = useParams()
    let [ Course , setCourse ] = useState([])
    let [Loading , setLoading] = useState(false)
    let [ LoadingEpisode , setLoadingEpisode ] = useState(false)
    let [ Episodes , setEpisodes ] = useState([])
    let [ BuyCourseLoad , setBuyCourseLoad ] = useState(false)
    const navigate = useNavigate()
    let [ checkVideo , setCheckVideo ] = useState(false)
    let [ CourseID , setCourseID ] = useState(null)
    let [ EpisodeID  ,setEpisodeID ] = useState(null)

    
    async function FetchCourseByTitle(){


        try {
            setLoading(false)
            const datas = await axios.get( BackendLink() + "/api/v1/course/"+title )
            setCourse( datas.data[0] )
            // console.log(datas.data[0] )
        } catch (error) {
            setLoading(false)
            console.log( error )
        }finally{
            setLoading(true)
        }

    }

    async function FetcingEpisode(){
        try {
            setLoadingEpisode(true)
            const datas = await axios.get( BackendLink()+"/api/v1/course/get/episodes/"+title)
            console.log(datas.data.responses)
            setEpisodes(datas.data.responses)
        } catch (error) {
            setLoadingEpisode(true)
            // console.log(error)
        }finally{
            setLoadingEpisode(false)
        }
    }

    async function getVideo( episode,  course , token ){
        try {
            const datas = await axios.get( BackendLink() + `/api/v1/course/get/videos/${episode}/${course}/${token}` )
            setCheckVideo(true)
            // console.log(datas)
        } catch (error) {
            setCheckVideo(false)
            // console.log(error)   
        }
    }

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

    function getStatus( code , array , status ){

        const data = array.find( d=> {return (d.auth.auth_code == code && d.status.status_name.toLowerCase() == status && new Date() < new Date(d.expired_date) ) } )
        if( data ) return true
        else return false

    }

    useEffect( ()=>{
        // if( JsCookie.get("logined") != "true" ){
        //     navigate("/signout")
        // }

        FetchCourseByTitle()
        // FetcingEpisode()
    
    } , [ BuyCourseLoad ] )

    return(
        <main className="flex md:justify-center flex-wrap min-[0px]:items-center md:items-start md:flex-row  min-[0px]:flex-col " >
            {/* Course Single data */}
            <section className="min-[0px]:w-11/12 lg:w-7/12" >
                {
                    checkVideo?(
                        <div className="text-center mb-[25px]" >
                            <ReactPlayer 
                                loop
                                controls
                                playing
                                url={ BackendLink()+`/api/v1/course/get/videos/${EpisodeID}/${CourseID}/${localStorage.getItem("access_token")}` } />
                        </div>
                    ):""
                }

                {
                    Loading ? (
                        <>  
                            {
                                Course?(
                                    <>
                                        <ByCourse course_id={ Course.course_id } course_title={Course.course_title} BuyCourseLoad={ BuyCourseLoad } SetBuyCourseLoad={ ()=> setBuyCourseLoad( !BuyCourseLoad ) } />
                                        <section className="min-[0px]:w-11/12 sm:w-8/12 m-auto rounded flex flex-col gap-[15px]" >
                                            <div className="w-full relative" >
                                                <img src={ Course.course_thumbnail } alt="" />
                                                <span className="absolute top-[10px] right-[-15px] text-white rotate-45 bg-red-600 px-[30px] " >
                                                    { 
                                                        (new Date() < new Date( Course.course_discount_date ) )? ( ( Course.course_discount + "%" ) ) : ("")
                                                    }
                                                </span>
                                            </div>
                                            <div>
                                                <h2 className="text-2xl" >{ Course.course_title }</h2>
                                                {
                                                    JsCookie.get("logined") == "true"?(
                                                        // console.log( CheckBuy( JsCookie.get("code") , Course.buycourses  ) )
                                                        CheckBuy( JsCookie.get("code") , Course.buycourses )?(
                                                            // console.log( getExpireDate( JsCookie.get("code") , Course.buycourses ) )
                                                            getExpireDate( JsCookie.get("code") , Course.buycourses )?(
                                                                getStatus( JsCookie.get("code") , Course.buycourses , "completed" )?(
                                                                    <button className={"bg-green-600 text-white px-[20px] rounded py-[3px] mt-[10px] "} ><span>Bought</span><i></i></button>
                                                                ):(
                                                                    getStatus( JsCookie.get("code") , Course.buycourses , "padding" )?
                                                                    (
                                                                        <button className={"button mt-[10px] "} ><span>Padding</span><i></i></button>
                                                                    ):
                                                                    (
                                                                        <button className={"button mt-[10px] "} ><span>wrong tid</span><i></i></button>
                                                                    )
                                                                )
                                                            ):(
                                                                <button onClick={()=> setBuyCourseLoad(true) } className={"button mt-[10px] "} ><span>buy again</span><i></i></button>
                                                            )
                                                        ):(
                                                            <button onClick={()=> setBuyCourseLoad(true) } className={"button mt-[10px] "} ><span>add to cart</span><i></i></button>
                                                        )
                                                        // Course.buycourses.map((d,k)=>(
                                                        //     d.auth.auth_code == JsCookie.get("code")?(
                                                        //         <button onClick={()=> setBuyCourseLoad(true) } className={"button mt-[10px] "} ><span>Bought</span><i></i></button>
                                                        //     ):(
                                                        //         <button onClick={()=> setBuyCourseLoad(true) } className={"button mt-[10px] "} ><span>add to cart</span><i></i></button>
                                                        //     )
                                                        // ))
                                                    ):(
                                                        <Link to={"/signin"} ><button className={"button mt-[10px] "} ><span>go to signin</span><i></i></button></Link>
                                                    )
                                                }
                                                
                                            </div>
                                            <p>
                                                Date :  { Course.course_month + "/" } { (Course.course_month <= 1 )? <sub>Month</sub> :  ( <sub>Months</sub> ) }
                                            </p>
                                            <p>
                                                {Course.course_price? ( new Date() < new Date( Course.course_discount_date ) ? <del>{Course.course_price+"$"}</del> : Course.course_price + "$" ) :""} { (new Date() < new Date( Course.course_discount_date ) ) ? ">" : "" } { (new Date() < new Date( Course.course_discount_date ) ) ? Course.course_price - ( Course.course_discount * Course.course_price /100 )+"$" : "" }
                                                {/* price : { Course.course_price }$ */}
                                            </p>
                                            <p>
                                                posted on : { new Date( Course.course_createat  ).getDate() + "-" + (new Date( Course.course_createat ).getMonth()+1) + "-" + new Date( Course.course_createat  ).getFullYear() }
                                            </p>
                                            <p>
                                                Posted By : { Course.auth.auth_lastname }
                                            </p>
                                            <p className="px-[10px]" >
                                                { Course.course_description }
                                            </p>
                                        </section>
                                    </>
                                ):(
                                    <h1>No this course</h1>
                                )
                            }
                        </>
                    ):(
                        <div className="text-center" >
                            <LoadingComponent />
                        </div>
                    )
                }
            </section>
            {/* Episode */}
            <section className="min-[0px]:w-7/12 lg:w-4/12" >
                    <div className="" >
                        <h1 className="text-center underline text-xl" >Episodes</h1>
                        {
                            !Loading?(
                                <div className="text-center" >
                                    <LoadingComponent />
                                </div>
                            ):(
                                Course.episodes.length > 0?(
                                    <div>
                                        {
                                            Course.episodes.map((d,k)=>(
                                                JsCookie.get("logined") == "true"?(
   
                                                    CheckBuy( JsCookie.get("code") , Course.buycourses )?(
                                                            getExpireDate( JsCookie.get("code") , Course.buycourses )?(
                                                                getStatus( JsCookie.get("code") , Course.buycourses , "completed" )?(
                                                                    ( d.status.status_id == 2 )?(
                                                                        <h1 onClick={()=>{
                                                                            getVideo( d.episode_id , Course.course_id , localStorage.getItem("access_token") )
                                                                            setCourseID(Course.course_id)
                                                                            setEpisodeID(d.episode_id)
                                                                        } } className=" flex items-center cursor-pointer hover:opacity-[0.8] hover:duration-300 active:bg-blue-500 justify-evenly my-[10px] py-[5px] bg-green-400 text-white font-bold rounded text-center" key={k} >
                                                                            <span>{d.episode }-{d.episode_title} </span> <FontAwesomeIcon icon={faLockOpen} />
                                                                        </h1>
                                                                    ):(
                                                                        ""
                                                                    )
                                                                ):(
                                                                    getStatus( JsCookie.get("code") , Course.buycourses , "padding" )?
                                                                    (
                                                                        <h1 className=" cursor-not-allowed flex items-center justify-evenly my-[10px] py-[5px] bg-red-400 text-white font-bold rounded text-center" key={k} >
                                                                            <span>{d.episode }-{d.episode_title} <FontAwesomeIcon icon={faLock} /> </span>  {"Padding"}
                                                                        </h1>
                                                                    ):
                                                                    (
                                                                        <h1 className=" cursor-not-allowed flex items-center justify-evenly my-[10px] py-[5px] bg-red-400 text-white font-bold rounded text-center" key={k} >
                                                                            <span>{d.episode }-{d.episode_title} <FontAwesomeIcon icon={faLock} /> </span>  {"Wrong TID"}
                                                                        </h1>
                                                                    )
                                                                )
                                                            ):(
                                                                    <h1 className=" flex cursor-not-allowed items-center justify-evenly my-[10px] py-[5px] bg-red-400 text-white font-bold rounded text-center" key={k} >
                                                                        <span>{d.episode }-{d.episode_title} </span> <FontAwesomeIcon icon={faLock} />
                                                                    </h1>
                                                            )
                                                        )
                                                        :(
                                                            <h1 className=" flex cursor-not-allowed items-center justify-evenly my-[10px] py-[5px] bg-red-400 text-white font-bold rounded text-center" key={k} >
                                                                <span>{d.episode }-{d.episode_title} </span> <FontAwesomeIcon icon={faLock} />
                                                            </h1>
                                                            // <h1 className=" my-[10px] py-[5px] bg-red-400 text-white font-bold rounded text-center" key={k} >{ d.episode }-{d.episode_title}</h1>
                                                        )
                                                ):(
                                                    <h1 className=" flex items-center justify-evenly my-[10px] py-[5px] bg-red-400 text-white font-bold rounded text-center" key={k} >
                                                         <span>{d.episode }-{d.episode_title} </span> <FontAwesomeIcon icon={faLock} />
                                                    </h1>
                                                )
                                            ))
                                        }
                                    </div>
                                ):(
                                    <h1 className="text-center" >Not Episode yet</h1>
                                )
                            )
                        }
                </div>
            </section>

        </main>
    )
}
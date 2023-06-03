import CardComponent from "../assets/components/Card"
import axios from "axios"
import { BackendLink } from "../assets/components/components"
import { useEffect, useState } from "react"
import ByCourse from "../assets/components/BuyCourse"
import LoadingComponent from "../assets/components/Loading"

export default function CoursePage( { } ){

    let [ datas , setData ] = useState([])
    let [ Loading , setLoading ] = useState(false)
    let [ BuyCourseLoad , setBuyCourseLoad ] = useState(false)


    async function FetchCourse(){
        try{
            setLoading( false )
            const datas = await axios.get( BackendLink() + "/api/v1/course" )
            setData(datas.data)
            // console.log( datas.data.responses )
        }catch(err){
            setLoading(false)
            console.log(err)
        }
        finally{
            setLoading(true)
        }
    }

    useEffect(()=>{

        FetchCourse()

    } , [ BuyCourseLoad ] )

    return(
        <>
            <main className="w-10/12 mx-auto" >
                <section className="flex gap-[10px] justify-center flex-wrap" >
                    
                    { 
                        Loading?(
                            datas.responses ? datas.responses.map(( d , k )=>{
                                return(
                                    <CardComponent buycourses={d.buycourses} button={"See more"} count={ d.buycourses.length } id={ d.course_id  } key={k} title={ d.course_title } price={d.course_price} picture={d.course_thumbnail} link={"/courses/"+d.course_title} discount={d.course_discount} date={new Date( d.course_discount_date )} created={ new Date(d.course_createat) } month={ d.course_month } type={"course"} cart={true}  />
                                )
                            }) :<h1>{ datas.message }</h1>
                        ):(
                            <LoadingComponent />
                        )
                    }

                </section>
                <h1 className="text-center flex justify-center py-[10px] " >
                    <span>No More</span>
                </h1>
            </main>
        </>
    )
}
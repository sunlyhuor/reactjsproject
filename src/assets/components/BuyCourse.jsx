import axios from "axios"
import { useEffect, useState } from "react"
import { BackendLink } from "../../assets/components/components"
import AlertComponent from "./Alert"
import LoadingComponent from "./Loading"

export default function ByCourse( { course_id , BuyCourseLoad , course_title , SetBuyCourseLoad } ){


    let [ Methods , setMethods ] = useState([])
    let [TID , setTID] = useState("")
    let [ Seleted , setSelected ] = useState("")
    let [ Alert , setAlert ] = useState(false)
    let [ Message , setMessage ] = useState("")
    let [ Loading , setLoading ] = useState(false)

    async function fetchingMethod(){

        try {

            const datas = await axios.get( BackendLink()+"/api/v1/payment" )
            setMethods( datas.data.responses )


        } catch (error) {
            
        }

    }

    async function BuyCourseToCart(e){
        e.preventDefault()

        if( Seleted <= 0 || TID == "" || TID.length < 6 ){

            setAlert(true)
            setMessage("Please select method and input TID field with more than 6 char!")

        }else{

            try {
                setLoading(true)
                const responses = await axios.post(BackendLink()+"/api/v1/buycourse/buy" , {
                    course_id:course_id,
                    payment_id:Seleted,
                    payment_tid:TID
                },{
                    headers:{
                        "access_token":localStorage.getItem("access_token")
                    }
                }
                )
                setAlert(true)
                setMessage( responses.data.message )
                setTimeout(()=>{
                    SetBuyCourseLoad()
                } , 3000 )
                // console.log( responses.data )

            } catch (error) {
                setLoading(true)
                setAlert(true)
                setMessage( error.response.data.message )
                // console.log(error.response.data.message)
            }finally{
                setLoading(false)
            }

            // setAlert(true)
            // setMessage("Success")
        }

    }

    useEffect(()=>{ 

        fetchingMethod()

    } , [] )

   return(

    <>
        {
            BuyCourseLoad?(
                <main>
                    <section className="w-full h-screen fixed top-0 left-0 bg-black opacity-[0.1] z-[31] "></section>
                    <section className="z-[32] w-full h-screen fixed top-0 left-0 flex flex-col items-center mt-[50px]" >
                    <AlertComponent alert={Alert} changeAlert={ ()=> setAlert( !Alert ) } message={ Message } />
                        <form className="bg-white py-[25px] px-[20px] rounded min-[0px]:w-10/12 sm:9/12 md:w-7/12 lg:w-4/12 relative " >
                            <h1 className="text-center text-2xl underline " >Buy Course</h1>
                            <h1 >Id : { course_id } </h1>
                            <h1 className="mb-[10px]" >Title : { course_title } </h1>
                        
                            <div className="mb-6" >
                                <label htmlFor="method" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an method to pay</label>
                                <select id="method" onChange={(e)=> setSelected( e.target.value ) } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value={0} >Select a method</option>
                                    {
                                        Methods.map((d , i)=>{
                                            return(
                                                <option key={i} value={ d.payment_id }>{ d.payment_name }</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="tid" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">TID</label>
                                <input type="text" onChange={(e)=> setTID( e.target.value ) } id="tid" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ABC123" required />
                            </div>

                            <div>
                                {
                                    Loading?(
                                        <button className="text-center w-full h-[20px] rounded text-white py-[5px] " >
                                            <LoadingComponent />
                                        </button>
                                    ):(
                                        <button onClick={BuyCourseToCart} className="bg-blue-600 text-center w-full rounded text-white py-[5px] " >Add</button>
                                    )
                                }
                            </div>
                            <button onClick={()=> SetBuyCourseLoad() } className="absolute top-[5px] right-[10px]" >X</button>

                        </form>
                    </section>
                </main>
            ):""
        }
    </>
    
   ) 
}
import axios from "axios"
import { useEffect, useState } from "react"
import { BackendLink } from "../../components"
import AlertComponent from "../../Alert"
import LoadingComponent from "../../Loading"

export default function UpdateCourseAdminComponent( { LoadUpdateCourse , setLoadUpdateCourse , id , title , price , description , discount , discount_date , thumbail , month , status } ){
    let [ Status , setStatus ] = useState([])
    let [ status_id , setstatus ] = useState(null)
    let [ Id , setId ] = useState(id)
    let [ Title , setTitle ] = useState(title)
    let [ Price , setPrice ] = useState(price)
    let [ Description , setDescription ] = useState(description)
    let [ Discount , setDiscount ] = useState(discount)
    let [ DiscountDate , setDiscountDate ] = useState(discount_date)
    let [ Month , setMonth ] = useState(month)
    let [ Loading , setLoading ] = useState(false)
    let [ Alert , setAlert ] = useState(false)
    let [ Message , setMessage ] = useState("")
    
    async function FetchingStatus(){

        try {

            const datas = await axios.get( BackendLink() + "/api/v1/status" )
            setStatus( datas.data.responses )
            // console.log(datas.data.responses)       
        } catch (error) {
            console.log( error )
        }

    }

    async function HandleSubmit(e){
        e.preventDefault()
        // console.log( status_id )

        try {
            setLoading(true)
            const datas = await axios.put(BackendLink()+"/api/v1/course/update/course" , {
                course_id:id,
                title: Title == "" ? title : Title ,
                description:Description == "" ? description : Description ,
                status_id:status_id == null ? Number(status):Number(status_id),
                discount:Discount == "" ? discount : Discount ,
                discount_date:DiscountDate == "" ? discount_date : DiscountDate,
                price: Price? Price:price,
                month:Month?Month:month
            } , {
                headers:{
                    "access_token":localStorage.getItem("access_token")
                }
            } )
            setAlert(true)
            setMessage( datas.data.message )
            setLoading(true)
            setTimeout(()=>{
                setLoadUpdateCourse()
            } , 3000)
        } catch (error) {
            setLoading( true )
            setAlert(true)
            setMessage( error.response.data.message )
            // console.log(error)
        }finally{
            setLoading(false)
        }
        
    }

    useEffect(()=>{
        if( LoadUpdateCourse ){
            FetchingStatus()
        }

    } , [ LoadUpdateCourse ] )
    
    return(
        <main>
                <AlertComponent alert={Alert} changeAlert={()=> setAlert(!Alert) } message={Message} />
                {
                    LoadUpdateCourse?(
                        <>
                            <div className="fixed w-full h-screen left-0 top-0 bg-black opacity-[0.4] z-[9]" ></div>
                            <div className="z-[10] min-[0px]:w-11/12 sm:w-7/12 lg:w-5/12 absolute left-[5%] sm:left-[20%] lg:left-[25%] " >
                                <form className="bg-white z-[10] mb-[10px] px-[20px] py-[10px] relative  rounded " >
                                    <h1 className="py-[10px] text-2xl text-center" >Update Course</h1>
                                    
                                    <div className="mb-[10px]">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course Id</label>
                                        <input disabled type="text" defaultValue={id} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ABC123" />
                                    </div>
                                    <div className="mb-[10px]">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course Title</label>
                                        <input type="text" onChange={(e)=>{ setTitle( e.target.value ) }} defaultValue={title} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ABC123" />
                                    </div>
                                    <div className="mb-[10px]">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course Price</label>
                                        <input type="text" onChange={(e)=>{ setPrice(e.target.value) }} defaultValue={price} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ABC123" />
                                    </div>
                                    <div className="mb-[10px]">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course Discount</label>
                                        <input type="text" onChange={e=> setDiscount(e.target.value) } defaultValue={discount} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ABC123" />
                                    </div>
                                    <div className="mb-[10px]">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course Discount Date({ discount_date })</label>
                                        <input type="datetime-local" onChange={e=> setDiscountDate(e.target.value) } defaultValue={discount_date} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ABC123" />
                                    </div>
                                    <div className="mb-[10px]">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course Description</label>
                                        <textarea type="text" onChange={e=> setDescription(e.target.value) } defaultValue={description} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ABC123" />
                                    </div>
                                    <div className="mb-[10px]">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course Month</label>
                                        <input type="number" onChange={e=> setMonth(e.target.value) } defaultValue={month} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ABC123" />
                                    </div>
                                    <div className="mb-[10px]">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course Status ({status}) </label>
                                        <select id="countries" onChange={e=> setstatus(e.target.value) } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            <option value={1} > Choose a status</option>
                                            {
                                                Status.map((d,k)=>{
                                                    return(
                                                        <option key={k} value={d.status_id} >{d.status_name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        {/* <textarea type="text" defaultValue={status} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ABC123" /> */}
                                    </div>
                                    <div className="mb-[10px]" >
                                        {
                                            Loading?(
                                                <div className="text-center" >
                                                    <LoadingComponent />
                                                </div>
                                                ):(
                                                <button onClick={HandleSubmit} className="w-full text-center py-[10px] bg-blue-600 text-white rounded-[15px] active:bg-yellow-200 " >Update</button>
                                            )
                                        }
                                    </div>
                                    <span className="absolute top-[10px] right-[20px] text-xl cursor-pointer" onClick={()=> setLoadUpdateCourse() } >X</span>
                                </form>
                            </div>
                        </>
                    ):""
                }

        </main>
    )
}
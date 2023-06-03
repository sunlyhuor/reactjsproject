import axios from "axios"
import { useEffect, useState } from "react"
import { BackendLink } from "../../components"
import LoadingComponent from "../../Loading"
import AlertComponent from "../../Alert"

export default function AddCourseAdminComponent( { LoadAddCourse , setLoadAddCourse } ){

    let [ Loading , setLoading ] = useState(false)
    let [ Alert , setAlert ] = useState(false)
    let [ Message , setMessage ] = useState("")
    let [ StatusLoading , setStatusLoading ] = useState(false)
    let [ getStatus , setStatus ] = useState([])
    let [ Title , setTitle ] = useState("")
    let [ Price , setPrice ] = useState(null)
    let [ Discount , setDiscount ] = useState(null)
    let [ DiscountDate , setDiscountDate ] = useState(null)
    let [ Description , setDescription ] = useState("")
    let [ Month , setMonth ] = useState("")
    let [ Status , SetStatus ] = useState(null)
    let [ Thumbnail , setThumbnail ] = useState(null)

    async function FetchingStatus(){
        try {
            setStatusLoading(true)
            const datas = await axios.get( BackendLink() + "/api/v1/status" )
            setStatus( datas.data.responses )
            // console.log( datas.data.responses )

        } catch (error) {
            setStatusLoading(true)
            console.log( error )
        }finally{
            setStatusLoading(false)
        }
    }

    async function HandleSubmit(e){
        e.preventDefault()

        if( Title == "" ){
            setMessage("Title's required")
            setAlert(true)
        }else if( Price == null || Price < 1 ) {
            setMessage("Price's required and must more than 0 ")
            setAlert(true)
        }else if( Description == "" ){
            setMessage("Description's required")
            setAlert(true)
        }else if( Month == null || Month < 1 ){
            setMessage("Month's required and must more than 0!")
            setAlert(true)
        }else if( Thumbnail  == null || Thumbnail == undefined ){
            setMessage("Thumbnail's required")
            setAlert(true)
        }else if( Status == null ){
            setMessage("Please choose status")
            setAlert(true)
        }else{
            let form = new FormData()
            form.append("title" , Title)
            form.append("price" , Price)
            form.append( "discount" , Discount )
            form.append("discount_date" , DiscountDate)
            form.append("description" , Description)
            form.append("month" , Month)
            form.append("status" , Status)
            form.append( "categories" , "")
            form.append( "categories" , "")
            form.append("thumbnail" , Thumbnail )
            // console.log( form )
            try {
                const datas = await axios.post( BackendLink() + "/api/v1/course/create" , 
                    form,
                    {
                        headers:{
                            "access_token":localStorage.getItem("access_token")
                        }
                    }
                )
                setMessage( datas.data.message )
                setAlert(true)

            } catch (error) {
                setMessage(error.response.data.message)
                setAlert(true)
                console.log( error )
            }

        }

    }

    useEffect(()=>{

        if( LoadAddCourse == true ){
            FetchingStatus()
        }

    } , [ LoadAddCourse  ] )

    return(
        <main>
            <AlertComponent alert={Alert} changeAlert={()=> setAlert(!Alert) } message={Message} />
        {
            LoadAddCourse?(
                <>
                    <div className="bg-black w-full h-screen fixed top-0 left-0 opacity-[0.3] " ></div>
                    <div className="z-[10] min-[0px]:w-11/12 sm:w-7/12 lg:w-5/12 absolute left-[5%] sm:left-[20%] lg:left-[25%] " >
                            <form className="bg-white z-[10] mb-[10px] px-[20px] py-[10px] relative  rounded " >
                                <h1 className="py-[10px] text-2xl text-center" >Add Course</h1>
                                
                                {/* <div className="mb-[10px]">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course Id</label>
                                    <input disabled type="text"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ABC123" />
                                </div> */}
                                <div className="mb-[10px]">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course Title</label>
                                    <input type="text" onChange={e=> setTitle( e.target.value ) } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ABC123" />
                                </div>
                                <div className="mb-[10px]">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course Price</label>
                                    <input type="number" onChange={e=> setPrice(e.target.value) } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ABC123" />
                                </div>
                                <div className="mb-[10px]">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course Discount</label>
                                    <input type="number" onChange={e=> setDiscount( e.target.value ) }  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ABC123" />
                                </div>
                                <div className="mb-[10px]">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course Discount Date()</label>
                                    <input type="datetime-local" onChange={e=> setDiscountDate( e.target.value ) }  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ABC123" />
                                </div>
                                <div className="mb-[10px]">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course Description</label>
                                    <textarea type="text" onChange={e=> setDescription(e.target.value) } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ABC123" />
                                </div>
                                <div className="mb-[10px]">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course Month</label>
                                    <input type="number" onChange={e=> setMonth(e.target.value) } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ABC123" />
                                </div>
                                <div className="mb-[10px]">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course Status</label>
                                    {
                                        StatusLoading?(
                                            <div className="text-center" >
                                                <LoadingComponent />
                                            </div>
                                        ):(
                                            <select id="countries" onChange={e=> SetStatus(e.target.value) } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                <option value={""} >Choose a status</option>
                                                {
                                                    getStatus.map((d,k)=>{
                                                        return(
                                                            <option key={k} value={d.status_id} > { d.status_name } </option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        )
                                    }
                                    {/* <textarea type="text" tus} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ABC123" /> */}
                                </div>
                                <div className="mb-[10px]" >

                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload Thumbnail</label>
                                    <input onChange={e=>  setThumbnail( e.target.files[0] ) } accept="image/*" className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" />
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF.</p>

                                </div>
                                <div className="mb-[10px]" >
                                    {
                                        // Loading?(
                                        //     <div className="text-center" >
                                        //         <LoadingComponent />
                                        //     </div>
                                        //     ):(
                                            // )
                                    }
                                    <button onClick={ HandleSubmit }  className="w-full text-center py-[10px] bg-blue-600 text-white rounded-[15px] active:bg-yellow-200 " >Add</button>
                                </div>
                                <span className="absolute top-[10px] right-[20px] text-xl cursor-pointer" onClick={()=> setLoadAddCourse() } >X</span>
                            </form>
                    </div>
                </>
                ):""
            }
        </main>
    )
}
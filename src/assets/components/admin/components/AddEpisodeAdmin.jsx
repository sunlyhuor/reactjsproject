import axios from "axios"
import LoadingComponent from "../../Loading"
import { BackendLink } from "../../components"
import { useEffect, useState } from "react"
import AlertComponent from "../../Alert"

export default function AddEpisodeAdminComponent( { LoadEpisode , setLoadEpisode } ){

    let [ LoadingCourse , setLoadingCourse ] = useState(false)
    let [ Course , setCourse ] = useState([])
    let [ Status , setStatus ] = useState([])
    let [ select_course , set_course_seletct ] = useState(null)
    let [ Loading , setLoading ] = useState(false)
    let [ Alert , setAlert ] = useState(false)
    let [ Message , setMessage ] = useState("")
    let [ LoadingStatus , setLoadingStatus ] = useState(false)
    let [ Episode , setEpisode ] = useState(null)
    let [ Title , setTitle ] = useState("")
    let [ Description , setDescription ] = useState("")
    let [ select_status , set_select_status ] = useState(null)
    let [ Video , setVideo ] = useState(null)
    let [ UploadProgres , setUploadProgress ] = useState(0)
    

    async function FetchingCourse(){
        try {
            setLoadingCourse(true)
            const datas = await axios.get( BackendLink() + "/api/v1/course/admin/course" , {
                headers:{
                    "access_token":localStorage.getItem("access_token")
                }
            } )
            setCourse( datas.data.responses )
            // console.log( datas.data.responses )
        } catch (error) {
            setLoadingCourse(true)
            console.log( error )
        }finally{
            setLoadingCourse(false)
        }
    }

    async function FetchingStatus(){
        try {
            setLoadingStatus(true)
            const datas = await axios.get( BackendLink() + "/api/v1/status" )
            // console.log(datas.data.responses)
            setStatus( datas.data.responses )
        } catch (error) {
            setLoadingStatus(true)
            // console.log(error)
        }finally{
            setLoadingStatus(false)
        }
    }

    async function HandleSubmit(e){
        e.preventDefault()
        if( select_course == null || select_course == 0 ){
            setAlert(true)
            setMessage("Please select your course!")
        }else if( select_status == null || select_status == 0 ){
            setAlert(true)
            setMessage("Please select your status!")
        }else if( Title == "" ){
            setAlert(true)
            setMessage("Title's required!")
        }else if( Description == "" ){
            setAlert(true)
            setMessage("Description's required!")
        }else if( Video == null || Video == undefined ){
            setAlert(true)
            setMessage("Please select video episode!")
        }else if( Episode == null || Episode < 1 ){
            setAlert(true)
            setMessage("Episode's required!")
        }else{

            try {
                setLoading(true)
                let form = new FormData()
                form.append( "episode" , Episode )
                form.append( "title" , Title )
                form.append( "description" , Description )
                form.append( "course_id" , select_course )
                form.append( "status_id" , select_status )
                form.append( "video" , Video )
                const datas = await axios.post( BackendLink() + "/api/v1/course/post/episode" , 
                    form,
                    {
                        headers:{
                            "access_token":localStorage.getItem("access_token")
                        },
                        onUploadProgress: (progressEvent) => {
                            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                            setUploadProgress(progress);
                        },
                    }
                )
                // console.log(datas)
                setAlert(true)
                setMessage(datas.data.message)

            } catch (error) {
                setLoading(true)
                setAlert(true)
                setMessage(error.response.data.message)
                // console.log(error)
            }finally{
                setLoading(false)
            }

        }
    }

    useEffect(()=>{
        if( LoadEpisode ){
            FetchingCourse()
            FetchingStatus()
        }

    } , [ LoadEpisode ] )

    return(
        <main>
            <AlertComponent
                alert={Alert}
                changeAlert={()=> setAlert(!Alert) }
                message={Message}
            />
            {
                LoadEpisode?(
                    <>
                        <div className="fixed w-full h-screen bg-black opacity-[0.3] top-0 left-0" ></div>
                        <div className="z-[10] min-[0px]:w-11/12 sm:w-7/12 lg:w-5/12 absolute left-[5%] sm:left-[20%] lg:left-[25%] " >
                            <form className="bg-white z-[10] mb-[10px] px-[20px] py-[10px] relative  rounded " >
                                <h1 className="py-[10px] text-2xl text-center" >Upload Episode</h1>
                                
                                <div className="mb-[10px]">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Episode</label>
                                    <input type="number" onChange={e=> setEpisode(e.target.value) } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ABC123" />
                                </div>
                            
                                <div className="mb-[10px]">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course Title</label>
                                    <input type="text" onChange={e=> setTitle(e.target.value) } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ABC123" />
                                </div>
                                
                                <div className="mb-[10px]">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course Description</label>
                                    <textarea type="text" onChange={e=> setDescription(e.target.value) } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ABC123" />
                                </div>

                            
                                <div className="mb-[10px]" >

                                    {
                                        LoadingCourse?(
                                            <div className="text-center" >
                                                <LoadingComponent />
                                            </div>
                                        ):(
                                            <>
                                                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a Course</label>
                                                <select id="countries" onChange={(e)=> set_course_seletct(e.target.value) } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                    <option value={0}>Choose a course</option>
                                                    {
                                                        Course.map(( d , k )=>(
                                                            <option key={k} value={d.course_id} > { d.course_id } -{ d.course_title } </option>
                                                        ))
                                                    }
                                                </select>
                                            </>
                                        )
                                    }

                                </div>

                                <div className="mb-[10px]" >

                                    {
                                        LoadingStatus?(
                                            <div className="text-center" >
                                                <LoadingComponent />
                                            </div>
                                        ):(
                                            <>
                                                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a status</label>
                                                <select id="countries" onChange={(e)=> set_select_status(e.target.value) } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                    <option value={0}>Choose a status</option>
                                                    {
                                                        Status.map(( d , k )=>(
                                                            <option key={k} value={d.status_id} > { d.status_id } -{ d.status_name } </option>
                                                        ))
                                                    }
                                                </select>
                                            </>
                                        )
                                    }

                                </div>

                                <div className="mb-[10px]" >

                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload Video</label>
                                    <input accept="video/*" onChange={e=> setVideo( e.target.files[0] ) } className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" />
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">VIDEOS</p>

                                </div>

                                <div className="mb-[10px]" >
                                    {
                                        Loading?(
                                            <div className="text-center" >
                                                <LoadingComponent />
                                                { UploadProgres }
                                            </div>
                                            ):(
                                                <button onClick={ HandleSubmit }  className="w-full text-center py-[10px] bg-blue-600 text-white rounded-[15px] active:bg-yellow-200 " >Add</button>
                                            )
                                    }
                                </div>
                                <span className="absolute top-[10px] right-[20px] text-xl cursor-pointer" onClick={()=> setLoadEpisode() } >X</span>
                            </form>
                        </div>
                    </>
                ):""
            }
                                    
        </main>
    )
}
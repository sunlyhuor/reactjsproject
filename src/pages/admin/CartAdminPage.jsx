import axios from 'axios'
import { useNavigate , Link } from "react-router-dom"
import JsCookie from "js-cookie"
import { useEffect, useState } from 'react'
import { BackendLink } from "../../assets/components/components"
import Alertcomponent from "../../assets/components/Alert"


export default function CartAdminPage(){
    
    const navigate = useNavigate()
    let [ Carts , setCarts ] = useState([])
    let [ Loading , setLoading ] = useState(false)
    let [ status_id , set_status_id ] = useState(null)
    let [ buy_id , set_buy_id ] = useState(null)
    let [ Dailog , setDailog ] = useState(false)
    let [ Alert , setAlert ] = useState(false)
    let [ Message , setMessage ] = useState("")
    let [ Search , setSearch ] = useState("")
    let [ Items , setItesms ] = useState([])

    async function FetchingCart(){
        try {
            setLoading(true)
            const datas = await axios.get( BackendLink() + "/api/v1/buycourse" , {
                headers:{
                    "access_token":localStorage.getItem("access_token")
                }
            } ) 
            console.log( datas.data.responses )
            setCarts( datas.data.responses )

        } catch (error) {
            setLoading(true)
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    async function UpdateStatus(){
        try {
            const datas = await axios.put( BackendLink() + "/api/v1/buycourse/edit-status" , {
                buy_id:buy_id,
                status_id:status_id
            } , {
                headers:{
                    "access_token":localStorage.getItem("access_token")
                }
            } )

            // console.log( datas )
            setTimeout(()=>{
                setDailog(false)
            } , 3000 )
            setMessage( datas.data.message )
            setAlert(true)

        } catch (error) {
            // console.log(error)
            setMessage( error.response.data.message )
            setAlert(true)
        }
    }

    function SeachingResults(){
        if( Search == "" ){
            return Carts
        }else{
            return Carts.filter(d=>{
                return d.course.course_title.toLowerCase().match( Search )
            })
        }
    }

    useEffect(()=>{

        if( JsCookie.get("isAdmin") != "true" ){
            JsCookie.remove("isAdmin")
            JsCookie.remove("logined")
            localStorage.setItem("access_token" , "")
            localStorage.setItem("refresh_token" , "")
            navigate("/")
        }   

        FetchingCart()

    } , [ Dailog ] )
    
    return(
        <main >
            <Alertcomponent 
                alert={Alert}
                changeAlert={()=> setAlert(!Alert) }
                message={Message}
            />
            {
                Dailog?(
                    <main>
                        <div className="z-[11] opacity-[0.3] bg-black w-full h-screen fixed top-0 left-0" ></div>
                        <div id="defaultModal" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-[111] w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                            <div className="relative w-full z-[12] max-h-full">
                                <div className="relative bg-white m-auto  lg:w-3/12 sm:w-7/12 xl:w-4/12 rounded-lg shadow dark:bg-gray-700">
                                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            Status carts
                                        </h3>
                                        <button type="button" onClick={()=> setDailog(!Dailog) } className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                            <span className="sr-only">Close modal</span>
                                        </button>
                                    </div>
                                    <div className="p-6 space-y-6">
                                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                            Buy Id : { buy_id }
                                         </p>
                                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                            Status Id : { status_id }
                                        </p>
                                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                            Are'u sure!
                                        </p>
                                    </div>
                                    <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                        <button onClick={ UpdateStatus } data-modal-hide="defaultModal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Yes</button>
                                        <button onClick={()=> setDailog(false) } data-modal-hide="defaultModal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
                                    </div>
                                </div>
                        </div>
                        </div>
                    </main>
                ):""
            }
             <div>
                    <input type="text" onChange={e=> setSearch(e.target.value) } placeholder='Search items' />
            </div>
            {
                Loading?(
                    ""
                ):(
                        
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            No
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Buy ID
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Course ID
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Course Title
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Username
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Price
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Payment
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            TID
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Expired
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        SeachingResults().map((d , k)=>(
                                            <tr key={k} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    { k + 1 }
                                                </th>
                                                <td className="px-6 py-4">
                                                    { d.buy_course_id }
                                                </td>
                                                <td className="px-6 py-4">
                                                    { d.course.course_id }
                                                </td>
                                                <td className="px-6 py-4">
                                                    { d.course.course_title }
                                                </td>
                                                <td className="px-6 py-4">
                                                    { d.auth.auth_firstname } { d.auth.auth_lastname }
                                                </td>
                                                <td className="px-6 py-4">
                                                    ${ d.buy_price }
                                                </td>
                                                <td className="px-6 py-4">
                                                    { d.payment.payment_name }
                                                </td>
                                                <td className="px-6 py-4">
                                                    { d.payment_tid }
                                                </td>
                                                <td className="px-6 py-4">
                                                    { new Date() > new Date(d.expired_date) ? "true" : "false" }
                                                </td>
                                                <td className="px-6 py-4">
                                                    { d.status.status_name }
                                                </td>
                                                <td className="px-6 py-4">
                                                    <button onClick={()=> {
                                                        set_buy_id( d.buy_course_id )
                                                        set_status_id(2)
                                                        setDailog(true)
                                                    } } className='bg-green-600 text-white px-[10px] py-[5px] rounded ' >Accept</button>
                                                    <button onClick={()=> {
                                                        set_buy_id( d.buy_course_id )
                                                        set_status_id(1)
                                                        setDailog(true)
                                                    } } className='bg-red-600 text-white px-[10px] py-[5px] rounded ' >Padding</button>
                                                    <button onClick={()=> {
                                                        set_buy_id( d.buy_course_id )
                                                        set_status_id(3)
                                                        setDailog(true)
                                                    } } className='bg-blue-600 text-white px-[10px] py-[5px] rounded ' >Wrong TID</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <h1 className='text-center w-full' >No more</h1>
                        </div>

                )
            }
        </main>
    )
}
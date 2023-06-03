import fbicon from "../assets/icons/facebook-color-svgrepo-com.svg"
import githubicon from "../assets/icons/github-142-svgrepo-com.svg"
import googleicon from "../assets/icons/google-color-svgrepo-com.svg"
import formimg from "../assets/pictures/illustration.svg"
import AlertComponent from "../assets/components/Alert"
import { useEffect, useState } from "react"
import { validateEmail } from "../assets/components/components"
import { Link , useNavigate }  from "react-router-dom"
import { BackendLink } from "../assets/components/components"
import JsCookie from "js-cookie"
import axios from "axios"
import LoadingComponent from "../assets/components/Loading"


export default function SignUpPage(){

    let [ Alert , setAlert ] = useState(false)
    let [Message , setMessage] = useState(null)
    let [ Email , setEmail ] = useState(null)
    let [Password , setPassword] = useState(null)
    let [ConfirmPassword , setConfirmPassword] = useState(null)
    let [FirstName , setFirstName] = useState(null)
    let [LastName , setLastName] = useState(null)
    let [ UserName , setUserName] = useState(null)
    let [Profile , setProfile] = useState(null)
    let [ Loading , setLoading ] = useState(false)

    const navigate = useNavigate()
    
    function handleInputEmail(e){
        setEmail( e.target.value )
    }

    function handleInputPassword(e){
        setPassword( e.target.value )
    }

    function handleInputConFirmPassword(e){
        setConfirmPassword(e.target.value)
    }

    function handleInputUserName(e){
        setUserName( e.target.value )
    }

    function handleFirstName( e ){
        setFirstName(e.target.value)
    }

    function handleLastName( e ){
        setLastName(e.target.value)
    }
    
    function handleEnter(e){

        if( e.key == "Enter"){
            handleSubmit()
        }

    }

    async function handleSubmit(){
        if( 
            Password == "" || Password == null ||
            Email == "" || Email == null ||
            ConfirmPassword == "" || ConfirmPassword == null ||
            FirstName == "" || FirstName == null ||
            LastName == "" || LastName == null ||
            UserName == "" || UserName == null
         ){
            setAlert(true)
            setMessage("All fields are required!")
        }
        else if( UserName.length < 6 ){
            setAlert(true)
            setMessage("The username field must more than 6 character!")
        }
        else if( !validateEmail( Email ) ){
            setAlert(true)
            setMessage("Email should like? example@test.com")
        }
        else if( FirstName.length < 2 ) {
            setAlert(true)
            setMessage("The firstname field must more than 2 character!")
        }
        else if( LastName.length < 2 ){
            setAlert(true)
            setMessage("The lastname field must more than 2 character!")
        }
        else if( Password.length < 8 || ConfirmPassword.length < 8 ){
            setAlert(true)
            setMessage("The password and confirm password are more than 8 character!")
        }
        else if( Password != ConfirmPassword ){
            setAlert(true)
            setMessage("Password and Confirm Password must the same!")
        }
        else{
            try {
                setLoading(true)
                const response = await axios.post(BackendLink() + "/api/v1/auth/signupwithoutphoto" , {
                    username:UserName,
                    firstname:FirstName,
                    lastname:LastName,
                    password:Password,
                    email:Email
                } )
                setEmail("")
                setConfirmPassword("")
                setFirstName("")
                setLastName("")
                setPassword("")
                setProfile("")
                setUserName("")
                setAlert(true)
                setMessage( response.data.message )
            } catch (error) {
                setLoading(true)
                setAlert(true)
                setMessage( error.response.data.message )
            }
            finally{
                setLoading(false)
            }
        }
    }


   useEffect(()=>{
    if( JsCookie.get("logined") == "true" ){
        navigate("/")
     }
   } , [] )

    return(
        <>
            <main>
                <AlertComponent alert={ Alert } message={Message} changeAlert={ ()=> setAlert( false )  } />
                <div className="flex min-[0px]:flex-col-reverse md:flex-row w-10/12 mx-auto my-[50px] ">
                    
                    <div  className="min-[0px]:w-full md:w-6/12 mx-auto" >
                        <div className="drop-shadow-md bg-white rounded px-[20px] py-[30px] w-full min-[0px]:w-full " >
                            <h2 className="text-2xl font-bold mb-[5px]">Create Your Account</h2>
                            <p className="text-sm text-gray-400 " >Start your website in seconds. Already have an account? <Link className="text-blue-800 underline" to="/signin" >Sign In</Link></p>
                            
                            <form action="" className="my-[15px] mb-[15px] w-full " >

                                <div className="flex items-center min-[0px]:flex-col md:flex-row justify-between min-[0px]:20px md:gap-[30px] " >
                                    <div className="relative z-0 min-[0px]:w-full md:w-6/12 mb-6 group">
                                        <input onChange={handleFirstName} onKeyDown={ handleEnter } type="text" name="floating_firstname" id="floating_firstname" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={FirstName} placeholder=" " required />
                                        <label htmlFor="floating_firstname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"  >Firstname</label>
                                    </div>
                                    <div className="relative z-0 min-[0px]:w-full md:w-6/12 mb-6 group">
                                        <input onChange={handleLastName} onKeyDown={ handleEnter } type="text" name="floating_lastname" id="floating_lastname" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  value={LastName} required />
                                        <label htmlFor="floating_lastname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" >Lastname</label>
                                    </div>
                                </div>
                                {/*  */}

                                <div className="flex items-center min-[0px]:flex-col md:flex-row justify-between min-[0px]:20px md:gap-[30px] " >
                                    <div className="relative z-0 min-[0px]:w-full md:w-6/12 mb-6 group">
                                        <input onChange={ handleInputEmail  } onKeyDown={ handleEnter } type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={Email} required />
                                        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"  >Email address</label>
                                    </div>
                                    <div className="relative z-0 min-[0px]:w-full md:w-6/12 mb-6 group">
                                        <input onChange={handleInputUserName} onKeyDown={ handleEnter } type="text" name="floating_username" id="floating_username" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={UserName} required />
                                        <label htmlFor="floating_username" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"  >Username</label>
                                    </div>
                                </div>

                                {/*  */}
                                 <div className="flex items-center min-[0px]:flex-col md:flex-row justify-between min-[0px]:20px md:gap-[30px] " >
                                    <div className="relative z-0 min-[0px]:w-full md:w-6/12 mb-6 group">
                                        <input onChange={handleInputPassword} onKeyDown={ handleEnter } type="password" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={Password} required />
                                        <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"  >Password</label>
                                    </div>
                                    <div className="relative z-0 min-[0px]:w-full md:w-6/12 mb-6 group">
                                        <input onChange={handleInputConFirmPassword} onKeyDown={ handleEnter } type="password" name="floating_confirm_password" id="floating_confirm_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={ ConfirmPassword } required />
                                        <label htmlFor="floating_confirm_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"  >Comfirm Password</label>
                                    </div>
                                </div>

                                {/*  */}
                                <div className="min-[0px]:mb-[15px] md:mb-[20px]" >
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload profile <span className="text-gray-300 " >(optional)</span> </label>
                                    <input className="w-full" id="file_input" type="file" value={Profile} />
                                </div>
                                {/*  */}

                            </form>

                            <div className="relative mb-[20px] w-full p-2 m-auto " >
                                <span className="absolute left-[49%] text-gray-400 top-[-15px] bg-white">Or</span>
                                <hr />
                            </div>

                            <div className="flex flex-col gap-[10px] min-[0px]:mb-[20px] sm:mb-[40px]" >
                                <button className="border rounded-[15px] min-[0px]:p-1 sm:p-2 hover:bg-gray-100 hover:duration-300 transition " >
                                    <div className="flex items-center w-7/12 mx-auto min-[0px]:gap-[15px] sm:gap-[10px] justify-center " >
                                        <img className="sm:w-10 sm:h-10 min-[0px]:h-5 min-[0px]:w-5 md:w-7 md:h-7 rounded-full" src={googleicon} alt="" />
                                        <span className="md:text-[12px] lg:text-base min-[0px]:text-xs" >Register With Google&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    </div>
                                </button>
                                {/*  */}
                                <button className="border rounded-[15px] min-[0px]:p-1 sm:p-2 hover:bg-gray-100 hover:duration-300 transition" >
                                    <div className="flex items-center w-7/12 mx-auto min-[0px]:gap-[15px] sm:gap-[10px] justify-center" >
                                        <img className="sm:w-10 sm:h-10 min-[0px]:h-5 min-[0px]:w-5 md:w-7 md:h-7 rounded-full" src={fbicon} alt="" />
                                        <span className="md:text-[12px] lg:text-base min-[0px]:text-xs" >Register With Facebook</span>
                                    </div>
                                </button>
                                {/*  */}
                                <button className="border rounded-[15px] min-[0px]:p-1 sm:p-2 hover:bg-gray-100 hover:duration-300 transition" >
                                    <div className="flex items-center w-7/12 mx-auto min-[0px]:gap-[15px] sm:gap-[10px] justify-center" >
                                        <img className="sm:w-10 sm:h-10 min-[0px]:h-5 min-[0px]:w-5 md:w-7 md:h-7 rounded-full" src={githubicon} alt="" />
                                        <span className="md:text-[12px] lg:text-base min-[0px]:text-xs" >Register With GitHub&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    </div>
                                </button>
                                
                            </div>
                            <div>
                                {
                                    Loading?(
                                        <div className="text-center" >
                                            <LoadingComponent />
                                        </div>
                                    ):(
                                        <button onClick={ handleSubmit } className="w-full active:bg-yellow-300 min-[0px]:p-2 min-[0px]:text-sm sm:text-base sm:p-2 rounded-[15px] bg-blue-500 text-white mb-[20px] " >Sign Up to your account</button>
                                    )
                                }
                            </div>

                        </div>
                    </div>
                    <div className="min-[0px]:w-full md:w-6/12 min-[0px]:justify-center  md:justify-left " >
                        <div  >
                            <img src={formimg} alt="Form Picture for Sun Lyhuor website." />
                        </div>
                    </div>

                </div>
            </main>
        </>
    )
}
import { useEffect, useState } from "react"
import {faBurger , faXmark } from "@fortawesome/free-solid-svg-icons"
import { Link , useNavigate } from "react-router-dom"
// import Font
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import jsCookie from "js-cookie"

export default function HeaderComponent(){
    let [ Hamberger , setHamberger ] = useState(false)
    const navigation = useNavigate()
    let [ Logined , setLogined ] = useState( false )
    let [ AdminSubMenu , setAdminSubMenu ] = useState(false)

    useEffect(()=>{

        if( jsCookie.get( "logined" ) == 'true' ){
            setLogined(true)
        }else{
            localStorage.setItem( "access_token" , "" )
            localStorage.setItem( "refresh_token" , "" )
            setLogined(false)
        }

    })

    return(
        <>
            <header className="relative" >
                <section className="w-full text-center min-[0px]:mb-[15px] sm:mb-[20px]">
                    <Link to={"/"}><h1 className="text-center font-bold text-[25px] hover:underline inline cursor-pointer active:text-yellow-200" >Hour Class</h1></Link>
                </section>

                <div>
                    <div className="absolute top-[5px] z-[50] right-[20px]" >
                        <button className="z-[51]" onClick={()=> setHamberger(!Hamberger) } >
                            {
                                Hamberger?(
                                    <FontAwesomeIcon className="text-[25px]" icon={faXmark} />
                                    ):(
                                    <FontAwesomeIcon className="text-[25px]" icon={faBurger} />
                                )
                            }
                        </button>
                    </div>
                    <nav className={`z-10 absolute top-[50px] right-[20px] z-[40] bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 ${Hamberger ? "block":"hidden"} `}>
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                            <li><Link className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white `} to="/">Home</Link></li>
                            <li><Link className={ `block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ` } to="/about" >About</Link></li>
                            <li><Link className={ `block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ` } to="/courses" >Courses</Link></li>
                            <li><Link className={ `block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ` } to="/blogs" >Blogs</Link></li>
                            <li><Link className={ `block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ` } to="/plans" >Plans</Link></li>
                            {
                                jsCookie.get("isAdmin") == "true"?
                                (
                                    <li className="relative" >
                                        <button id="doubleDropdownButton" data-dropdown-toggle="doubleDropdown" onClick={()=> setAdminSubMenu( !AdminSubMenu ) } data-dropdown-placement="right-start" type="button" className={`flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white`} >Admin<svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg></button>
                                        <div id="doubleDropdown" className={`z-10 absolute min-[0px]:left-[-100px] sm:left-[-180px] bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 ${ AdminSubMenu ? "" : "hidden" } `}>
                                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="doubleDropdownButton">
                                                <li>
                                                    <Link to="/admin/course" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">Admin Courses</Link>
                                                    <Link to="/admin/cart" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">Admin Carts</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                ):
                                ("")
                            }
                            {
                                ( Logined )?(
                                    <>
                                        <li><Link className={ `block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ` } to="/carts" >Carts</Link></li>
                                        <li><Link className={ `block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ` } to="/profile" >Profile</Link></li>
                                    </>
                                ):(
                                    ""
                                )
                            }
                            
                            {
                                ( Logined )?(   
                                   <li> <Link className={ `block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white` } to={"signout"} >Log Out</Link> </li>
                                ):(
                                    <>
                                        <li><Link className={ `block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white `} to="/signup">Sign Up</Link></li>
                                        <li><Link className={ `block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ` } to="/signin">Sign In</Link></li>
                                    </>
                                )
                            }
                            
                        </ul>
                    </nav>
                </div>

            </header>
        </>
    ) 
}
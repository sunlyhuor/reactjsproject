import Link from "next/link"
import { useRouter } from "next/router"
import { getCookie , setCookie } from "cookies-next"

export default function SignInAndSignUpAndSignOut(){
    
    const router = useRouter()

    return(
        <>

        {  
            getCookie("logined")?(
                <>
                    
                    <li><Link  className={ `block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white` } href="/logout">Log Out</Link></li>
                </>
            ):(
                <>
                    <li><Link className={ `block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${(router.asPath == "/signup") ? "bg-gray-200 rounded" : "" }` } href="/signup">Sign Up</Link></li>
                    <li><Link className={ `block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${((router.asPath == "/signin") ? "bg-gray-200 rounded" : "" ) } ` } href="/signin">Sign In</Link></li>
                </>
            )
        }

        </>
    )
}
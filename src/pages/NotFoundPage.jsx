import NotFound from "../assets/pictures/404-computer.svg"
import { useState } from "react"
import { Link } from "react-router-dom"

export default function NotFoundPage(){

    let [ NotFoundText , setNotFoundText  ] = useState(404)

    return(
        <>
            <main>
                <section className="bg-white dark:bg-gray-900 mb-[50px]">
                    <section className="px-4 mx-auto max-w-screen-xl lg:px-6 text-center ">
                        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">{ NotFoundText }</h1>
                        <p className="mb-4 text-3xl tracking-tight font-bold text-blue-700 md:text-4xl dark:text-white">Something's missing.</p>
                    </section>
                    <section>
                        <div className="w-6/12 mx-auto my-0 flex justify-center " >
                            <img src={NotFound} alt="Not Found Page on sun lyhuor site" />
                        </div>
                    </section>
                    <section className="px-4 mx-auto max-w-screen-xl lg:px-6">
                        <div className="mx-auto max-w-screen-sm text-center">
                            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
                            <Link href="/" className="bg-blue-600 rounded px-[20px] py-[8px] text-white text-bold" >Back to Homepage</Link>
                        </div>   
                    </section>
                </section>

            </main>
        </>
    )
}
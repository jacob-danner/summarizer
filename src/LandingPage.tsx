import { Link } from "react-router-dom"

export const LandingPage: React.FC = () => {
    return(
        <div id="landing-page" className="bg-neutral-200 h-full flex flex-col justify-center items-center" >
            <h1 className="text-5xl font-bold mt-0 mb-6">A.I. Powered PDF Summarization</h1>
            <h3 className="text-3xl opacity-60 font-medium mb-8">Stop wasting time reading through long PDFs.</h3>
            <Link to="/upload"
                className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >Get Started</Link>
        </div>
    )
}
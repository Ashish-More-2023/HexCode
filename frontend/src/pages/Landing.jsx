import Introduction from "../components/Introduction"
import Prompt from "../components/Prompt"


const Landing = () => {
    return(
        <>
        <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-14 left-1.5 w-60 h-60 bg-indigo-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute bottom-1/3 right-1 w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            </div>
            <Introduction/>
            <Prompt/>
        </>
    )
}

export default Landing
import { SiRedragon } from "react-icons/si";


const Navbar = () => {

    const handlereport = (e) => {
        alert("Massage on My number - 8305520547")
    }


    return (
        <div className='lg:mx-4'>
            <nav className='pl-4 lg:rounded-xl py-5 sticky flex text-master bg-action justify-between flex-row h-16 items-center text-md font-bold  lg:text-xl gap-28 w-full'>
                <div><SiRedragon className="text-5xl w-14 h-12 text-white drop-shadow-2xl shadow-lg"/></div>
                <div>
                    <div className='cursor-pointer flex flex-col items-center justify-center text-sm'><button onClick={handlereport} className="ml-10">⁉️</button>
                        <p className="ml-28">Problem?</p>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
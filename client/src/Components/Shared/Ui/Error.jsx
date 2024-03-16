import { MdErrorOutline } from "react-icons/md";

const Error = () => {
    return (
        <div className="flex justify-center items-center min-h-80">
            <div className="space-y-2">
                <MdErrorOutline className="text-3xl md:text-4xl lg:text-6xl text-white text-center mx-auto" />
                <h1 className="text-base md:text-xl lg:text-2xl text-white text-center ">Something Wrong</h1>
                <p className="text-xs md:text-sm lg:text-base text-center text-gray-300">Check your internet connection & try again</p>
            </div>
        </div>
    );
};

export default Error;
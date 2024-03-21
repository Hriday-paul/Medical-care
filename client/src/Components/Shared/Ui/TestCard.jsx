import { Link } from "react-router-dom";


const TestCard = ({ test }) => {
    return (
        <div className="flex flex-row rounded-lg w-full">
            <img className="min-h-52 lg:min-h-72 w-1/2 " src={test?.photo} alt="test image" />
            <div className="px-3 md:px-3 py-4 md:py-8 bg-teal-500 space-y-3 md:space-y-5 flex flex-col ">
                <span >
                    <h3 className="text-white text-2xl lg:text-3xl font-serif font-sansline-clamp-1">{test?.name}</h3>
                </span>
                
                <p className="text-gray-200 text-sm lg:text-base line-clamp-5 flex-shrink">{test?.details}</p>

                <div className="flex justify-between">
                    <Link to={`/details/${test._id}`} className="text-white hover:text-teal-200 duration-100 text-base md:text-lg underline underline-offset-2 font-medium">Details</Link>
                    <p className="text-right text-white">{new Date(test?.testDate).getDate() + '-' + (new Date(test?.testDate).getMonth() + 1) + '-' + new Date(test?.testDate).getFullYear()}</p>
                </div>
            </div>
        </div>
    );
};

export default TestCard;
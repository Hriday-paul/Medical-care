import { CiViewList } from "react-icons/ci";
import Error from "../../../../Components/Shared/Ui/Error";

const Reservation = () => {
    return (
        <div>
            <div className="bg-[#262522] rounded-md p-2 mb-5 flex gap-x-3 items-center">
                <span className="p-2 bg-gradient-to-r from-[#14022b] to-[#1c043d] inline-block rounded-sm">
                    <CiViewList className="text-xl text-white "></CiViewList>
                </span>
                <h4 className="text-xl font-medium font-serif">Reservation</h4>
            </div>
            {/* <Loading /> */}
            <Error></Error>
        </div>
    );
};

export default Reservation;
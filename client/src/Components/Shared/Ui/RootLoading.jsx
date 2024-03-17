import { PulseLoader } from "react-spinners";


const RootLoading = () => {
    return (
        <div className="min-h-screen flex justify-center items-center bg-[#1B1A18]">
            <PulseLoader
                color="#ffffff"
                size={15}
                speedMultiplier={0.8}
            />
        </div>
    );
};

export default RootLoading;
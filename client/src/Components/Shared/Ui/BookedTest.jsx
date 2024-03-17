import { useContext } from "react";
import { useForm } from "react-hook-form";
import { authContext } from "../../../ContextHandler/Authonicate/Authonicate";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import toast, { Toaster } from "react-hot-toast";


const BookedTest = ({ testId , fetchData}) => {
    const { userInfo } = useContext(authContext);
    const axiosPublic = UseAxiosPublic();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const handleBook = (data) => {
        // console.log({ ...data, testId, email: userInfo.email });
        const loadingToastId = toast.loading('Test Booking pending...');
        axiosPublic.put('/addReservation', {
            testId,
            email: userInfo.email,
            ...data
        })
            .then(({ data }) => {
                console.log(data);
                if (data?.upsertedCount >= 1) {
                    toast.success('Test Booked Complete', { id: loadingToastId });
                    fetchData();
                }
                else {
                    toast.error("You already booked, don't try !", { id: loadingToastId })
                }
                reset();
            })
            .catch(() => {
                toast.error("Something wents wrong, try again !", { id: loadingToastId })
            })
    }


    return (
        <div className="p-5">
            <form onSubmit={handleSubmit(handleBook)} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-400">Patient name <span className="text-red-500">*</span></label>
                    <input id="name" type="text" placeholder="name..." className={`w-full py-2 px-3 rounded-lg bg-gray-800 text-gray-300 border outline-0 ${errors.name ? 'border border-red-500' : 'border border-gray-600 focus:border-blue-500'}`} {...register("name", { required: true })} />
                    {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
                </div>
                <div>
                    <label htmlFor="age" className="block mb-1 text-sm font-medium text-gray-400">patient Age <span className="text-red-500">*</span></label>
                    <input id="age" type="number" placeholder="age..." className={`w-full py-2 px-3 rounded-lg bg-gray-800 text-gray-300 border outline-0 ${errors.email ? ' border-red-500' : ' border-gray-600 focus:border-blue-500'}`}  {...register("age", { required: true })} />
                    {errors.age && <p className="text-red-500 text-sm">Age is required</p>}
                </div>

                <div>
                    <label htmlFor="phone" className="block mb-1 text-sm font-medium text-gray-400">Contact number  <span className="text-red-500">*</span></label>
                    <input id="phone" type="number" placeholder="phone..." className={`w-full py-2 px-3 rounded-lg bg-gray-800 text-gray-300 border outline-0 ${errors.email ? ' border-red-500' : ' border-gray-600 focus:border-blue-500'}`}  {...register("phone", { required: true })} />
                    {errors.phone && <p className="text-red-500 text-sm">Phone is required</p>}
                </div>

                <div>
                    <label htmlFor="blood" className="block mb-1 text-sm font-medium text-gray-400">Blood  <span className="text-red-500">*</span></label>

                    <select name="blood" id="blood" className={`w-full py-2 px-3 rounded-lg bg-gray-800 text-gray-300 border outline-0 ${errors.email ? ' border-red-500' : ' border-gray-600 focus:border-blue-500'}`} {...register("blood", { required: true })}>

                        <option value="null">{"Don't Know"}</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                    </select>
                    {errors.blood && <p className="text-red-500 text-sm">Blood is required</p>}
                </div>


                <div className="col-span-1 md:col-span-2 my-2">
                    <button type="submit" className="btn btn-info w-full bg-blue-500 text-white hover:bg-blue-600">
                        Book Now

                    </button>
                </div>
            </form>
            <Toaster />

        </div>
    );
};

export default BookedTest;
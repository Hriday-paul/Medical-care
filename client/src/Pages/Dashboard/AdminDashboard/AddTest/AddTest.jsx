import toast, { Toaster } from "react-hot-toast";
import UseAxiosPublic from "../../../../Hooks/UseAxiosPublic";
import { useForm } from "react-hook-form";
import UploadFile from "../../../../Hooks/UploadFile";

const AddTest = () => {
    const axiosPublic = UseAxiosPublic();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const handleAddTest = (testData)=>{
        const loadingToastId = toast.loading('Test added pending...');
        UploadFile(testData.photo[0])
        .then((response) => response.json())
            .then((data) => {
                const photo = data.secure_url;
                axiosPublic.post('/addTest', {...testData, price : parseInt(testData?.price), slot : parseInt(testData?.slot), photo, testDate : new Date(testData.testDate).getTime()})
                .then(()=>{
                    toast.success('Test added successfully', {id : loadingToastId});
                    reset();
                })
                .catch(()=>{
                    toast.error('Something wents wrong, try again !', {id : loadingToastId})
                })
            })
            .catch(()=>{
                toast.error('Photo upload failed, try again !', {id : loadingToastId})
            })
    }

    return (
        <div className="py-10">

            <div className="max-w-2xl shadow-xl bg-[#1B1A18] rounded-md mx-auto p-10">
                <form className="space-y-5" onSubmit={handleSubmit(handleAddTest)}>
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Test Name<span className="text-red-500">*</span></label>

                        <input id='name' name="name" type="text" className={`rounded-md px-2 outline-none py-1 bg-[#302E2B] dark:text-white shadow-inner h-10 w-full text-sm ${errors.name ? 'border border-red-500' : 'border-0'}`} {...register("name", { required: true })}/>
                        {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
                    </div>
                    <div>
                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price<span className="text-red-500">*</span></label>

                        <input id='price' name="price" type="number" className={`rounded-md px-2 outline-none py-1 bg-[#302E2B] dark:text-white shadow-inner h-10 w-full text-sm ${errors.price ? 'border border-red-500' : 'border-0'}`} {...register("price", { required: true })}/>
                        {errors.price && <p className="text-red-500 text-sm">Price is required</p>}
                    </div>
                    <div>
                        <label htmlFor="slot" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total Slot<span className="text-red-500">*</span></label>

                        <input id='slot' name="slot" type="number" className={`rounded-md px-2 outline-none py-1 bg-[#302E2B] dark:text-white shadow-inner h-10 w-full text-sm ${errors.slot ? 'border border-red-500' : 'border-0'}`} {...register("slot", { required: true })}/>
                        {errors.slot && <p className="text-red-500 text-sm">Slot is required</p>}
                    </div>
                    <div>
                        <label htmlFor="testDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Test Date<span className="text-red-500">*</span></label>
                        <input type="date" name="testDate" id="testDate" className={`bg-[#302E2B] p-2 rounded-md w-full ${errors.testDate ? 'border border-red-500' : 'border-0'}`} {...register("testDate", { required: true })}/>
                        {errors.testDate && <p className="text-red-500 text-sm">Date is required</p>}
                    </div>

                    <div>
                        <label htmlFor="testDetails" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Test Details<span className="text-red-500">*</span></label>

                        <textarea id='testDetails' name="testDetails" rows={5} type="text" className={`rounded-md px-2 outline-none py-1 bg-[#302E2B] dark:text-white shadow-inner w-full text-sm ${errors.details ? 'border border-red-500' : 'border-0'}`}  {...register("details", { required: true })}/>
                        {errors.details && <p className="text-red-500 text-sm">Details is required</p>}
                    </div>

                    <div>
                        <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image<span className="text-red-500">*</span></label>

                        <input type="file" id="image" name="image" className={`file-input file-input-bordered bg-[#302E2B] dark:text-white w-full ${errors.photo ? 'border border-red-500' : 'border-0'}`} {...register("photo", { required: true })}/>
                        {errors.photo && <p className="text-red-500 text-sm">Photo is required</p>}
                    </div>
                    <div className="col-span-1 md:col-span-2 my-2">
                        <button type="submit" className="btn w-full bg-[#1C043C] text-white hover:bg-[#1C043C]">
                            Add test
                        </button>
                    </div>
                </form>
            </div>
            <Toaster />
        </div>
    );
};

export default AddTest;
import { Button, Drawer, Tooltip } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import { CiEdit } from "react-icons/ci";


const TestUpdateDrawer = ({ test }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    const handleUpdateTest = (data)=>{
        console.log(data);
    };

    return (
        <div>
            <Tooltip title={`Edit test`}>
                <Button
                    style={{ backgroundColor: '#515150', boxShadow: 0, color: '#F4F4F4', border: 0 }}
                    type="primary"
                    icon={<CiEdit />}
                    onClick={showDrawer}
                >
                </Button>
            </Tooltip>
            <Drawer style={{ backgroundColor: '#1A1917', color: 'white' }} width={600} title="Update Test" onClose={onClose} open={open}>

                <div>
                    <div className="max-w-2xl rounded-md mx-auto px-10">
                        <form className="space-y-5" onSubmit={handleSubmit(handleUpdateTest)}>
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Test Name<span className="text-red-500">*</span></label>

                                <input id='name' name="name" type="text" className={`rounded-md px-2 outline-none py-1 bg-[#302E2B] dark:text-white shadow-inner h-10 w-full text-sm ${errors.name ? 'border border-red-500' : 'border-0'}`} {...register("name", { required: true })} defaultValue={test?.name}/>
                                {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
                            </div>
                            <div>
                                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price<span className="text-red-500">*</span></label>

                                <input id='price' name="price" type="number" className={`rounded-md px-2 outline-none py-1 bg-[#302E2B] dark:text-white shadow-inner h-10 w-full text-sm ${errors.price ? 'border border-red-500' : 'border-0'}`} {...register("price", { required: true })} defaultValue={test?.price}/>
                                {errors.price && <p className="text-red-500 text-sm">Price is required</p>}
                            </div>
                            <div>
                                <label htmlFor="slot" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total Slot<span className="text-red-500">*</span></label>

                                <input id='slot' name="slot" type="number" className={`rounded-md px-2 outline-none py-1 bg-[#302E2B] dark:text-white shadow-inner h-10 w-full text-sm ${errors.slot ? 'border border-red-500' : 'border-0'}`} {...register("slot", { required: true })} defaultValue={test?.slot}/>
                                {errors.slot && <p className="text-red-500 text-sm">Slot is required</p>}
                            </div>
                            <div>
                                <label htmlFor="testDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Test Date<span className="text-red-500">*</span></label>
                                <input type="date" name="testDate" id="testDate" className={`bg-[#302E2B] p-2 rounded-md w-full ${errors.testDate ? 'border border-red-500' : 'border-0'}`} {...register("testDate", { required: true })} 
                                defaultValue={(new Date(test?.testDate).toISOString().split('T')[0])}
                                />
                                {errors.testDate && <p className="text-red-500 text-sm">Date is required</p>}
                            </div>


                            <div>
                                <label htmlFor="testDetails" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Test Details<span className="text-red-500">*</span></label>

                                <textarea id='testDetails' name="testDetails" rows={5} type="text" className={`rounded-md px-2 outline-none py-2 bg-[#302E2B] dark:text-white shadow-inner w-full text-sm ${errors.details ? 'border border-red-500' : 'border-0'}`}  {...register("details", { required: true })} defaultValue={test?.details}/>
                                {errors.details && <p className="text-red-500 text-sm">Details is required</p>}
                            </div>

                            <div>
                                <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image<span className="text-red-500">*</span></label>

                                <input type="file" id="image" name="image" className={`file-input file-input-bordered bg-[#302E2B] dark:text-white w-full`} {...register("photo")} />
                                
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
            </Drawer>
        </div>

    );
};

export default TestUpdateDrawer;
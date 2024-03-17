import { Button, Modal, Tooltip } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import UploadFile from "../../../Hooks/UploadFile";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";


const ChangeStatus = ({ patientId, status, fetchData }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const axiosPublic = UseAxiosPublic();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const changeStus_AddResult = (updatedData) => {
        const loadingToastId = toast.loading('Reservation update pending...');

        UploadFile(updatedData.reportFile[0])
            .then((response) => response.json())
            .then((data) => {
                const fileUrl = data.secure_url;
                axiosPublic.put('/updateReservation', {
                    report: updatedData?.report,
                    reportFile: fileUrl,
                    patientId
                })
                    .then(() => {
                        toast.success('Reservation update successfully', { id: loadingToastId });
                        reset();
                        fetchData(updatedData.report);
                    })
                    .catch(() => {
                        toast.error('Something wents wrong, try again !', { id: loadingToastId })
                    })
            })
            .catch(() => {
                toast.error('File upload failed, try again !', { id: loadingToastId })
            })
    }

    return (
        <div>
            <Tooltip title={`Change status & add result`}>
                <Button onClick={() => setIsModalOpen(true)}
                    style={{ backgroundColor: '#515150', boxShadow: 0, color: '#F4F4F4', border: 0 }}
                    type="primary"
                    icon={<CiEdit />}
                >
                </Button>
            </Tooltip>

            <Modal
                title="Add New Book"
                style={{ backgroundColor: '#111827' }}
                open={isModalOpen}
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
                okButtonProps={{ style: { display: 'none' } }}
                centered>

                <form onSubmit={handleSubmit(changeStus_AddResult)} >
                    <div>
                        <label htmlFor="report" className="block mb-1 text-sm font-medium text-gray-400">Status<span className="text-red-500">*</span></label>

                        <select defaultValue={status} name="report" id="report" className={`w-full py-2 px-3 rounded-lg bg-gray-800 text-gray-300 border outline-0 ${errors.email ? ' border-red-500' : ' border-gray-600 focus:border-blue-500'}`} {...register("report", { required: true })}>
                            <option value="pending">Pending</option>
                            <option value="complete">Complete</option>
                            <option value="cencel">Cencel</option>
                        </select>
                        {errors.blood && <p className="text-red-500 text-sm">Status is required</p>}
                    </div>



                    <div className="my-4">
                        <label htmlFor="report" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Report File<span className="text-red-500">*</span></label>

                        <input type="file" id="report" name="report" className={`file-input file-input-bordered bg-[#302E2B] dark:text-white w-full ${errors.photo ? 'border border-red-500' : 'border-0'}`} {...register("reportFile", { required: true })} />
                        {errors.reportFile && <p className="text-red-500 text-sm">Report file is required</p>}
                    </div>

                    <button type="submit" className="btn btn-info btn-sm w-full bg-blue-500 text-white hover:bg-blue-600">
                        Update Now
                    </button>

                </form>

            </Modal>
            <Toaster />
        </div>
    );
};

export default ChangeStatus;
// onClick={() => setOpen(true)}
import { FiUsers } from "react-icons/fi";
import { MdOutlineFiberSmartRecord, MdProductionQuantityLimits } from "react-icons/md";
import CountUp from 'react-countup';
import UseAxiosPublic from "../../../../Hooks/UseAxiosPublic";
import { useEffect, useReducer } from "react";

const initialState = {
    result: {},
    loading: true,
    error: ''
}
const reducer = (currentState, action) => {
    switch (action.type) {
        case 'success':
            return {
                result: action.data,
                loading: false,
                error: ''
            }
        case 'error':
            return {
                result: {},
                loading: false,
                error: 'Error found'
            }
        default: return currentState
    }
}


const AdminHome = () => {
    const axiosPublic = UseAxiosPublic();
    const [fetchingState, dispatch] = useReducer(reducer, initialState);

    const fetchdata = () => {
        axiosPublic.get(`/adminDash`)
            .then(({ data }) => {
                dispatch({ type: 'success', data })
            })
            .catch(() => {
                dispatch({ type: 'error' })
            })
    }

    useEffect(() => {
        fetchdata();
    }, [])

    return (
        <div className="p-4 md:pt-16 pt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-x-0 md:gap-x-4 gap-y-8 lg:gap-y-14">
               

                <div className="bg-[#1A1917] p-5 lg:p-7 flex flex-row justify-between items-center shadow-xl w-full rounded-xl h-28 lg:h-36 border-b-4 border-teal-500">
                    <div className='bg-teal-500 p-5 lg:p-8 rounded-md -mt-20 lg:-mt-24 shadow-2xl'>
                        <FiUsers className='text-4xl lg:text-5xl text-white'></FiUsers>
                    </div>
                    <div>
                        <h3 className='text-lg text-slate-200 font-medium'>Total Users</h3>
                        <div className='flex flex-row gap-x-2 items-center'>
                            <FiUsers className='text-lg'></FiUsers>
                            <h4 className='text-2xl font-bold'>
                                <CountUp delay={1} duration={6} end={fetchingState?.result?.totalUsers || 10} enableScrollSpy={true} scrollSpyOnce={true} />

                            </h4>
                        </div>
                    </div>
                </div>

                <div className="bg-[#1A1917] p-5 lg:p-7 flex flex-row justify-between items-center shadow-xl w-full rounded-xl h-28 lg:h-36 border-b-4 border-sky-500">
                    <div className='bg-sky-500 p-5 lg:p-8 rounded-md -mt-20 lg:-mt-24 shadow-2xl'>
                        <MdOutlineFiberSmartRecord className='text-4xl lg:text-5xl text-white'></MdOutlineFiberSmartRecord>
                    </div>
                    <div>
                        <h3 className='text-lg text-slate-200 font-medium'>Total test</h3>
                        <div className='flex flex-row gap-x-2 items-center'>
                            <MdOutlineFiberSmartRecord className='text-lg'></MdOutlineFiberSmartRecord>
                            <div className='flex flex-row gap-x-2 items-center'>
                                <h4 className='text-2xl font-bold'>
                                    {
                                        <CountUp delay={1} duration={6} end={fetchingState?.result?.totalTest || 5} enableScrollSpy={true} scrollSpyOnce={true} />
                                    }
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#1A1917] p-5 md:p-7 flex flex-row justify-between items-center shadow-xl w-full rounded-xl h-28 lg:h-36 border-b-4 border-indigo-800">
                    <div className='bg-indigo-800 p-5 lg:p-8 rounded-md -mt-20 lg:-mt-24 shadow-2xl'>
                        <MdProductionQuantityLimits className='text-4xl lg:text-5xl text-white'></MdProductionQuantityLimits>
                    </div>
                    <div>
                        <h3 className='text-lg text-slate-200 font-medium'>Total Booked</h3>
                        <div className='flex flex-row gap-x-2 items-center'>
                            <h4 className='text-2xl font-bold'>
                                {
                                    <CountUp delay={1} duration={6} end={fetchingState?.result?.totalAppoinments || 10} enableScrollSpy={true} scrollSpyOnce={true} />
                                }
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className={`bg-white p-4 shadow-2xl my-5 lg:my-8 rounded-2xl mx-auto`}>
                <DataChart></DataChart>
            </div> */}
        </div>
    );
};

export default AdminHome;
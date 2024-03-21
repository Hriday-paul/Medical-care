import { FiUsers } from "react-icons/fi";
import { MdOutlineFiberSmartRecord, MdProductionQuantityLimits } from "react-icons/md";
import CountUp from 'react-countup';
import UseAxiosPublic from "../../../../Hooks/UseAxiosPublic";
import { useCallback, useEffect, useReducer } from "react";
import AdminChart from "../../../../Components/Shared/Ui/AdminChart";
import Loading from '../../../../Components/Shared/Ui/Loading'
import Error from '../../../../Components/Shared/Ui/Error'
import { CiViewList } from "react-icons/ci";

const initialState = {
    result: {},
    chartDate: [],
    chartResult: [],
    loading: true,
    error: ''
}
const reducer = (currentState, action) => {
    switch (action.type) {
        case 'success': {
            const cDateList = Object.keys(action?.data?.chart);
            const cResultList = Object.values(action?.data?.chart);
            return {
                result: action.data,
                chartDate: cDateList,
                chartResult: cResultList,
                loading: false,
                error: ''
            }
        }
        case 'error':
            return {
                result: {},
                chartDate: [],
                chartResult: [],
                loading: false,
                error: 'Error found'
            }
        default: return currentState
    }
}


const AdminHome = () => {
    const axiosPublic = UseAxiosPublic();
    const [fetchingState, dispatch] = useReducer(reducer, initialState);

    const fetchdata = useCallback((prevdays) => {
        axiosPublic.get(`/adminDash/${prevdays}`)
            .then(({ data }) => {
                dispatch({ type: 'success', data })
            })
            .catch(() => {
                dispatch({ type: 'error' })
            })
    }, []);
    
    useEffect(() => {
        fetchdata(7);
    }, [])

    const changePrevDays = (e) => {
        fetchdata(e.target.value);
        //console.log(e.target.value);
    }

    return (
        <div>
            {
                fetchingState?.loading ? <Loading /> : fetchingState.error ? <Error /> :
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
                                            <CountUp delay={1} duration={6} end={fetchingState?.result?.totalUsers || 0} enableScrollSpy={true} scrollSpyOnce={true} />

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
                                                    <CountUp delay={1} duration={6} end={fetchingState?.result?.totalTest || 0} enableScrollSpy={true} scrollSpyOnce={true} />
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
                                                <CountUp delay={1} duration={6} end={fetchingState?.result?.totalAppoinments || 0} enableScrollSpy={true} scrollSpyOnce={true} />
                                            }
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            (fetchingState?.chartDate.length > 0 && fetchingState?.chartResult.length > 0) && <div>
                                <div className="bg-[#262522] rounded-md p-2 mt-7 flex gap-x-3 items-center justify-between">
                                    <div className="flex flex-row gap-x-3 items-center">
                                        <span className="p-2 bg-gradient-to-r from-[#14022b] to-[#1c043d] inline-block rounded-sm">
                                            <CiViewList className="text-xl text-white "></CiViewList>
                                        </span>
                                        <h4 className="text-xl font-medium font-serif">Resurvation History of previous some days.</h4>
                                    </div>
                                    <div className="text-right my-3">
                                        <select onChange={changePrevDays} className="px-3 py-1 rounded-md text-white outline-0 ">
                                            <option value="7">7 Days</option>
                                            <option value="10">10 days</option>
                                            <option value="20">20 days</option>
                                            <option value="30">30 Days</option>
                                        </select>
                                    </div>
                                </div>


                                <div className={`bg-[#262522] p-4 shadow-2xl my-3 lg:my-5 rounded-2xl mx-auto`}>
                                    <AdminChart chartDates={fetchingState?.chartDate} chartResults={fetchingState?.chartResult} />
                                </div>
                            </div>
                        }
                    </div>
            }
        </div>
    );
};

export default AdminHome;
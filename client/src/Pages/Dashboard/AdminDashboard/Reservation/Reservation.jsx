import { CiViewList } from "react-icons/ci";
import Error from "../../../../Components/Shared/Ui/Error";
import { useCallback, useEffect, useReducer } from "react";
import UseAxiosPublic from "../../../../Hooks/UseAxiosPublic";
import Loading from "../../../../Components/Shared/Ui/Loading";
import { LoadingOutlined } from '@ant-design/icons';
import { TiTick } from "react-icons/ti";
import { FcCancel } from "react-icons/fc";
import ChangeStatus from "../../../../Components/Shared/Ui/ChangeStatus";
import NotFound from "../../../../Components/Shared/Ui/NotFound";
import { Spin } from "antd";

const initialState = {
    reservations: [],
    loading: true,
    error: ''
}
const reducer = (currentState, action) => {
    switch (action.type) {
        case 'success':
            return {
                reservations: action.data,
                loading: false,
                error: ''
            }
        case 'error':
            return {
                reservations: [],
                loading: false,
                error: 'Error found'
            }
        default: return currentState
    }
}
const Reservation = () => {
    const axiosPublic = UseAxiosPublic();
    const [fetchingState, dispatch] = useReducer(reducer, initialState);

    const fetchData = useCallback((type) => {
        axiosPublic.get(`/reservation?type=${type}`)
            .then(({ data }) => {
                dispatch({ type: 'success', data })
            })
            .catch(() => {
                dispatch({ type: 'error' })
            })
    }, [])

    useEffect(() => {
        fetchData('all');
    }, [])

    const changeResurvType = (e) => {
        fetchData(e.target.value);
    }

    return (
        <div>
            <div className="bg-[#262522] rounded-md p-2 mb-5 flex gap-x-3 items-center">
                <span className="p-2 bg-gradient-to-r from-[#14022b] to-[#1c043d] inline-block rounded-sm">
                    <CiViewList className="text-xl text-white "></CiViewList>
                </span>
                <h4 className="text-xl font-medium font-serif">Reservation</h4>
            </div>

            {

            }

            {
                fetchingState.loading ? <Loading /> : fetchingState.error ? <Error /> :
                    <div>
                        <div className="text-right my-3">
                            <select onChange={changeResurvType} className="px-3 py-1 rounded-md text-white outline-0 ">
                                <option value="all">All</option>
                                <option value="pending">Pending</option>
                                <option value="complete">Complete</option>
                                <option value="cencel">Cencel</option>
                            </select>
                        </div>
                        {fetchingState.reservations?.length <= 0 ? <NotFound /> :
                            <div>
                                <div className="overflow-x-auto bg-[#262522]">
                                    <table className="table">
                                        {/* head */}
                                        <thead>
                                            <tr className="border-[#494846]">
                                                <th>Name</th>
                                                <th>Phone</th>
                                                <th>Test Name</th>
                                                <th>Price</th>
                                                <th>Date</th>
                                                <th>Age</th>
                                                <th>Blood</th>
                                                <th>Status</th>
                                                <th>Change Status</th>
                                                {/* <th>Delete</th> */}

                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                fetchingState.reservations?.map((reservation) => {
                                                    return <tr key={reservation?._id} className="border-[#494846]">

                                                        <td>
                                                            {reservation?.name}
                                                        </td>
                                                        <td>
                                                            {reservation?.phone}
                                                        </td>
                                                        <td>
                                                            {reservation?.testDetails[0].name}
                                                        </td>
                                                        <td>
                                                            {reservation?.testDetails[0]?.price}
                                                        </td>
                                                        <td>

                                                            {new Date(reservation?.testDetails[0]?.testDate).getDate() + '-' + (new Date(reservation?.testDetails[0]?.testDate).getMonth() + 1) + '-' + new Date(reservation?.testDetails[0]?.testDate).getFullYear()}
                                                        </td>
                                                        <td>
                                                            {reservation?.age}
                                                        </td>
                                                        <td>
                                                            {reservation?.blood}
                                                        </td>
                                                        <td>
                                                            {reservation.report === 'pending' && <div className="mx-auto">
                                                                <Spin indicator={
                                                                    <LoadingOutlined style={{ color: '#4096FF', fontSize: 14, }} spin />} />
                                                            </div>}


                                                            {reservation.report === 'complete' && <TiTick className="text-green-500 text-lg" />}

                                                            {reservation.report === 'cencel' && <FcCancel className="text-base " />}
                                                        </td>

                                                        <td>
                                                            <ChangeStatus patientId={reservation?._id} status={reservation?.report} fetchData={fetchData}></ChangeStatus>
                                                        </td>
                                                        {/* <td>
                                                    <Tooltip title={`delete`}>
                                                        <Button
                                                            style={{ backgroundColor: '#515150', boxShadow: 0, color: 'white', border: 0 }}
                                                            type="primary"
                                                            icon={<MdOutlineDelete />}

                                                        >
                                                        </Button>
                                                    </Tooltip>
                                                </td> */}
                                                    </tr>
                                                })
                                            }


                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        }
                    </div>
            }
        </div >
    );
};

export default Reservation;
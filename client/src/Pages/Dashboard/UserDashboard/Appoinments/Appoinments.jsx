import { useCallback, useContext, useEffect, useReducer } from "react"
import UseAxiosPublic from "../../../../Hooks/UseAxiosPublic"
import { authContext } from "../../../../ContextHandler/Authonicate/Authonicate"
import { Button, Spin, Tooltip } from "antd"
import { TiTick } from "react-icons/ti"
import { FcCancel } from "react-icons/fc"
import { LoadingOutlined } from '@ant-design/icons';
import { CiViewList } from "react-icons/ci"
import Loading from "../../../../Components/Shared/Ui/Loading"
import Error from "../../../../Components/Shared/Ui/Error"
import { MdOutlineDelete } from "react-icons/md"
import { Link } from "react-router-dom"
import toast, { Toaster } from "react-hot-toast"
import NotFound from "../../../../Components/Shared/Ui/NotFound"

const initialState = {
    appoinments: [],
    loading: true,
    error: ''
}
const reducer = (currentState, action) => {
    switch (action.type) {
        case 'success':
            return {
                appoinments: action.data,
                loading: false,
                error: ''
            }
        case 'error':
            return {
                appoinments: [],
                loading: false,
                error: 'Error found'
            }
        default: return currentState
    }
}


const Appoinments = () => {
    const axiosPublic = UseAxiosPublic();
    const { userInfo } = useContext(authContext);
    const [fetchingState, dispatch] = useReducer(reducer, initialState);

    const fetchData = useCallback((type) => {
        axiosPublic.get(`/appoinments/${userInfo.email}?type=${type}`)
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

    const deleteAppoinment = (id) => {
        const loadingToastId = toast.loading('Appoinment delete pending...')
        axiosPublic.delete(`/delAppoinment/${id}`)
            .then(() => {
                toast.success('Appoinment Delete Successfully', { id: loadingToastId });
                fetchData('all')
            })
            .catch(() => {
                toast.error('Something wents wrong, try again !', { id: loadingToastId })
            })
    }

    return (
        <div>
            <div className="bg-[#262522] rounded-md p-2 mb-5 flex gap-x-3 items-center">
                <span className="p-2 bg-gradient-to-r from-[#14022b] to-[#1c043d] inline-block rounded-sm">
                    <CiViewList className="text-xl text-white "></CiViewList>
                </span>
                <h4 className="text-xl font-medium font-serif">My Appoinments</h4>
            </div>

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
                        {
                            fetchingState?.appoinments.length <= 0 ? <NotFound /> :
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
                                                    <th>Details</th>
                                                    <th>Status</th>
                                                    <th>Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    fetchingState.appoinments?.map((appoinment) => {
                                                        return <tr key={appoinment?._id} className="border-[#494846]">

                                                            <td>
                                                                {appoinment?.name}
                                                            </td>
                                                            <td>
                                                                {appoinment?.phone}
                                                            </td>
                                                            <td>
                                                                {appoinment?.testDetails[0]?.name}
                                                            </td>
                                                            <td>
                                                                {appoinment?.testDetails[0]?.price}
                                                            </td>
                                                            <td>

                                                                {new Date(appoinment?.testDetails[0]?.testDate).getDate() + '-' + (new Date(appoinment?.testDetails[0]?.testDate).getMonth() + 1) + '-' + new Date(appoinment?.testDetails[0]?.testDate).getFullYear()}
                                                            </td>
                                                            <td>
                                                                {appoinment?.age}
                                                            </td>

                                                            <td>
                                                                {appoinment?.blood}
                                                            </td>
                                                            <td>
                                                                <Link className="text-sky-600" to={`/details/${appoinment?.testId}`}>See test details</Link>
                                                            </td>
                                                            <td>
                                                                {appoinment.report === 'pending' && <div className="mx-auto">
                                                                    <Spin indicator={
                                                                        <LoadingOutlined style={{ color: '#4096FF', fontSize: 14, }} spin />} />
                                                                </div>}


                                                                {appoinment.report === 'complete' && <TiTick className="text-green-500 text-lg" />}

                                                                {appoinment.report === 'cencel' && <FcCancel className="text-base " />}
                                                            </td>


                                                            <td>
                                                                <Tooltip title={`delete`}>
                                                                    <Button
                                                                        style={{ backgroundColor: '#515150', boxShadow: 0, color: 'white', border: 0 }}
                                                                        type="primary"
                                                                        icon={<MdOutlineDelete />}
                                                                        onClick={() => deleteAppoinment(appoinment._id)}
                                                                    >
                                                                    </Button>
                                                                </Tooltip>
                                                            </td>
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
            <Toaster />
        </div>
    );
};

export default Appoinments;
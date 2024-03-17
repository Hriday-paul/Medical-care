import { useCallback, useContext, useEffect, useReducer } from "react"
import { authContext } from "../../../../ContextHandler/Authonicate/Authonicate"
import UseAxiosPublic from "../../../../Hooks/UseAxiosPublic"
import { Toaster } from "react-hot-toast"
import Loading from "../../../../Components/Shared/Ui/Loading"
import Error from "../../../../Components/Shared/Ui/Error"
import { CiViewList } from "react-icons/ci"
import DownloadFile from "../../../../Components/Shared/Ui/DownloadFile"

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

const TestResult = () => {
    const axiosPublic = UseAxiosPublic();
    const { userInfo } = useContext(authContext);
    const [fetchingState, dispatch] = useReducer(reducer, initialState);

    const fetchData = useCallback(() => {
        axiosPublic.get(`/appoinments/${userInfo.email}?type=complete`)
            .then(({ data }) => {
                dispatch({ type: 'success', data })
            })
            .catch(() => {
                dispatch({ type: 'error' })
            })
    }, [])

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <div className="bg-[#262522] rounded-md p-2 mb-5 flex gap-x-3 items-center">
                <span className="p-2 bg-gradient-to-r from-[#14022b] to-[#1c043d] inline-block rounded-sm">
                    <CiViewList className="text-xl text-white "></CiViewList>
                </span>
                <h4 className="text-xl font-medium font-serif">Test Result</h4>
            </div>

            {
                fetchingState.loading ? <Loading /> : fetchingState.error ? <Error /> :
                    <div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-5 gap-y-5">
                            {
                                fetchingState.appoinments?.map((appoinment) => {
                                    return <div key={appoinment._id} className="rounded-md">
                                        <div>
                                            <img className="rounded-t-md" src={appoinment?.testDetails[0]?.photo} alt="photo" />
                                        </div>
                                        <div className="p-5 bg-[#346E6E] rounded-b-md space-y-1">

                                            <h2 className="text-white text-2xl font-sans font-bold">{appoinment?.testDetails[0]?.name}</h2>
                                            <div className="flex justify-between items-center">
                                                <h2 className="text-gray-100 text-xl">{appoinment?.name}</h2>
                                                <DownloadFile url={appoinment?.reportFile}></DownloadFile>

                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
            }
            <Toaster />
        </div>
    );
};

export default TestResult;
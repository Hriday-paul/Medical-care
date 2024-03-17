import { useCallback, useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import PageTopUi from "../../Components/Shared/PageTopUi/PageTopUi";
import Loading from "../../Components/Shared/Ui/Loading";
import Error from "../../Components/Shared/Ui/Error";
import { authContext } from "../../ContextHandler/Authonicate/Authonicate";
import { Modal } from "antd";
import BookedTest from "../../Components/Shared/Ui/BookedTest";

const initialState = {
    loading: true,
    test: {},
    error: ''
}

const reducer = (currentState, action) => {
    switch (action.type) {
        case 'success':
            return {
                loading: false,
                test: action?.data,
                error: ''
            }
        case 'error':
            return {
                loading: false,
                test: {},
                error: 'Something wents wrong'
            }
        default:
            return currentState
    }
}

const Details = () => {
    const { id } = useParams();
    const { userInfo } = useContext(authContext);
    const axiosPublic = UseAxiosPublic();
    const [fetchingTest, dispatch] = useReducer(reducer, initialState);
    const navig = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchData = useCallback(() => {
        axiosPublic.get(`/test/${id}`)
            .then(({ data }) => {
                dispatch({ type: 'success', data })
            })
            .catch(() => {
                dispatch({ type: 'error' })
            })
    }, [id])

    useEffect(() => {
        fetchData()
    }, [id])

    const openModal = () => {
        if (userInfo) {
            setIsModalOpen(true)
        } else {
            navig('/login')
        }
    }


    return (
        <>
            <PageTopUi>Test Details</PageTopUi>
            {
                fetchingTest.loading ? <Loading /> : fetchingTest.error ? <Error /> :
                    <div>
                        <div className="bg-[#1D232A]">
                            <div className="max-w-7xl mx-auto px-4 py-10">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-5 md:gap-x-5 items-center">
                                    <div className="p-5 border border-gray-500 rounded-sm">
                                        <img src={fetchingTest?.test?.photo} alt="" />
                                    </div>
                                    <div className="p-10 space-y-5  ">
                                        <h1 className="text-gray-200 text-3xl">{fetchingTest?.test.name}</h1>
                                        <p className="text-gray-400">{fetchingTest?.test.details}</p>
                                        <div className="text-gray-300 pl-5 flex justify-between items-center">
                                            <ul className="list-disc">
                                                <li>Test Date : {new Date(fetchingTest?.test?.testDate).getDate() + '-' + (new Date(fetchingTest?.test?.testDate).getMonth() + 1) + '-' + new Date(fetchingTest?.test?.testDate).getFullYear()}</li>
                                                <li>Available Sit : {fetchingTest?.test.slot}</li>
                                                <li>Price : <p className="text-lg inline text-gray-100">{fetchingTest?.test.price} /=</p></li>
                                            </ul>

                                            <button onClick={openModal} className="relative px-3 md:px-7 py-2 md:py-3 mr-2 md:mr-5 lg:mr-0 font-medium text-white transition rounded-sm duration-300 bg-[#008080]  hover:bg-[#1e5e5e] ease">
                                                <span className="absolute bottom-0 left-0 h-full ml-0">
                                                    <svg viewBox="0 0 487 487" className="w-auto h-full opacity-100 object-stretch" xmlns="http://www.w3.org/2000/svg"><path d="M0 .3c67 2.1 134.1 4.3 186.3 37 52.2 32.7 89.6 95.8 112.8 150.6 23.2 54.8 32.3 101.4 61.2 149.9 28.9 48.4 77.7 98.8 126.4 149.2H0V.3z" fill="#FFF" fillRule="nonzero" fillOpacity=".1"></path></svg>
                                                </span>
                                                <span className="absolute top-0 right-0 w-20 h-full -mr-3">
                                                    <svg viewBox="0 0 487 487" className="object-cover w-full h-full" xmlns="http://www.w3.org/2000/svg"><path d="M487 486.7c-66.1-3.6-132.3-7.3-186.3-37s-95.9-85.3-126.2-137.2c-30.4-51.8-49.3-99.9-76.5-151.4C70.9 109.6 35.6 54.8.3 0H487v486.7z" fill="#FFF" fillRule="nonzero" fillOpacity=".1"></path></svg>
                                                </span>
                                                <span className="relative text-sm md:text-base">Book Now</span>
                                            </button>
                                            <Modal
                                                title="Add New Book"
                                                style={{ backgroundColor: '#111827' }}
                                                open={isModalOpen}
                                                onOk={() => setIsModalOpen(false)}
                                                onCancel={() => setIsModalOpen(false)}
                                                okButtonProps={{ style: { display: 'none' } }}
                                                centered>

                                                <BookedTest testId={fetchingTest?.test?._id} fetchData={fetchData}/>

                                            </Modal>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    );
};

export default Details;
// onClick={() => handleBook(fetchingTest?.test?._id)}
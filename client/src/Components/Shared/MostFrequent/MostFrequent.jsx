import { useCallback, useEffect, useReducer } from "react"
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic"
import TestCard from "../Ui/TestCard"
import Loading from "../Ui/Loading"
import Error from "../Ui/Error"

const initialState = {
    loading: true,
    tests: [],
    error: ''
}

const reducer = (currentState, action) => {
    switch (action.type) {
        case 'success':
            return {
                loading: false,
                tests: action?.data,
                error: ''
            }
        case 'error':
            return {
                loading: false,
                tests: [],
                error: 'Something wents wrong'
            }
        default:
            return currentState
    }
}

const MostFrequent = () => {
    const [fetchingTests, dispatch] = useReducer(reducer, initialState);
    const axiosPublic = UseAxiosPublic();

    const fetchData = useCallback(() => {
        axiosPublic.get('/mostFrequent')
            .then(({ data }) => {
                console.log(data);
                dispatch({ type: 'success', data })
            })
            .catch(() => {
                dispatch({ type: 'error' })
            })
    }, [])

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className="bg-[#1D232A]">
            <div className="max-w-6xl mx-auto px-5 lg:px-0 pt-5 md:pt-10 lg:pt-14 pb-10 md:pb-20 lg:pb-32">
                <div className="pt-20 pb-10 space-y-7 w-4/5 lg:w-2/3 mx-auto">
                    <h1 className="text-teal-500 font-medium font-serif text-2xl md:text-3xl lg:text-5xl text-center">Our Most Frequent Tests</h1>
                    <p className="text-center text-gray-300 text-base md:text-lg ">At our plastic surgery clinic, we believe that beauty comes from within, and we’re here to help you unlock your true potential.</p>
                </div>
                {
                    fetchingTests.loading ? <Loading /> : fetchingTests.error ? <Error /> :
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 md:gap-x-5 mx-auto">
                            {
                                fetchingTests.tests?.map((test) => {
                                    return <TestCard test={test} key={test._id} />
                                })
                            }
                        </div>
                }
            </div>
        </div>
    );
};

export default MostFrequent;
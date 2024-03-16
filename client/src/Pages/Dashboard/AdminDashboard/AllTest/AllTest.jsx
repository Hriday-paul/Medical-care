import { useEffect, useReducer } from "react";
import { CiViewList } from "react-icons/ci";
import UseAxiosPublic from "../../../../Hooks/UseAxiosPublic";
import { Toaster } from "react-hot-toast";
import { Button, Tooltip } from "antd";
import Error from "../../../../Components/Shared/Ui/Error";
import { MdOutlineDelete } from "react-icons/md";
import TestUpdateDrawer from "../../../../Components/Shared/Ui/TestUpdateDrawer";

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

const AllTest = () => {
    const [fetchingTests, dispatch] = useReducer(reducer, initialState);
    const axiosPublic = UseAxiosPublic();

    const fetchData = () => {
        axiosPublic.get('/allTest')
            .then(({ data }) => {
                dispatch({ type: 'success', data })
            })
            .catch(() => {
                dispatch({ type: 'error' })
            })
    }

    const delateTest = (id) => {
        console.log(id);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <div className="bg-[#262522] rounded-md p-2 mb-5 flex gap-x-3 items-center">
                <span className="p-2 bg-gradient-to-r from-[#14022b] to-[#1c043d] inline-block rounded-sm">
                    <CiViewList className="text-xl text-white "></CiViewList>
                </span>
                <h4 className="text-xl font-medium font-serif">All Test</h4>
            </div>
            {
                fetchingTests.loading ? 'loading' : fetchingTests.error ? <Error /> :
                    <div className="overflow-x-auto bg-[#262522]">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr className="border-[#494846]">
                                    <th>Photo</th>
                                    <th>Name</th>
                                    <th>Date</th>
                                    <th>Slot</th>
                                    <th>Details</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {
                                    fetchingTests.tests?.map((test) => {
                                        return <tr key={test?._id} className="border-[#494846]">
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="w-12 h-12">
                                                            <img className="rounded-md" src={test?.photo} alt="profile image" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                {test?.name}
                                            </td>
                                            <td>
                                                {new Date(test?.testDate).getDate()+'-'+(new Date(test?.testDate).getMonth()+1)+'-'+new Date(test?.testDate).getFullYear()}
                                            </td>
                                            <td>
                                                {test?.slot}
                                            </td>
                                            <td>
                                                details
                                            </td>
                                            <td>
                                                <TestUpdateDrawer test={test}></TestUpdateDrawer>
                                            </td>
                                            <td>
                                                <Tooltip title={`Delete test`}>
                                                    <Button
                                                        style={{ backgroundColor: '#515150', boxShadow: 0, color: 'white', border: 0 }}
                                                        type="primary"
                                                        icon={<MdOutlineDelete />}
                                                        onClick={() => delateTest(test._id)}
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
            }
            <Toaster></Toaster>
        </div>
    );
};

export default AllTest;
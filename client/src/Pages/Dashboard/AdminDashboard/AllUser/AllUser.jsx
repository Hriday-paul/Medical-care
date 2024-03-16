import { useEffect, useReducer } from "react";
import { LuUsers2 } from "react-icons/lu";
import UseAxiosPublic from "../../../../Hooks/UseAxiosPublic";
import { Button, Tooltip } from "antd";
import { CiEdit } from "react-icons/ci";
import toast, { Toaster } from "react-hot-toast";
import Error from "../../../../Components/Shared/Ui/Error";
import Loading from "../../../../Components/Shared/Ui/Loading";

const initialState = {
    loading: true,
    users: [],
    error: ''
}

const reducer = (currentState, action) => {
    switch (action.type) {
        case 'success':
            return {
                loading: false,
                users: action.users,
                error: ''
            }
        case 'error':
            return {
                loading: false,
                users: [],
                error: 'Something wents wrong, try again !'
            }
        default: return currentState
    }
}

const AllUser = () => {
    const axiosPublic = UseAxiosPublic();
    const [fetchingState, dispatch] = useReducer(reducer, initialState);

    const fetchdata = () => {
        axiosPublic.get('/users')
            .then(({ data }) => {
                dispatch({ type: 'success', users: data });
            })
            .catch(() => {
                dispatch({ type: 'error' });
            })
    }

    useEffect(() => {
        fetchdata()
    }, [])

    const handleStatus = (email, status) => {
        const loadingToastId = toast.loading('Status update pending...');
        axiosPublic.put('/user', { email, status })
            .then(({ data }) => {
                console.log(data);
                toast.success('Status update successfully', { id: loadingToastId })
                fetchdata()
            })
            .catch(() => {
                toast.error('Status update failed , try again !', { id: loadingToastId })
            })
    }

    return (
        <div>
            <div className="bg-[#262522] rounded-md p-2 mb-5 flex gap-x-3 items-center">
                <span className="p-2 bg-gradient-to-r from-[#14022b] to-[#1c043d] inline-block rounded-sm">
                    <LuUsers2 className="text-xl text-white "></LuUsers2>
                </span>
                <h4 className="text-xl font-medium font-serif">All users</h4>
            </div>

            {
                fetchingState.loading ? <Loading/> : fetchingState.error ? <Error/> :
                    <div className="overflow-x-auto bg-[#262522]">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr className="border-[#494846]">
                                    <th>Photo</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Status</th>
                                    <th>Set Status</th>
                                    {/* <th>Favorite Color</th>
                            <th></th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {
                                    fetchingState.users?.map((user) => {
                                        return <tr key={user?._id} className="border-[#494846]">
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="rounded-full w-12 h-12">
                                                            <img src={user?.photo} alt="profile image" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                {user?.name}
                                                {/* <br />
                                                <span className="badge badge-ghost badge-sm">Desktop Support Technician</span> */}
                                            </td>
                                            <td>
                                                {user?.email}
                                            </td>
                                            <td>
                                                {user?.status}
                                            </td>
                                            <td>
                                                <Tooltip title={`set ${user?.status == 'active' ? 'blocked' : 'active'} status`}>
                                                    <Button
                                                        style={{ backgroundColor: '#14022b', boxShadow: 0, border: 0 }}
                                                        type="primary"
                                                        icon={<CiEdit />}
                                                        onClick={() => handleStatus(user.email, user?.status == 'active' ? 'blocked' : 'active')}
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

export default AllUser;
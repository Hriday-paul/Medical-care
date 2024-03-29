import { useContext, useEffect, useReducer } from "react";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import UserDashboard from "./UserDashboard/UserDashboard";
import { authContext } from "../../ContextHandler/Authonicate/Authonicate";
import CheckAdmin from "../../Hooks/CheckAdmin";
import RootLoading from "../../Components/Shared/Ui/RootLoading";

const initialState = {
    loading: true,
    isAdmin: false,
}

const reducer = (currentState, action) => {
    switch (action) {
        case 'admin':
            return {
                loading: false,
                isAdmin: true,
            }
        case 'user':
            return {
                loading: false,
                isAdmin: false,
            }
        default: return currentState
    }
}


const Dashboard = () => {
    const { userInfo } = useContext(authContext);
    const [adminCheckState, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        CheckAdmin(userInfo?.email)
            .then(({ data }) => {
                if (data.admin) {
                    dispatch('admin')
                }
                else {
                    dispatch('user')
                }
            })
    }, [])

    return (
        <div>
            {
                adminCheckState.loading ? <RootLoading /> : adminCheckState.isAdmin ? <AdminDashboard /> : <UserDashboard />
            }
        </div>
    );
};

export default Dashboard;
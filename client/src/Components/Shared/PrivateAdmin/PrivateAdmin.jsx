import { useContext, useEffect, useReducer } from "react";
import { authContext } from "../../../ContextHandler/Authonicate/Authonicate";
import CheckAdmin from "../../../Hooks/CheckAdmin";
import RootLoading from "../Ui/RootLoading";
import AdminDashboard from "../../../Pages/Dashboard/AdminDashboard/AdminDashboard";
import UserDashboard from "../../../Pages/Dashboard/UserDashboard/UserDashboard";
import UserHome from "../../../Pages/Dashboard/UserDashboard/UserHome/UserHome";

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


const PrivateAdmin = ({children}) => {
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
                adminCheckState.loading ? <RootLoading /> : adminCheckState.isAdmin ? children : <UserHome />
            }
        </div>
    );
};

export default PrivateAdmin;
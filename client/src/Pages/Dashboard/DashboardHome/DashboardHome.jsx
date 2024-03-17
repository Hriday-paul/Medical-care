import { useContext, useEffect, useReducer } from "react";
import CheckAdmin from "../../../Hooks/CheckAdmin";
import { authContext } from "../../../ContextHandler/Authonicate/Authonicate";
import UserHome from "../UserDashboard/UserHome/UserHome";
import AdminHome from '../AdminDashboard/AdminHome/AdminHome'
import Loading from "../../../Components/Shared/Ui/Loading";

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

const DashboardHome = () => {
    const { userInfo } = useContext(authContext);
    const [adminCheckState, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        CheckAdmin(userInfo?.email)
            .then(({ data }) => {
                if(data.admin){
                    dispatch('admin')
                }
                else{
                    dispatch('user')
                }
            })
    }, [])

    return (
        <div>
            {
                adminCheckState.loading ? <Loading /> : adminCheckState.isAdmin ? <AdminHome /> : <UserHome/>
            }
        </div>
    );
};

export default DashboardHome;
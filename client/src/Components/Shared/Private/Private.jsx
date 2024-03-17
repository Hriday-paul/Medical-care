import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { authContext } from '../../../ContextHandler/Authonicate/Authonicate';
import RootLoading from '../Ui/RootLoading';


function Private({ children }) {
    const { userInfo, loading } = useContext(authContext);
    const location = useLocation();

    if (loading) {
        return <RootLoading />
    }

    else if (userInfo) {
        return children;
    }

    return <Navigate state={{from : location.pathname}} to="/login" replace></Navigate>
}

export default Private
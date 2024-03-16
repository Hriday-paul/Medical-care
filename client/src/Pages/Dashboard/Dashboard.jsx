import AdminDashboard from "./AdminDashboard/AdminDashboard";
import UserDashboard from "./UserDashboard/UserDashboard";


const Dashboard = () => {
    const isAdmin = true;

    return (
        <div>
            {
                isAdmin ? <AdminDashboard /> : <UserDashboard />
            }
        </div>
    );
};

export default Dashboard;
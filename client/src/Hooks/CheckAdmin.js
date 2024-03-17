import UseAxiosPublic from "./UseAxiosPublic";


const CheckAdmin = (email) => {
    const axiosPublic = UseAxiosPublic();
    
    return axiosPublic.get(`/isAdmin/${email}`)
};

export default CheckAdmin;
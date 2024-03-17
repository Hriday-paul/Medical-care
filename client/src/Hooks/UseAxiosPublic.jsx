import axios from "axios"

const axiosSequre = axios.create({
    baseURL: 'https://medical-care.onrender.com',
    // withCredentials : true,
})
function UseAxiosPublic() {
  return (
    axiosSequre
  )
}

export default UseAxiosPublic
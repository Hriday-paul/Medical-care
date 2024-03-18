import axios from "axios"

const axiosSequre = axios.create({
    baseURL: 'http://localhost:4000',
    // withCredentials : true,
})
function UseAxiosPublic() {
  return (
    axiosSequre
  )
}

export default UseAxiosPublic
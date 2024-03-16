import { useContext, useEffect } from "react";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import { authContext } from "../../ContextHandler/Authonicate/Authonicate";


const Alltests = () => {
    const axiosPublic = UseAxiosPublic();
    const { userInfo } = useContext(authContext);

    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log(json))
    }, [])

    return (
        <div>
            
        </div>
    );
};

export default Alltests;
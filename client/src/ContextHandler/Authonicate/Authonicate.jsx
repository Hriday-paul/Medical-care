import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import auth from '../../../firebase.init'

export const authContext = createContext(null);

const Autthonicate = ({ children }) => {
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const provider = new GoogleAuthProvider();

    const creatUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    const logOutUser = () => {
        setLoading(true)
        return signOut(auth);
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUserInfo(currentUser);
            setLoading(false);
        })
        return () => {
            unsubscribe()
        }
    }, [])


    const authInfo = {
        userInfo,
        loading,
        creatUser,
        loginUser,
        googleLogin,
        logOutUser,
    }

    return (
        <authContext.Provider value={authInfo}>
            {children}
        </authContext.Provider>
    );
};

export default Autthonicate;
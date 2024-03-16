import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import registeranim from '../../assets/register-anim.gif'
import { useForm } from "react-hook-form"
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import { authContext } from "../../ContextHandler/Authonicate/Authonicate";

const Login = () => {
    const axiosPublic = UseAxiosPublic();
    const [loader, setLoader] = useState(false);
    const { loginUser, googleLogin } = useContext(authContext);
    const navig = useNavigate();
    const { state } = useLocation();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const handleRegister = (data) => {
        setLoader(true)
        loginUser(data.email, data.password)
            .then(() => {
                reset();
                setLoader(false);
                navig(state?.from || '/');
            })
            .catch(() => {
                setLoader(false);
                toast.error('Enter valid email & password !')
            })
    }

    const handleGoogleSign = () => {
        setLoader(true)
        googleLogin()
            .then(({ user }) => {
                const { email, displayName } = user;
                axiosPublic.put('/user', { email, name: displayName, password: '', status : 'active', photo : user?.photoURL || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUDOlaA7x6auc_yDvEigMgyktyrJBM34AFOaauo6-qXD5zg_vpZlZk9offXf9PMLdA0Lw&usqp=CAU" })
                    .then(() => {
                        reset();
                        setLoader(false);
                        navig(state?.from || '/');
                    })
                    .catch(() => {
                        setLoader(false);
                        toast.error('Something wents wrong, try again !')
                    })
            })
            .catch(() => {
                setLoader(false);
                toast.error('Something wents wrong, try again !')
            })
    }


    return (
        <>
            <div className="min-h-screen bg-gray-700">
                <div className="flex justify-center items-center w-full min-h-screen">
                    <div className="grid max-w-screen-3xl grid-cols-1 md:gap-x-10 lg:gap-x-20 px-8 py-16 mx-auto rounded-lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 bg-gray-800">

                        <div className="flex-col hidden md:flex justify-between">
                            <div className="space-y-2">
                                <h2 className="text-4xl text-gray-200 font-bold leading-tight lg:text-5xl">{"Let's Login !"}</h2>
                                <div className="text-gray-400">Vivamus in nisl metus? Phasellus.</div>
                            </div>
                            <img src={registeranim} alt="" className="p-6 h-52 md:h-64" />
                        </div>

                        <form onSubmit={handleSubmit(handleRegister)} className="space-y-6">

                            <div>
                                <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-400">Email <span className="text-red-500">*</span></label>
                                <input id="email" type="email" placeholder="email..." className={`w-full py-2 px-3 rounded-lg bg-gray-800 text-gray-300 border outline-0 ${errors.email ? ' border-red-500' : ' border-gray-600 focus:border-blue-500'}`}  {...register("email", { required: true })} />
                                {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
                            </div>

                            <div>
                                <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-400">Password <span className="text-red-500">*</span></label>
                                <input id="password" type="password" placeholder="password..." className={`w-full py-2 px-3 rounded-lg bg-gray-800 text-gray-300 border outline-0 ${errors.password ? ' border-red-500' : ' border-gray-600  focus:border-blue-500 '}`} {...register("password", { required: true })} />
                                {errors.password && <p className="text-red-500 text-sm">Password is required</p>}
                            </div>

                            <div className="col-span-1 md:col-span-2 my-2">
                                <button type="submit" className="btn btn-info w-full bg-blue-500 text-white hover:bg-blue-600">
                                    Login Now
                                    {
                                        loader && <span className="loading loading-spinner"></span>
                                    }
                                </button>
                                <p className="text-sm font-light text-gray-200 mt-3">
                                    Dont have an account? <Link to="/register" className="font-medium text-gray-300 hover:underline">Register now</Link>
                                </p>

                                <div className="group w-full flex justify-center items-center mt-5 h-12 px-6 border-2 border-blue-500 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100 cursor-pointer" onClick={handleGoogleSign}>
                                    <div className="relative flex justify-between items-center space-x-7">
                                        <img src="https://tailus.io/sources/blocks/social/preview/images/google.svg" className="absolute left-0 w-4" alt="google logo" />
                                        <span className="text-base font-bold text-blue-500 transition duration-300  sm:text-base">Continue with Google</span>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <Toaster></Toaster>
            </div>

        </>
    );
};


export default Login;
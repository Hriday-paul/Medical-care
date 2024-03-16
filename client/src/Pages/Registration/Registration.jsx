import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UseAxiosPublic from '../../Hooks/UseAxiosPublic'
import toast, { Toaster } from 'react-hot-toast';
import registeranim from '../../assets/register-anim.gif'
import { useForm } from "react-hook-form"
import { updateProfile } from "firebase/auth";
import { authContext } from "../../ContextHandler/Authonicate/Authonicate";

const Registration = () => {
    const { creatUser } = useContext(authContext);
    const [loader, setLoader] = useState(false);
    const navig = useNavigate();
    const { state } = useLocation();
    const axiosPublic = UseAxiosPublic();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const handleRegister = (data) => {
        setLoader(true)
        creatUser(data.email, data.password)
            .then(({ user }) => {
                updateProfile(user, {
                    displayName: data.name,
                })
                axiosPublic.put('/user', {...data, status : 'active', photo : user?.photoURL || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUDOlaA7x6auc_yDvEigMgyktyrJBM34AFOaauo6-qXD5zg_vpZlZk9offXf9PMLdA0Lw&usqp=CAU"})
                    .then(() => {
                        toast.success('Registration complete')
                        reset();
                        setLoader(false);
                        toast.success('Registration complete');
                        navig(state?.from || '/');
                    })
                    .catch(() => {
                        setLoader(false);
                        toast.error('Something wents wrong, try again !')
                    })
            })
            .catch(() => {
                setLoader(false);
                toast.error('Email already exist, try another email !')
            })
    }



    return (
        <>
            <div className="min-h-screen bg-gray-700">
                <div className="flex justify-center items-center w-full min-h-screen">
                    <div className="grid max-w-screen-3xl grid-cols-1 md:gap-x-10 lg:gap-x-20 px-8 py-16 mx-auto rounded-lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 bg-gray-800">

                        <div className="flex-col hidden md:flex justify-between">
                            <div className="space-y-2">
                                <h2 className="text-4xl text-gray-200 font-bold leading-tight lg:text-5xl">{"Let's Register !"}</h2>
                                <div className="text-gray-400">Vivamus in nisl metus? Phasellus.</div>
                            </div>
                            <img src={registeranim} alt="" className="p-6 h-52 md:h-64" />
                        </div>

                        <form onSubmit={handleSubmit(handleRegister)} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-400">Full name <span className="text-red-500">*</span></label>
                                <input id="name" type="text" placeholder="name..." className={`w-full py-2 px-3 rounded-lg bg-gray-800 text-gray-300 border outline-0 ${errors.name ? 'border border-red-500' : 'border border-gray-600 focus:border-blue-500'}`} {...register("name", { required: true })} />
                                {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-400">Email <span className="text-red-500">*</span></label>
                                <input id="email" type="email" placeholder="email..." className={`w-full py-2 px-3 rounded-lg bg-gray-800 text-gray-300 border outline-0 ${errors.email ? ' border-red-500' : ' border-gray-600 focus:border-blue-500'}`}  {...register("email", { required: true })} />
                                {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
                            </div>

                            <div>
                                <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-400">Password <span className="text-red-500">*</span></label>
                                <input id="password" type="password" placeholder="password..." className={`w-full py-2 px-3 rounded-lg bg-gray-800 text-gray-300 border outline-0 ${errors.password ? ' border-red-500' : ' border-gray-600  focus:border-blue-500 '}`} {...register("password", { required: true, pattern: /(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/, minLength: 6 })} />
                                {errors.password && <p className="text-red-500 text-sm">use minimum 1 capital, 1 number and 1 special character & 6 length</p>}
                            </div>

                            <div className="col-span-1 md:col-span-2 my-2">
                                <button type="submit" className="btn btn-info w-full bg-blue-500 text-white hover:bg-blue-600">
                                    Register Now
                                    {
                                        loader && <span className="loading loading-spinner"></span>
                                    }
                                </button>
                                <p className="text-sm font-light text-gray-200 mt-3">
                                    Already have an account? <Link to="/login" className="font-medium text-gray-300 hover:underline">Login here</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
                <Toaster></Toaster>
            </div>

        </>
    );
};

export default Registration;

import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from '../../../assets/logo.png'
import { IoIosNotificationsOutline } from "react-icons/io";
import { Badge } from "antd";
import { useContext, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiUser } from "react-icons/ci";
import { HiLogout } from "react-icons/hi";
import { LuLayoutDashboard, LuListTodo } from "react-icons/lu";
import { RiMenu3Fill } from "react-icons/ri";
import { GiTireIronCross } from "react-icons/gi";
import { authContext } from "../../../ContextHandler/Authonicate/Authonicate";

const UserDashboard = () => {
    const { userInfo, logOutUser } = useContext(authContext);
    const [slide, setSlide] = useState(false);
    const [showDropDown, setShowDropDown] = useState(false)
    const navig = useNavigate();
    const location = useLocation();

    const signOut = () => {
        logOutUser()
            .then(() => {
                navig('/')
            })
    }

    return (
        <div>
            <nav className="bg-gradient-to-r from-[#21201E] to-[#1c043d] px-4">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
                    <NavLink to='/' className="flex items-center py-2">
                        <img className='h-12 md:h-16' src={logo} alt="logo" />
                        <span className="self-center text-xl md:text-2xl text-white font-semibold font-mono whitespace-nowrap uppercase">Medicare</span>
                    </NavLink>

                    <div className="items-center justify-between flex md:order-1" id="navbar-user">
                        <ul className="flex items-center font-medium rounded-lg space-x-4 md:space-x-8">
                            <li>
                                <Badge count={5} color="rgb(45, 183, 245)" >
                                    <IoIosNotificationsOutline className="text-2xl md:text-2xl text-white"></IoIosNotificationsOutline>
                                </Badge>

                            </li>
                            <li className="flex items-center justify-center">
                                <img className='h-7 md:h-9 rounded-full' src={userInfo?.photoURL !== null ? `${userInfo.photoURL}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUDOlaA7x6auc_yDvEigMgyktyrJBM34AFOaauo6-qXD5zg_vpZlZk9offXf9PMLdA0Lw&usqp=CAU"} alt="img" />

                                <div className="relative flex items-center cursor-pointer" onClick={() => setShowDropDown(!showDropDown)}>
                                    <p className="text-white font-sans text-base md:text-lg ml-1">Profile</p>
                                    <RiArrowDropDownLine className={showDropDown ? 'text-3xl text-white -ml-1 rotate-180 duration-100' : 'text-3xl text-white -ml-1 duration-100'}></RiArrowDropDownLine>
                                    <span className={showDropDown ? 'absolute top-12 right-0 block' : 'absolute top-12 right-0 hidden'}>
                                        <ul className="w-36 bg-gray-700 border shadow-md">
                                            <li className="hover:bg-gray-100 p-2 cursor-pointer flex gap-x-1 items-center">
                                                <CiUser></CiUser><p className="text-sm font-sans">My Profile</p>
                                            </li>
                                            <li onClick={signOut} className="hover:bg-gray-100 p-2 cursor-pointer flex gap-x-1 items-center">
                                                <HiLogout></HiLogout><p className="text-sm font-sans">Logout</p>
                                            </li>
                                        </ul>
                                    </span>
                                </div>
                            </li>
                            <li className='lg:hidden'>
                                <div>
                                    {
                                        !slide && <RiMenu3Fill onClick={() => setSlide(true)} className='text-2xl text-white'></RiMenu3Fill>
                                    }
                                    {
                                        slide && <GiTireIronCross className='text-white' onClick={() => setSlide(false)}></GiTireIronCross>
                                    }

                                </div>
                            </li>

                        </ul>
                    </div>

                </div>
            </nav>

            <div className="flex flex-row">
                <div className="w-80 bg-gradient-to-br from-[#21201E] to-[#1a1917] h-[calc(100vh-80px)] hidden lg:block">
                    <div className="flex gap-x-2 items-center p-2 bg-[#494846]">
                        <img className="h-12 rounded-full" src={userInfo?.photoURL !== null ? `${userInfo.photoURL}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUDOlaA7x6auc_yDvEigMgyktyrJBM34AFOaauo6-qXD5zg_vpZlZk9offXf9PMLdA0Lw&usqp=CAU"} alt="img" />
                        
                        <span className="truncate">
                            <h3 className="text-lg font-medium font-serif text-white truncate">{userInfo.displayName}</h3>
                            <p className="truncate text-white text-sm">{userInfo.email}</p>
                        </span>
                    </div>
                    <div className="px-2">
                        <h2 className="text-lg font-medium text-white font-serif p-5 pb-0">Main</h2>
                        <NavLink to="/dashboard" className={location.pathname == '/dashboard' ? "w-full text-white my-5 flex flex-row justify-start items-center p-3 bg-[#504f4c] hover:bg-[#494846] duration-100 rounded-sm shadow-xl" : "w-full my-5 flex flex-row items-center justify-start p-3 bg-transparent hover:bg-[#494846] duration-100 rounded-sm shadow-xl"} >
                            <LuLayoutDashboard className="text-white text-2xl mr-2"></LuLayoutDashboard>
                            <h4 className="text-lg text-white font-serif font-medium">Dashboard</h4>
                        </NavLink>
                        <NavLink to="/dashboard/todos" className={({ isActive }) => isActive ? "w-full text-white my-5 flex flex-row justify-start items-center p-3 bg-[#504f4c] hover:bg-[#494846] duration-100 rounded-sm shadow-xl" : "w-full my-5 flex flex-row items-center justify-start p-3 bg-transparent hover:bg-[#494846] duration-100 rounded-sm shadow-xl"} >
                            <LuListTodo className="text-white text-2xl mr-2"></LuListTodo>
                            <h4 className="text-lg text-white font-serif font-medium">Tasks</h4>
                        </NavLink>
                    </div>
                </div>

                <div className={`w-2/3 md:w-1/3 bg-gradient-to-br lg:hidden from-[#677AE5] to-[#8577C8] h-[calc(100vh-64px)] absolute top-[64px] md:top-[80px] z-50 left-0 ${slide ? "translate-x-0" : "-translate-x-[750px]"} duration-300`}>
                    <div className="flex gap-x-1 justify-center items-center py-2 bg-[#989de7]">
                        <img className="h-12 rounded-full" src={userInfo?.photoURL !== null ? `${userInfo.photoURL}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUDOlaA7x6auc_yDvEigMgyktyrJBM34AFOaauo6-qXD5zg_vpZlZk9offXf9PMLdA0Lw&usqp=CAU"} alt="img" />
                        <span>
                            <span className="block text-lg font-medium font-serif text-white">{userInfo?.displayName}</span>
                            <span className="block text-xs text-white">{userInfo?.email}</span>
                        </span>
                    </div>
                    <div>
                        <h2 className="text-lg font-medium text-white font-serif p-5 pb-0">Main</h2>
                        <NavLink onClick={() => setSlide(false)} to="/dashboard" className={location.pathname == '/dashboard' ? "w-full text-white my-3 flex flex-row justify-start items-center p-3 bg-[#989de7] hover:bg-[#989de7] duration-100" : "w-full my-3 flex flex-row items-center justify-start p-3 bg-transparent hover:bg-[#989de7] duration-100"} >
                            <LuLayoutDashboard className="text-white text-2xl mr-2"></LuLayoutDashboard>
                            <h4 className="text-lg text-white font-serif font-medium">Dashboard</h4>
                        </NavLink>
                        <NavLink onClick={() => setSlide(false)} to="/dashboard/todos" className={({ isActive }) => isActive ? "w-full text-white my-3 flex flex-row justify-start items-center p-3 bg-[#989de7] hover:bg-[#989de7] duration-100" : "w-full my-3 flex flex-row items-center justify-start p-3 bg-transparent hover:bg-[#989de7] duration-100"} >
                            <LuListTodo className="text-white text-2xl mr-2"></LuListTodo>
                            <h4 className="text-lg text-white font-serif font-medium">Tasks</h4>
                        </NavLink>
                    </div>
                </div>

                <div className="w-full bg-[#302E2B] h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] p-4 md:p-8 lg:p-10 overflow-auto">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};


export default UserDashboard;
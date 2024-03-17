import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link, NavLink } from 'react-router-dom'
import logo from '../../../assets/logo.png'
import { RiMenu3Fill } from "react-icons/ri";
import { MdOutlinePhonePaused } from "react-icons/md";
import { IoIosMailUnread } from "react-icons/io";



const Navbar = () => {
    const [showTopNav, setShowTopNav] = useState(true);
    const handleScroll = () => {
        if (document.body.scrollTop > 120 || document.documentElement.scrollTop > 120) {
            setShowTopNav(false);
        }
        else if (document.body.scrollTop == 0 || document.documentElement.scrollTop == 0) {
            setShowTopNav(true);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            // Cleanup the event listener when the component unmounts
            window.removeEventListener('scroll', handleScroll);
        };
    }, [])

    return (
        <div className={`text-white z-30 fixed top-0 left-0 w-full ${showTopNav ? 'bg-transparent' : 'bg-black text-white'}`}>
            <div className="max-w-6xl mx-auto px-4">
                <div className={`p-4 border-double border-b-4 duration-300 ${showTopNav ? 'flex justify-between' : 'hidden'}`}>
                    <div className="flex gap-x-2 md:gap-x-3 lg:gap-x-5">
                        <div className="flex gap-x-1 items-center">
                            <MdOutlinePhonePaused className="text-xs md:text-base"/>
                            <p className="text-xs md:text-base md:font-medium">+880187949494</p>
                        </div>
                        <div className="flex gap-x-1 items-center">
                            <IoIosMailUnread className="text-xs md:text-base"/>
                            <p className="text-xs md:text-base md:font-medium">xyz@gmail.com</p>
                        </div>
                    </div>

                    <div className="flex gap-x-2 md:gap-x-5 items-center">
                        <FaFacebook className="text-base md:text-lg lg:text-xl"></FaFacebook>
                        <FaTwitter className="text-base md:text-lg lg:text-xl"></FaTwitter>
                        <FaLinkedin className="text-base md:text-lg lg:text-xl"></FaLinkedin>
                        <FaWhatsapp className="text-base md:text-lg lg:text-xl"></FaWhatsapp>
                        <FaYoutube className="text-base md:text-lg lg:text-xl"></FaYoutube>
                    </div>
                </div>

                <div className="flex items-center justify-between py-3">
                    <Link to='/' className="flex items-center gap-x-2">
                        <img className="h-10 md:h-14 lg:h-20" src={logo} alt="logo" />
                        <h1 className="uppercase text-xl md:text-2xl lg:text-3xl font-bold text-[#00C4CC] font-mono">MediCare</h1>
                    </Link>
                    <div className="hidden lg:block">
                        <ul className="flex gap-x-8">
                            <li className='text-lg font-medium font-sans relative group'>
                                <NavLink to='/'>Home</NavLink>
                                <span className='absolute left-0 -bottom-2 h-0.5 w-0 group-hover:w-full bg-[#00C4CC] duration-200'></span>
                            </li>
                            <li className='text-lg font-medium font-sans relative group'>
                                <NavLink to='/allTest'>All Test</NavLink>
                                <span className='absolute left-0 -bottom-2 h-0.5 w-0 group-hover:w-full bg-[#00C4CC] duration-200'></span>
                            </li>
                            <li className='text-lg font-medium font-sans relative group'>
                                <NavLink to='/gallery'>Gallery</NavLink>
                                <span className='absolute left-0 -bottom-2 h-0.5 w-0 group-hover:w-full bg-[#00C4CC] duration-200'></span>
                            </li>
                            <li className='text-lg font-medium font-sans relative group'>
                                <NavLink to='/blog'>Blog</NavLink>
                                <span className='absolute left-0 -bottom-2 h-0.5 w-0 group-hover:w-full bg-[#00C4CC] duration-200'></span>
                            </li>
                            <li className='text-lg font-medium font-sans relative group'>
                                <NavLink to='/contact'>Contact</NavLink>
                                <span className='absolute left-0 -bottom-2 h-0.5 w-0 group-hover:w-full bg-[#00C4CC] duration-200'></span>
                            </li>


                        </ul>
                    </div>
                    <div className="flex flex-row items-center">
                        <Link to='/dashboard' className="relative px-3 md:px-7 py-2 md:py-4 mr-2 md:mr-5 lg:mr-0 font-medium text-white transition duration-300 bg-[#008080]  hover:bg-[#1e5e5e] ease">
                            <span className="absolute bottom-0 left-0 h-full ml-0">
                                <svg viewBox="0 0 487 487" className="w-auto h-full opacity-100 object-stretch" xmlns="http://www.w3.org/2000/svg"><path d="M0 .3c67 2.1 134.1 4.3 186.3 37 52.2 32.7 89.6 95.8 112.8 150.6 23.2 54.8 32.3 101.4 61.2 149.9 28.9 48.4 77.7 98.8 126.4 149.2H0V.3z" fill="#FFF" fillRule="nonzero" fillOpacity=".1"></path></svg>
                            </span>
                            <span className="absolute top-0 right-0 w-20 h-full -mr-3">
                                <svg viewBox="0 0 487 487" className="object-cover w-full h-full" xmlns="http://www.w3.org/2000/svg"><path d="M487 486.7c-66.1-3.6-132.3-7.3-186.3-37s-95.9-85.3-126.2-137.2c-30.4-51.8-49.3-99.9-76.5-151.4C70.9 109.6 35.6 54.8.3 0H487v486.7z" fill="#FFF" fillRule="nonzero" fillOpacity=".1"></path></svg>
                            </span>
                            <span className="relative text-sm md:text-base">My Appoinments</span>
                        </Link>
                        <RiMenu3Fill className="text-white text-2xl md:text-3xl lg:hidden"></RiMenu3Fill>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Navbar;
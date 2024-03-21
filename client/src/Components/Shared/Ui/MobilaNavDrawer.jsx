import { useState } from "react";
import { RiMenu3Fill } from "react-icons/ri";
import { Drawer } from 'antd';
import { Link, NavLink } from "react-router-dom";
import logo from '../../../assets/logo.png'
import { IoHomeOutline } from "react-icons/io5";
import { FaRegRectangleList } from "react-icons/fa6";
import { GrGallery } from "react-icons/gr";
import { ImFileText2 } from "react-icons/im";
import { MdOutlineContactSupport } from "react-icons/md";

const title = () => {
    return (
        <Link to='/' className="flex items-center gap-x-2">
            <img className="h-10 md:h-14 lg:h-20" src={logo} alt="logo" />
            <h1 className="uppercase text-xl md:text-2xl lg:text-3xl font-bold text-[#00C4CC] font-mono">MediCare</h1>
        </Link>
    )
}

const MobilaNavDrawer = () => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <RiMenu3Fill onClick={() => setOpen(true)} className="text-white text-2xl md:text-3xl lg:hidden"></RiMenu3Fill>

            <Drawer style={{ backgroundColor: '#1A1917', color: 'white' }} width={320} title={title()} onClose={() => setOpen(false)} open={open} placement='left'>
                <ul className="flex flex-col gap-8">
                    <li className='text-lg font-medium font-sans relative group'>
                        <NavLink to='/' onClick={() => setOpen(false)} className="flex flex-row gap-x-2 items-center">
                            <IoHomeOutline className="text-[#00C4CC] text-base"></IoHomeOutline>
                            <h4>Home</h4>
                        </NavLink>
                        <span className='absolute left-0 -bottom-2 h-0.5 w-0 group-hover:w-full bg-[#00C4CC] duration-200'></span>
                    </li>
                    
                    <li className='text-lg font-medium font-sans relative group'>
                        <NavLink to='/allTest' onClick={() => setOpen(false)} className="flex flex-row gap-x-2 items-center">
                            <FaRegRectangleList className="text-[#00C4CC] text-base"></FaRegRectangleList>
                            <h4>All Test</h4>
                        </NavLink>
                        <span className='absolute left-0 -bottom-2 h-0.5 w-0 group-hover:w-full bg-[#00C4CC] duration-200'></span>
                    </li>

                    <li className='text-lg font-medium font-sans relative group'>
                        <NavLink to='/gallery' onClick={() => setOpen(false)} className="flex flex-row gap-x-2 items-center">
                            <GrGallery className="text-[#00C4CC] text-base"></GrGallery>
                            <h4>Gallery</h4>
                        </NavLink>
                        <span className='absolute left-0 -bottom-2 h-0.5 w-0 group-hover:w-full bg-[#00C4CC] duration-200'></span>
                    </li>

                    <li className='text-lg font-medium font-sans relative group'>
                        <NavLink to='/blog' onClick={() => setOpen(false)} className="flex flex-row gap-x-2 items-center">
                            <ImFileText2 className="text-[#00C4CC] text-base"></ImFileText2>
                            <h4>Blog</h4>
                        </NavLink>
                        <span className='absolute left-0 -bottom-2 h-0.5 w-0 group-hover:w-full bg-[#00C4CC] duration-200'></span>
                    </li>

                    <li className='text-lg font-medium font-sans relative group'>
                        <NavLink to='/contact' onClick={() => setOpen(false)} className="flex flex-row gap-x-2 items-center">
                            <MdOutlineContactSupport className="text-[#00C4CC] text-lg"></MdOutlineContactSupport>
                            <h4>Contact</h4>
                        </NavLink>
                        <span className='absolute left-0 -bottom-2 h-0.5 w-0 group-hover:w-full bg-[#00C4CC] duration-200'></span>
                    </li>


                </ul>
            </Drawer>
        </div>
    );
};

export default MobilaNavDrawer;
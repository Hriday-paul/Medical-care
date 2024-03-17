import { useCallback, useEffect, useState } from "react";
import { GrFormNextLink } from "react-icons/gr";
import { Link } from "react-router-dom";

const HomeSlider = () => {
    const [currentSlider, setCurrentSlider] = useState(0);
    const carouselImages = [
        'https://dogri.bluebellbd.net/wp-content/uploads/2023/11/service-03.jpg',
        'https://dogri.bluebellbd.net/wp-content/uploads/2023/11/service-01.jpg',
        'http://holamed.like-themes.com/wp-content/uploads/2018/11/SLIDE_02.jpg',
        'https://dogri.bluebellbd.net/wp-content/uploads/2023/11/service-02.jpg'
    ];

    const prevSlider = () => setCurrentSlider((currentSlider) => currentSlider === 0 ? carouselImages.length - 1 : currentSlider - 1);
    const nextSlider = useCallback(() => setCurrentSlider((currentSlider) => currentSlider === carouselImages.length - 1 ? 0 : currentSlider + 1), [carouselImages.length]);

    // if you don't want to change the slider automatically then you can just remove the useEffect
    useEffect(() => {
        const intervalId = setInterval(() => {
            nextSlider();
        }, 4000);
        return () => clearInterval(intervalId);
    }, [nextSlider]);

    return (
        <div className="h-[350px] w-full md:h-screen relative overflow-hidden">
            {/* arrow left */}
            <button onClick={prevSlider} className="absolute bottom-7 right-14 md:right-[70px] z-20 flex justify-center items-center bg-[#198D8D] hover:bg-[#346E6E] duration-300 rounded w-6 h-6 md:w-10 md:h-10">
                <GrFormNextLink className="text-white rotate-180 text-lg"></GrFormNextLink>
            </button>
            {/* arrow right */}
            <button onClick={nextSlider} className="absolute bottom-7 right-5 z-20  flex justify-center items-center rounded w-6 h-6 md:w-10 md:h-10 bg-[#198D8D] hover:bg-[#346E6E] duration-300">
                <GrFormNextLink className="text-white text-lg"></GrFormNextLink>
            </button>

            <div className="absolute bottom-0 left-5 lg:left-28 h-[calc(350px-116px)] md:h-[calc(100vh-140px)] lg:h-[calc(100vh-164px)] flex items-center z-10 w-full">
                <div className="bg-black opacity-80 p-5 md:p-7 lg:p-10 w-[250px] md:w-[400px] lg:w-[500px] ">
                    <button className="relative px-2 md:px-3 py-2 md:py-3 mb-3 md:mb-5 lg:mb-7 font-medium text-white transition duration-300 bg-[#008080]  hover:bg-[#1e5e5e] ease">
                        <Link to='/allTest'>
                            <span className="absolute bottom-0 left-0 h-full ml-0">
                                <svg viewBox="0 0 487 487" className="w-auto h-full opacity-100 object-stretch" xmlns="http://www.w3.org/2000/svg"><path d="M0 .3c67 2.1 134.1 4.3 186.3 37 52.2 32.7 89.6 95.8 112.8 150.6 23.2 54.8 32.3 101.4 61.2 149.9 28.9 48.4 77.7 98.8 126.4 149.2H0V.3z" fill="#FFF" fillRule="nonzero" fillOpacity=".1"></path></svg>
                            </span>
                            <span className="absolute top-0 right-0 w-20 h-full -mr-3">
                                <svg viewBox="0 0 487 487" className="object-cover w-full h-full" xmlns="http://www.w3.org/2000/svg"><path d="M487 486.7c-66.1-3.6-132.3-7.3-186.3-37s-95.9-85.3-126.2-137.2c-30.4-51.8-49.3-99.9-76.5-151.4C70.9 109.6 35.6 54.8.3 0H487v486.7z" fill="#FFF" fillRule="nonzero" fillOpacity=".1"></path></svg>
                            </span>
                            <span className="relative text-xs md:text-base">Make Appoinment</span>
                        </Link>
                    </button>

                    <h1 className="text-sm lg:text-3xl font-bold text-white font-serif">Health Checkup With Our Best Doctors</h1>
                    <p className="text-white text-xs md:text-lg font-medium mt-1 md:mt-3 font-serif">We provide one of the best Medical Services. Contact us today & feel good again....</p>
                </div>
            </div>


            {/* dots */}
            <div className="flex justify-center items-center rounded-full z-10 absolute bottom-4 w-full gap-1">
                {carouselImages.map((_, inx) => (
                    <button key={_} onClick={() => setCurrentSlider(inx)} className={`rounded-full duration-500 bg-[#198D8D] ${currentSlider === inx ? "w-8" : "wz-2"} h-2`}></button>
                ))}
            </div>
            {/* Carousel container */}
            <div className="ease-linear duration-500 flex transform-gpu" style={{ transform: `translateX(-${currentSlider * 100}%)` }}>
                {/* sliders */}
                {carouselImages.map((slide, inx) => (
                    <img key={slide} src={slide} className="min-w-full h-[350px] bg-black/20 sm:h-96 md:h-[100vh] object-cover brightness-50" alt={`Slider - ${inx + 1}`} />
                ))}
            </div>
        </div>
    );
};

export default HomeSlider;
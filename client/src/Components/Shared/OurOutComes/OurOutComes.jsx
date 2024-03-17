const outComes = [
    {
        img : 'https://res.cloudinary.com/devlj6p7h/image/upload/v1710704090/docs/mmzd3kucllkjp1tc57of.png',
        name : 'Faster services',
        details : 'Our patients can expect to receive accurate results quickly, giving them peace of mind'
    },
    {
        img : 'https://res.cloudinary.com/devlj6p7h/image/upload/v1710704175/docs/m3syhs6n9pxsjnswxuie.png',
        name : 'Higher accuracy rates',
        details : 'Our diagnostic center invests in the latest state-of-the-art diagnostic technology'
    },
    {
        img : 'https://res.cloudinary.com/devlj6p7h/image/upload/v1710704221/docs/ecakek7ryofozkh2coq9.png',
        name : 'Range of services',
        details : 'Our medical diagnostic center offers a comprehensive range of diagnostic services'
    },
    {
        img : 'https://res.cloudinary.com/devlj6p7h/image/upload/v1710704259/docs/atzz6pe1o0j3b4ddhku3.png',
        name : 'Personalized care',
        details : 'We believe in providing personalized care and support to every patient who walks through our doors'
    }
]

const OurOutComes = () => {
    
    return (
        <div className="bg-[#1D232A]">
            <div className="max-w-6xl mx-auto px-5 lg:px-0 md:pt-5 pb-10 md:pb-20 lg:pb-32">
                <div className="pt-5 pb-14 space-y-7 w-4/5 lg:w-2/3 mx-auto">
                    <h1 className="text-teal-500 font-medium font-serif text-2xl md:text-3xl lg:text-5xl text-center">Advanced diagnostics for better outcomes</h1>
                    <p className="text-center text-gray-300 text-base md:text-lg ">Contact us today to schedule an appointment and experience the difference of expert diagnostics and compassionate care.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-x-5 gap-y-5">
                    {
                        outComes?.map((outCome)=>{
                            return <div key={outCome.name} className="mx-auto text-center">
                        <div className="flex justify-center items-center">
                            <img className="rounded-full h-52 w-52 hover:brightness-75 duration-200" src={outCome.img} alt="image" />
                        </div>
                        <div className="mx-auto text-center space-y-3 mt-5">
                            <h3 className="text-teal-500 text-2xl font-medium">{outCome.name}</h3>
                            <p className="text-gray-400 text-base">{outCome.details}</p>
                        </div>
                    </div>
                        })
                    }

                </div>



            </div>
        </div>
    );
};

export default OurOutComes;


const PageTopUi = ({children}) => {
    return (
        <div className="relative">
            <img className="w-full h-[35vh] md:h-[55vh] lg:h-[60vh] brightness-50" src={`https://res.cloudinary.com/devlj6p7h/image/upload/v1710565625/test/qqwid0ueckoamuakbhag.jpg`} alt="banner image" />
            <span className="absolute bottom-0 left-0 h-[calc(40vh-104px)] md:h-[calc(55vh-128px)] lg:h-[calc(60vh-152px)] w-full flex justify-center items-center">
                <h2 className="text-center text-white text-xl md:text-3xl lg:text-5xl font-medium font-sans uppercase">{children}</h2>
            </span>
        </div>
    );
};

export default PageTopUi;
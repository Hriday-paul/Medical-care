import PageTopUi from '../../Components/Shared/PageTopUi/PageTopUi'
const galleryList = ['https://res.cloudinary.com/devlj6p7h/image/upload/v1710704363/docs/shahojeylnqolgnpsw4t.png', 
'https://res.cloudinary.com/devlj6p7h/image/upload/v1710704367/docs/kudt8okdivus88if9kss.png', 
'https://res.cloudinary.com/devlj6p7h/image/upload/v1710704369/docs/q1yho6x6lnybelwxdd8j.png', 
'https://res.cloudinary.com/devlj6p7h/image/upload/v1710704366/docs/apjeqw0ycmwbdsufzogw.png', 
'https://res.cloudinary.com/devlj6p7h/image/upload/v1710704374/docs/wqgd8fwqeexyu0xeygv5.png', 
'https://res.cloudinary.com/devlj6p7h/image/upload/v1710704369/docs/x78gkk0c1j9uavzuuoth.png']
const Gallery = () => {
    return (
        <div>
            <PageTopUi>Gallery</PageTopUi>
            <div className="bg-[#1D232A]">
                <div className="max-w-6xl mx-auto px-5 lg:px-0 md:pt-5 pb-10 md:pb-20 lg:pb-32">
                    <div className='grid grid-cols-3 gap-5 justify-center items-center'>
                        {
                            galleryList.map((gallery)=>{
                                return <img src={gallery} className='hover:brightness-75 duration-150' key={gallery} />
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gallery;
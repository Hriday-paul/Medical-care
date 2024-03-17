import PageTopUi from '../../Components/Shared/PageTopUi/PageTopUi'
const galleryList = ['https://mida.peerduck.com/wp-content/uploads/2023/04/k75g.png', 'https://mida.peerduck.com/wp-content/uploads/2023/04/k57gt.png', 'https://mida.peerduck.com/wp-content/uploads/2023/04/4tjg4.png', 'https://mida.peerduck.com/wp-content/uploads/2023/04/rwtbr.png', 'https://mida.peerduck.com/wp-content/uploads/2023/04/rehb34f.png', 'https://mida.peerduck.com/wp-content/uploads/2023/04/6uj4gt.png']
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
import MostFrequent from "../../Components/Shared/MostFrequent/MostFrequent";
import OurOutComes from "../../Components/Shared/OurOutComes/OurOutComes";
import HomeSlider from "../../Components/Shared/Ui/HomeSlider";


const Home = () => {
    

    return (
        <div>
            <HomeSlider></HomeSlider>
            <div>
                <MostFrequent/>
                <OurOutComes/>
            </div>
        </div>
    );
};

export default Home;
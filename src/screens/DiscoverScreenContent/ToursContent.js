import { useState, useEffect } from "react";

import RcmBanner from "../../components/RcmBanner";
import FullRcmContainer from '../../components/RcmContainer/FullRcmContainer'
import RcmCardContainer from '../../components/RcmContainer/RcmCardContainer';
import RcmStackContainer from '../../components/RcmContainer/RcmStackContainer'


import { getTourByCountryId, getAllTours, getTourById } from '../../services/firebase/tours';
import { getCountryFromId, getCountryFromName } from "../../services/firebase/country";

const ToursContent = ({ countryName }) => {
    const [country, setCountry] = useState([])
    const [tours, setTours] = useState([]);

    const images = [
        {img: 'https://res.klook.com/image/upload/Mobile/City/swox6wjsl5ndvkv5jvum.jpg'},
        {img: 'https://c4.wallpaperflare.com/wallpaper/611/69/87/japan-mountains-mount-fuji-asian-architecture-wallpaper-preview.jpg'},
        {img: 'https://images4.alphacoders.com/743/743533.jpg'},
        {img: 'https://w0.peakpx.com/wallpaper/898/965/HD-wallpaper-kyoto-japan-temple-city-buildings-houses.jpg'}
    ]

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch country data by name
                const countryData = await getCountryFromName(countryName);
                // If country data is found, fetch tours by countryId
                if (countryData) {
                    setCountry(countryData)
                    const toursData = await getTourByCountryId(countryData.id);
                    setTours(toursData);
                    // console.log(tours[1].demoImage)
                } else {
                    console.log(`Country with name "${countryName}" not found.`);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [countryName]);

    return (
        <>
            <RcmBanner images={images} />
            <RcmCardContainer mockTourData={tours} name={countryName} />
            {/* <FullRcmContainer
                imageSrc={mockTourFullData.demoImage}
                name={mockTourFullData.name}
                description={mockTourFullData.description}
            />
            <RcmCardContainer mockTourData={mockTourData} name={countryName} />
            <RcmStackContainer
                mockTourData={mockTourData}
                name={countryName}
            />
            <FullRcmContainer
                imageSrc={mockTourFullData.demoImage}
                name={mockTourFullData.name}
                description={mockTourFullData.description}
            />
            <RcmStackContainer
                mockTourData={mockTourData}
                name={countryName}
            /> */}
        </>
    );
};

export default ToursContent;
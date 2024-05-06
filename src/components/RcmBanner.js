import { ImageSlider } from "react-native-image-slider-banner";
import { View } from 'react-native';

const RcmBanner = ({images}) => {
    return (
        <ImageSlider
            data={images}
            autoPlay={false}
            onItemChanged={(item) => console.log("item", item)}
            closeIconColor="#fff"
            indicatorContainerStyle={{
                top: 0
            }}
            preview={true}
            caroselImageContainerStyle = {{
                height: 250,
                marginTop: 10,
//                boxShadow: 100
            }}
            caroselImageStyle={{
                resizeMode: 'cover'
            }}
        />
    )
}

export default RcmBanner
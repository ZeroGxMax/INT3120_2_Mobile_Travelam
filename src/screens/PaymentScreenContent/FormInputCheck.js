
import { colors } from "../../assets/colors/colors";
import { View, Image } from 'react-native';


const FormInputCheck = ({ value, error }) => {
    const correct = require("../../assets/icons/correct.png")
    const cancel = require("../../assets/icons/cancel.png")


    return (
        <View
            style={{
                justifyContent: 'center'
            }}
        >
            <Image
                source={(value == "" || (value != "" && error == "") ? correct : cancel)}
                style={{
                    height: 20,
                    width: 20,
                    tintColor: (value == "") ? colors.gray: (value 
                    != "" && error == "") ? colors.green: colors.red
                }}
            />
        </View>
    )
}
export default FormInputCheck;
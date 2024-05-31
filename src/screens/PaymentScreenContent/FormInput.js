import React from "react";
import { View, Text, TextInput } from "react-native";
import { colors } from "../../assets/colors/colors";

const FormInput = ({
    containerStyle,
    inputContainerStyle,
    label,
    placeholder,
    inputStyle,
    value = "",
    prependComponent,
    appendComponent,
    onChange,
    secureTextEntry,
    keyboardType = "default",
    autoCompleteType = "off",
    autoCapitalize = "none",
    errorMsg = "",
    maxLength
}) => {
    return (
        <View style={{ ...containerStyle }}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}
            >
                <Text style={{ color: colors.gray }}>
                    {label}
                </Text>
                <Text style={{ color: colors.red }}>
                    {errorMsg}
                </Text>
            </View>

            <View
                style={{
                    flexDirection: 'row',
                    height: 55,
                    paddingHorizontal: 5,
                    marginTop: 10,
                    borderRadius: 2,
                    backgroundColor: colors.lightGray,
                    ...inputContainerStyle
                }}
            >
                {prependComponent}

                <TextInput
                    style={{ flex: 1, ...inputStyle }}
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor={colors.gray}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    autoCompleteType={autoCompleteType}
                    autoCapitalize={autoCapitalize}
                    maxLength={maxLength}
                    onChangeText={onChange}
                />

                {appendComponent}
            </View>
        </View>
    );
};

export default FormInput;

import React, { ReactNode, useState } from 'react';
import {
    KeyboardTypeOptions,
    StyleProp,
    TextInput,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { colors } from '../constants/colors';
import { globalStyles } from '../styles/globalStyles';
import RowComponent from './RowComponent';

interface Props {
    value: string;
    onChange: (val: string) => void;
    keyboardType?: KeyboardTypeOptions
    placeholder?: string;
    placeholderTextColor?: string;
    prefix?: ReactNode;
    affix?: ReactNode;
    allowClear?: boolean;
    multible?: boolean;
    numberOfLine?: number;
    isPassword?: boolean;
    styles?: StyleProp<ViewStyle>;
    textStyles?: StyleProp<TextStyle>;
    color?: string;
    editable?: boolean
}

const InputComponent = (props: Props) => {
    const {
        color,
        value,
        onChange,
        keyboardType,
        placeholder,
        placeholderTextColor,
        prefix,
        affix,
        allowClear,
        multible,
        numberOfLine,
        isPassword,
        styles,
        textStyles,
        editable
    } = props;
    const [showPass, setShowPass] = useState(false);

    return (
        <View style={[{ marginBottom: 16 }, styles]}>
            <RowComponent
                styles={[
                    globalStyles.inputContainer,
                    {
                        minHeight: multible && numberOfLine ? 32 * numberOfLine : 32,
                        alignItems: multible ? 'flex-start' : 'center',
                        backgroundColor: color ?? colors.gray,
                    },
                ]}
            >
                {prefix && prefix}
                <View
                    style={{
                        flex: 1,
                        paddingLeft: prefix ? 16 : 0,
                        paddingRight: affix ? 16 : 0,
                    }}
                >
                    <TextInput
                        style={[
                            globalStyles.text,
                            { margin: 0, padding: 0, paddingVertical: 0 },
                            textStyles,
                        ]}
                        placeholder={placeholder ?? ''}
                        placeholderTextColor={placeholderTextColor ?? '#676767'}
                        value={value}
                        onChangeText={val => onChange(val)}
                        multiline={multible}
                        numberOfLines={numberOfLine}
                        secureTextEntry={isPassword ? !showPass : false}
                        autoCapitalize="none"
                        editable={editable ?? true}
                        keyboardType={keyboardType ?? 'default'}
                    />
                </View>
                {affix && affix}
                {allowClear && value && (
                    <TouchableOpacity onPress={() => onChange('')}>
                        <AntDesign name="close" size={20} color={colors.text} />
                    </TouchableOpacity>
                )}
                {isPassword && (
                    <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                        {showPass ? (
                            <Feather name="eye" size={20} color={colors.text} />
                        ) : (
                            <Feather name="eye-off" size={20} color={colors.text} />
                        )}
                    </TouchableOpacity>
                )}
            </RowComponent>
        </View>
    );
};

export default InputComponent;
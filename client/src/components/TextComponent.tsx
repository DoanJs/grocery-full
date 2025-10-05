import React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';
import { colors } from '../constants/colors';
import { fontFamillies } from '../constants/fontFamilies';
import { sizes } from '../constants/sizes';

interface Props {
    text: string;
    size?: number;
    font?: string;
    flex?: number;
    numberOfLine?: number;
    color?: string;
    type?: 'bigTitle' | 'title' | 'smallTitle' | 'thinTitle' | 'bigText' | 'text' | 'smallText';
    styles?: StyleProp<TextStyle>;
}

const TextComponent = (props: Props) => {
    const { text, size, font, color, flex, styles, numberOfLine, type } = props;
    let fontSize: number = sizes.text;
    let fontFamily: string = fontFamillies.poppinsRegular;

    switch (type) {
        case 'bigTitle':
            fontSize = sizes.bigTitle;
            break;
        case 'title':
            fontSize = sizes.title;
            break;
        case 'smallTitle':
            fontSize = sizes.smallTitle;
            break;
        case 'thinTitle':
            fontSize = sizes.thinTitle;
            break;
        case 'bigText':
            fontSize = sizes.bigText;
            break;
        case 'smallText':
            fontSize = sizes.smallText;
            break;
        default:
            fontSize = sizes.text;
            fontFamily = fontFamillies.poppinsRegular;
            break;
    }

    return (
        <Text numberOfLines={numberOfLine} style={[{
            flex: flex,
            fontFamily: font ?? fontFamily,
            fontSize: size ?? fontSize,
            color: color ?? colors.text2,
        }, styles]}>
            {text}
        </Text>
    );
};

export default TextComponent;
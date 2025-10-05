import React from 'react'
import { View } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import { SpaceComponent, TextComponent } from '.'
import { colors } from '../constants/colors'
import { fontFamillies } from '../constants/fontFamilies'
import { sizes } from '../constants/sizes'

interface Props {
    status: string,
    title: string
    description: string
    index: number
}

const ProgressShippingComponent = (props: Props) => {
    const { status, title, description, index } = props
    return (
        <>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <View style={{
                    backgroundColor: status !== 'waiting' ? colors.primary : colors.background,
                    height: 50,
                    width: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 100
                }}>

                    {
                        status === 'success'
                            ? <Entypo name='check' size={24} color={colors.background} />
                            : <TextComponent text={title}
                                font={fontFamillies.poppinsMedium}
                                size={sizes.bigText}
                                color={status === 'waiting' ? colors.text : colors.background}
                            />
                    }
                </View>
                <SpaceComponent height={8} />
                <TextComponent text={description}
                    font={fontFamillies.poppinsMedium}
                    size={sizes.smallText}
                    color={colors.text}
                />
            </View>

            {
                index < 2 &&
                <View style={{
                    height: 1,
                    flex: 1,
                    top: -12,
                    backgroundColor: status === 'success' ? colors.primary : colors.border
                }} />

            }

        </>
    )
}

export default ProgressShippingComponent
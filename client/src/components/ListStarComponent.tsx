import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { RowComponent } from '.';
import { colors } from '../constants/colors';

interface Props {
    star: number
    colorSelectd?: string
    colorEmpty?: string
}

const ListStarComponent = (props: Props) => {
    const { star, colorEmpty, colorSelectd } = props
    return (
        <RowComponent
            styles={{
                marginHorizontal: 6,
            }}
        >
            {
                Array.from({ length: Math.floor(star) }).map((_, index) =>
                    <FontAwesome
                        name='star' size={20}
                        color={colorSelectd ?? colors.star} key={index}
                        style={{
                            marginHorizontal: 2
                        }}
                    />)
            }
            {
                star - Math.floor(star) > 0 &&
                <FontAwesome
                    name='star-half-empty' size={20}
                    color={colorSelectd ?? colors.star}
                    style={{
                        marginHorizontal: 2
                    }}
                />
            }
            {
                Array.from({
                    length: 5 - Math.floor(star) - (star - Math.floor(star) > 0 ? 1 : 0)
                }).map((_, index) =>
                    <FontAwesome
                        name='star' size={20}
                        color={colorEmpty ?? colors.background} key={index}
                        style={{
                            marginHorizontal: 2
                        }}
                    />)
            }
        </RowComponent>
    )
}

export default ListStarComponent
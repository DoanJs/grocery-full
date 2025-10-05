import moment from 'moment';
import React from 'react';
import { Image, View } from 'react-native';
import {
  ListStarComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '.';
import { colors } from '../constants/colors';
import { fontFamillies } from '../constants/fontFamilies';
import { sizes } from '../constants/sizes';

interface Props {
  user: any;
  comment: any;
}

const ReviewItemComponent = (props: Props) => {
  const { user, comment } = props;

  return (
    <SectionComponent
      styles={{
        backgroundColor: colors.background,
        paddingVertical: 20,
      }}
    >
      <RowComponent>
        <Image
          source={{ uri: user?.url }}
          style={{
            height: 60,
            width: 60,
            resizeMode: 'cover',
            borderRadius: 100,
          }}
        />
        <SpaceComponent width={10} />
        <View>
          <TextComponent
            text={user?.name}
            font={fontFamillies.poppinsSemiBold}
            size={sizes.bigText}
          />
          <TextComponent
            text={
              comment.createdAt
                ? (moment(comment.createdAt.toDate()).format(
                    'DD/MM/YYYY HH:mm:ss',
                  ) as string)
                : ''
            }
            font={fontFamillies.poppinsMedium}
            size={sizes.smallText}
            color={colors.text}
          />
        </View>
      </RowComponent>
      <SpaceComponent height={16} />
      <View
        style={{
          width: '100%',
          height: 1,
          backgroundColor: colors.border,
        }}
      />
      <SpaceComponent height={16} />

      <RowComponent
        styles={{
          alignItems: 'baseline',
        }}
      >
        <TextComponent
          text={`${comment.star}`}
          font={fontFamillies.poppinsMedium}
        />
        <SpaceComponent width={4} />
        <ListStarComponent
          star={comment.star}
          colorEmpty={colors.background1}
        />
      </RowComponent>
      <TextComponent text={comment.text} color={colors.text} />
    </SectionComponent>
  );
};

export default ReviewItemComponent;

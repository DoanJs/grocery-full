import { serverTimestamp } from '@react-native-firebase/firestore';
import React, { useState } from 'react';
import { View } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { auth } from '../../../firebase.config';
import {
  BtnShadowLinearComponent,
  Container,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import { addDocData } from '../../constants/addDocData';
import { colors } from '../../constants/colors';
import { fontFamillies } from '../../constants/fontFamilies';
import { sizes } from '../../constants/sizes';
import useCommentStore from '../../zustand/store/useCommentStore';

const WriteReviewScreen = ({ navigation, route }: any) => {
  const { productId } = route.params;
  const user = auth.currentUser;
  const [text, setText] = useState('');
  const [star, setStar] = useState(4);
  const { addComment } = useCommentStore();

  const handleWriteReview = () => {
    addDocData({
      nameCollect: 'comments',
      value: {
        productId,
        userId: user?.uid,
        star: star + 1,
        text,
        createdAt: serverTimestamp(),
        updateAt: serverTimestamp(),
      },
    }).then(result =>
      addComment({
        id: result.id,
        productId,
        userId: user?.uid as string,
        star: star + 1,
        text,
      }),
    );

    navigation.goBack();
  };
  return (
    <Container bg={colors.background} back title="Write Reviews">
      <View
        style={{
          backgroundColor: colors.background1,
          paddingVertical: 20,
          flex: 1,
        }}
      >
        <SectionComponent
          styles={{
            flex: 1,
          }}
        >
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TextComponent
              text="What do you think ?"
              font={fontFamillies.poppinsSemiBold}
              size={sizes.smallTitle}
            />
            <SpaceComponent height={10} />
            <TextComponent
              text="please give your rating by clicking on the stars below"
              font={fontFamillies.poppinsMedium}
              size={sizes.bigText}
              color={colors.text}
              styles={{ width: '75%', textAlign: 'center' }}
            />
            <SpaceComponent height={10} />
            <RowComponent>
              {Array.from({ length: 5 }).map((_, index) => (
                <FontAwesome
                  key={index}
                  onPress={() => setStar(index)}
                  name="star"
                  size={36}
                  color={index <= star ? colors.star : colors.background}
                  style={{
                    marginHorizontal: 4,
                  }}
                />
              ))}
            </RowComponent>
          </View>

          <SectionComponent
            styles={{
              backgroundColor: colors.background,
              marginTop: 20,
              flex: 1,
              marginBottom: 0,
            }}
          >
            <InputComponent
              styles={{
                backgroundColor: colors.background,
                paddingVertical: 12,
                borderRadius: 5,
              }}
              allowClear
              prefix={<EvilIcons name="pencil" color={colors.text} size={26} />}
              placeholder="Tell us about your experience"
              placeholderTextColor={colors.text}
              color={colors.background}
              value={text}
              onChange={val => setText(val)}
              multible
              numberOfLine={10}
            />
          </SectionComponent>
        </SectionComponent>
        <SectionComponent>
          <BtnShadowLinearComponent
            onPress={handleWriteReview}
            title="Start shopping"
          />
        </SectionComponent>
      </View>
    </Container>
  );
};

export default WriteReviewScreen;

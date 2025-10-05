import { serverTimestamp, where } from '@react-native-firebase/firestore';
import { AddCircle } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import {
  BtnShadowLinearComponent,
  CardItemComponent,
  Container,
  LoadingComponent,
  SectionComponent,
} from '../../components';
import { colors } from '../../constants/colors';
import { getDocsData } from '../../constants/getDocsData';
import { setDocData } from '../../constants/setDocData';
import useCardStore from '../../zustand/store/useCardStore';
import useUserStore from '../../zustand/store/useUserStore';

const MyCardScreen = ({ navigation }: any) => {
  const { user } = useUserStore();
  const [makeDefault, setMakeDefault] = useState('');
  const { cards, editCard, setCards } = useCardStore();
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    if (user) {
      getDocsData({
        nameCollect: 'cards',
        setData: setCards,
        condition: [where('userId', '==', user.id)],
      });
    }
  }, [user]);

  useEffect(() => {
    if (cards.length > 0) {
      cards.map(_ => {
        _.default && setMakeDefault(_.id);
      });
    }
  }, [cards]);

  useEffect(() => {
    if (cards.length > 0) {
      const index = cards.findIndex(_ => _.default);
      if (['', cards[index].id].includes(makeDefault)) {
        setDisable(true);
      } else {
        setDisable(false);
      }
    }
  }, [makeDefault]);

  const handleChangeCard = () => {
    const index = cards.findIndex(_ => _.default);
    const indexDefault = cards.findIndex(_ => _.id === makeDefault);

    editCard(cards[index].id, { ...cards[index], default: false });
    editCard(makeDefault, { ...cards[indexDefault], default: true });

    setDocData({
      nameCollect: 'cards',
      id: cards[index].id,
      valueUpdate: { default: false, updateAt: serverTimestamp() },
    });
    setDocData({
      nameCollect: 'cards',
      id: makeDefault,
      valueUpdate: { default: true, updateAt: serverTimestamp() },
    });

    setDisable(true);
  };

  return cards ? (
    <Container
      bg={colors.background}
      back
      title="My Cards"
      right={
        <AddCircle
          size={26}
          color={colors.text2}
          onPress={() => navigation.navigate('AddCardScreen')}
        />
      }
    >
      <View
        style={{
          backgroundColor: colors.background1,
          flex: 1,
          paddingVertical: 20,
        }}
      >
        <SectionComponent styles={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {cards.map((_, index) => (
              <CardItemComponent
                key={index}
                card={_}
                value={makeDefault}
                onPress={(val: string) => setMakeDefault(val)}
              />
            ))}
          </ScrollView>
        </SectionComponent>

        <SectionComponent>
          <BtnShadowLinearComponent
            disable={disable}
            onPress={handleChangeCard}
            title="Save settings"
          />
        </SectionComponent>
      </View>
    </Container>
  ) : (
    <LoadingComponent size={30} />
  );
};

export default MyCardScreen;

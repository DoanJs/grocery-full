import { serverTimestamp, where } from '@react-native-firebase/firestore';
import { Camera, SearchNormal1, Setting5 } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import {
  Container,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import { addDocData } from '../../constants/addDocData';
import { colors } from '../../constants/colors';
import { deleteDocData } from '../../constants/deleteDocData';
import { fontFamillies } from '../../constants/fontFamilies';
import { getDocsData } from '../../constants/getDocsData';
import { setDocData } from '../../constants/setDocData';
import { sizes } from '../../constants/sizes';
import { HistoryModel } from '../../models/HistoryModel';
import useHistoryStore from '../../zustand/store/useHistoryStore';
import useUserStore from '../../zustand/store/useUserStore';
const data = [
  'Fresh Grocery',
  'Bananas',
  'cheetos',
  'vegetables',
  'Fruits',
  'discounted items',
  'Fresh vegetables',
];

const SearchScreen = ({ navigation }: any) => {
  const { user } = useUserStore();
  const [initialMore, setInitialMore] = useState(data);
  const [keySearch, setKeySearch] = useState('');
  const { histories, addHistory,
    setHistories, clearHistories } = useHistoryStore();

  useEffect(() => {
    if (user) {
      getDocsData({
        nameCollect: 'histories',
        condition: [where('userId', '==', user.id)],
        setData: setHistories,
      });
    }
  }, [user]);

  const handleSearch = (search: string) => {
    if (search !== '') {

      const index = histories.findIndex((history: HistoryModel) => history.search === search)
      if (index !== -1) {
        setDocData({
          nameCollect: 'histories',
          id: histories[index].id,
          valueUpdate: { updateAt: serverTimestamp() }
        })
      } else {
        addDocData({
          nameCollect: 'histories',
          value: {
            userId: user?.id,
            search: search,
            createAt: serverTimestamp(),
            updateAt: serverTimestamp(),
          },
        }).then(result =>
          addHistory({
            id: result.id,
            userId: user?.id as string,
            search: search,
          }),
        );
      }

    }

    navigation.navigate('Main', {
      screen: 'Home',
      params: {
        screen: 'HomeScreen',
        params: {
          valueSearch: {
            search: search,
          },
        },
      },
    });
    setKeySearch('');
  };

  const handleClearHistory = async () => {
    clearHistories();

    const promiseItems = histories.map((history: HistoryModel) =>
      deleteDocData({
        nameCollect: 'histories',
        id: history.id,
      }),
    );

    await Promise.all(promiseItems);
  };

  return (
    <Container
      bg={colors.background}
      back
      center={
        <InputComponent
          styles={{
            backgroundColor: colors.background1,
            paddingVertical: 12,
            paddingHorizontal: 26,
            borderRadius: 5,
            flex: 1,
            marginLeft: 10,
            top: 8,
          }}
          prefix={
            <SearchNormal1
              color={colors.text}
              size={26}
              onPress={() => handleSearch(keySearch)}
            />
          }
          color={colors.background1}
          affix={
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('FilterScreen', {
                  valueCondition: {
                    min: 0,
                    max: 0,
                    starSelected: -1,
                  },
                })
              }
            >
              <Setting5 size={26} color={colors.text} />
            </TouchableOpacity>
          }
          value={keySearch}
          placeholder="Search keywords..."
          placeholderTextColor={colors.text}
          textStyles={{
            color: colors.text,
          }}
          onChange={val => setKeySearch(val)}
        />
      }
    >
      <View
        style={{
          backgroundColor: colors.background1,
          flex: 1,
        }}
      >
        <SectionComponent
          styles={{
            flex: 1,
            paddingVertical: 16,
          }}
        >
          <RowComponent justify="space-between">
            <TextComponent
              text="Search History"
              size={sizes.thinTitle}
              font={fontFamillies.poppinsSemiBold}
            />
            <TouchableOpacity onPress={handleClearHistory}>
              <TextComponent
                text="clear"
                font={fontFamillies.poppinsMedium}
                color={colors.blue}
              />
            </TouchableOpacity>
          </RowComponent>
          <RowComponent
            styles={{
              flexWrap: 'wrap',
            }}
          >
            <TouchableOpacity
              onPress={() => handleSearch('')}
              style={{
                backgroundColor: colors.background,
                padding: 8,
                borderRadius: 5,
                marginRight: 10,
                marginBottom: 10,
              }}>
              <TextComponent
                text={'All'}
                font={fontFamillies.poppinsMedium}
                size={sizes.smallText}
                color={colors.text}
              />
            </TouchableOpacity>
            {histories.sort((a, b) =>
              (b.updateAt?._seconds as number) - (a.updateAt?._seconds as number)).map((_, index) => (
                <TouchableOpacity
                  onPress={() => handleSearch(_.search)}
                  key={index}
                  style={{
                    backgroundColor: colors.background,
                    padding: 8,
                    borderRadius: 5,
                    marginRight: 10,
                    marginBottom: 10,
                  }}
                >
                  <TextComponent
                    text={_.search}
                    font={fontFamillies.poppinsMedium}
                    size={sizes.smallText}
                    color={colors.text}
                  />
                </TouchableOpacity>
              ))}
          </RowComponent>

          <SpaceComponent height={20} />

          <RowComponent justify="space-between">
            <TextComponent
              text="Discover more"
              size={sizes.thinTitle}
              font={fontFamillies.poppinsSemiBold}
            />
            <TouchableOpacity onPress={() => setInitialMore([])}>
              <TextComponent
                text="clear"
                font={fontFamillies.poppinsMedium}
                color={colors.blue}
              />
            </TouchableOpacity>
          </RowComponent>
          <RowComponent
            styles={{
              flexWrap: 'wrap',
            }}
          >
            {initialMore.map((_, index) => (
              <TouchableOpacity
                onPress={() => handleSearch(_)}
                key={index}
                style={{
                  backgroundColor: colors.background,
                  padding: 8,
                  borderRadius: 5,
                  marginRight: 10,
                  marginBottom: 10,
                }}
              >
                <TextComponent
                  text={_}
                  font={fontFamillies.poppinsMedium}
                  size={sizes.smallText}
                  color={colors.text}
                />
              </TouchableOpacity>
            ))}
          </RowComponent>
        </SectionComponent>

        <SectionComponent>
          <RowComponent justify="space-between">
            <RowComponent
              onPress={() => { }}
              justify="space-between"
              styles={{
                backgroundColor: colors.background,
                paddingVertical: 24,
                paddingHorizontal: 30,
              }}
            >
              <Camera size={24} color={colors.text} />
              <SpaceComponent width={16} />
              <TextComponent
                text="Image Search"
                font={fontFamillies.poppinsMedium}
                color={colors.text}
              />
            </RowComponent>

            <RowComponent
              onPress={() => { }}
              justify="space-between"
              styles={{
                backgroundColor: colors.background,
                paddingVertical: 24,
                paddingHorizontal: 30,
              }}
            >
              <Camera size={24} color={colors.text} />
              <SpaceComponent width={16} />
              <TextComponent
                text="Voice Search"
                font={fontFamillies.poppinsMedium}
                color={colors.text}
              />
            </RowComponent>
          </RowComponent>
        </SectionComponent>
      </View>
    </Container>
  );
};

export default SearchScreen;

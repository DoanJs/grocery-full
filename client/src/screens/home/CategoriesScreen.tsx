import { Setting5 } from 'iconsax-react-native';
import React from 'react';
import { View } from 'react-native';
import {
  CategoryItem,
  Container,
  RowComponent,
  SectionComponent,
} from '../../components';
import { categories } from '../../constants/categories';
import { colors } from '../../constants/colors';

const CategoriesScreen = ({ navigation }: any) => {
  return (
    <Container
      back
      bg={colors.background}
      title="Categories"
      right={<Setting5 onPress={() => {}} size={24} color={colors.text2} />}
    >
      <View
        style={{
          backgroundColor: colors.background1,
          flex: 1,
        }}
      >
        <SectionComponent
          styles={{
            paddingVertical: 20,
          }}
        >
          <RowComponent
            styles={{
              flexWrap: 'wrap',
            }}
          >
            {categories.map((_, index) => (
              <CategoryItem
                onPress={() => navigation.navigate('CategoryProductScreen', {
                  category: _.name
                })}
                key={index}
                bg={_.color}
                uri={_.url}
                text={_.name}
                styles={{
                  backgroundColor: colors.background,
                  width: '30%',
                  paddingVertical: 16,
                  borderRadius: 5,
                  marginBottom: 16,
                }}
                imgStyles={{
                  paddingVertical: 20,
                  paddingHorizontal: 20,
                }}
              />
            ))}
          </RowComponent>
        </SectionComponent>
      </View>
    </Container>
  );
};

export default CategoriesScreen;

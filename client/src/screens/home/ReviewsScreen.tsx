import { AddCircle } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import {
  Container,
  ReviewItemComponent,
  SectionComponent,
} from '../../components';
import { colors } from '../../constants/colors';
import { getDocsData } from '../../constants/getDocsData';
import { CommentModel } from '../../models/CommentModel';
import { UserModel } from '../../models/UserModel';

const ReviewsScreen = ({ navigation, route }: any) => {
  const { productId } = route.params;
  const [comments, setComments] = useState<CommentModel[]>([]);
  const [users, setUsers] = useState<UserModel[]>([]);
  const [cmtUsers, setCmtUsers] = useState<any[]>([]);

  useEffect(() => {
    if (productId) {
      getDocsData({
        nameCollect: 'users',
        setData: setUsers,
      });
      getDocsData({
        nameCollect: 'comments',
        setData: setComments,
      });
    }
  }, [productId]);

  useEffect(() => {
    if (comments && users) {
      let items: any[] = [];

      comments.map((comment: any) => {
        const index = users.findIndex(user => user.id === comment.userId);

        items.push({
          comment,
          user: users[index],
        });
      });

      setCmtUsers(items);
    }
  }, [comments, users]);

  return (
    <Container
      bg={colors.background}
      back
      title="Reviews"
      right={
        <AddCircle
          size={24}
          color={colors.text2}
          onPress={() =>
            navigation.navigate('WriteReviewScreen', {
              productId,
            })
          }
        />
      }
    >
      <SectionComponent
        styles={{
          flex: 1,
          backgroundColor: colors.background1,
          paddingVertical: 20,
          marginBottom: 0,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {cmtUsers.length > 0 &&
            cmtUsers.map((_: any, index: number) => (
              <ReviewItemComponent
                key={index}
                user={_.user}
                comment={_.comment}
              />
            ))}
        </ScrollView>
      </SectionComponent>
    </Container>
  );
};

export default ReviewsScreen;

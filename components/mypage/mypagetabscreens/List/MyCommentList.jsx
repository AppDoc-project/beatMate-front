import { useFocusEffect } from '@react-navigation/native';
import { getUserCommentPost } from 'api/mypage';
// import format from 'pretty-format';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { styled } from 'styled-components/native';

import MyCommentListItem from '../ListItem/MyCommentListItem';

function MyCommentList() {
  //나의 게시물 API
  const [myCommentData, setmyCommentData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      getUserCommentPost()
        .then((res) => {
          // console.log(format(res.data));
          setmyCommentData(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsError(true);
          setIsLoading(false);
        });
    }, []),
  );

  if (isLoading) {
    return (
      <View>
        <Text>로딩중...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View>
        <Text>에러 발생</Text>
      </View>
    );
  }

  return (
    <Container>
      <MyPostingListScrollView>
        {myCommentData &&
          myCommentData.data.map((myCommentPost) => (
            <MyCommentListItem key={myCommentPost.id} myCommentPost={myCommentPost} />
          ))}
      </MyPostingListScrollView>
    </Container>
  );
}

const Container = styled.View``;

const MyPostingListScrollView = styled.ScrollView`
  flex-grow: 1;
`;

export default MyCommentList;

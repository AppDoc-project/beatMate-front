import { useFocusEffect } from '@react-navigation/native';
import { getUserBookmarkPost } from 'api/mypage';
// import format from 'pretty-format';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { styled } from 'styled-components/native';

import MyBookmarkListItem from '../ListItem/MyBookmarkListItem';

function MyBookmarkList() {
  //나의 북마크 API
  const [myBookmarkData, setmyBookmarkData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      getUserBookmarkPost()
        .then((res) => {
          // console.log(format(res.data));
          setmyBookmarkData(res.data);
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
        {myBookmarkData &&
          myBookmarkData.data.map((myBookmark) => <MyBookmarkListItem key={myBookmark.id} myBookmark={myBookmark} />)}
      </MyPostingListScrollView>
    </Container>
  );
}

const Container = styled.View``;

const MyPostingListScrollView = styled.ScrollView`
  flex-grow: 1;
`;

export default MyBookmarkList;

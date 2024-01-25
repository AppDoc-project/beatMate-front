import { useFocusEffect } from '@react-navigation/native';
import { getUserWritePost } from 'api/mypage';
// import format from 'pretty-format';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { styled } from 'styled-components/native';

import MyPostListItem from '../ListItem/MyPostListItem';

function MyPostList() {
  //나의 게시물 API
  const [myPostDatas, setmyPostData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      getUserWritePost()
        .then((res) => {
          // console.log(format(res.data));
          setmyPostData(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsError(true);
          setIsLoading(false);
        });
    }, []),
  );

  useEffect(() => {
    console.log(myPostDatas);
  }, [myPostDatas]);

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
        {myPostDatas &&
          myPostDatas.data.map((myPostData) => <MyPostListItem key={myPostData.id} myPostData={myPostData} />)}
      </MyPostingListScrollView>
    </Container>
  );
}

const Container = styled.View``;

const MyPostingListScrollView = styled.ScrollView`
  flex-grow: 1;
`;

export default MyPostList;

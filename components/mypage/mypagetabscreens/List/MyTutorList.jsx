import { useFocusEffect } from '@react-navigation/native';
import { getLikedTutor } from 'api/mypage';
import format from 'pretty-format';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { styled } from 'styled-components/native';

import MyTutorListItem from '../ListItem/MyTutorListitem';

function MyTutorList() {
  //내가 찜한 튜터 API
  const [myTutorDatas, setmyTutorData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      getLikedTutor()
        .then((res) => {
          console.log(format(res.data));
          setmyTutorData(res.data);
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
        {myTutorDatas &&
          myTutorDatas.data.map((myTutorData) => <MyTutorListItem key={myTutorData.id} myTutorData={myTutorData} />)}
      </MyPostingListScrollView>
    </Container>
  );
}

const Container = styled.View`
  height: ${hp(55)}px;
`;

const MyPostingListScrollView = styled.ScrollView`
  flex-grow: 1;
`;

export default MyTutorList;

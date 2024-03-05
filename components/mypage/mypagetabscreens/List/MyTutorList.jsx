import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getLikedTutor } from 'api/mypage';
import format from 'pretty-format';
import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { styled } from 'styled-components/native';

import MyTutorListItem from '../ListItem/MyTutorListitem';

function MyTutorList() {
  const navigation = useNavigation();

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
        .catch((error) => {
          if (error.response && error.response.data.code === 408) {
            Alert.alert('알림', '로그인을 해주세요.');
            navigation.navigate('homeScreen');
          } else if (error.response && error.response.data.code === 500) {
            Alert.alert('알림', '서버에러가 발생했습니다. 잠시 후 다시 시도해 주세요.');
          } else {
            console.log('찜한 튜터 가져오기 실패', error);
            setIsError(true);
          }
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

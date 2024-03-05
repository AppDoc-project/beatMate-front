import ReserveListItem from '@components/reservation/ReserveListItem';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getReserveList } from 'api/reservation';
import format from 'pretty-format';
import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styled from 'styled-components';

function ReserveMainScreen(props) {
  const navigation = useNavigation();

  //예약 리스트 가져오기 API
  const [myReserveDatas, setmyReserveData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      getReserveList()
        .then((res) => {
          console.log(format(res.data));
          setmyReserveData(res.data);
          setIsLoading(false);
        })
        .catch((error) => {
          if (error.response && error.response.data.code === 408) {
            Alert.alert('알림', '로그인을 해주세요.');
            navigation.navigate('homeScreen');
          } else if (error.response && error.response.data.code === 500) {
            Alert.alert('알림', '서버에러가 발생했습니다. 잠시 후 다시 시도해 주세요.');
          } else {
            console.log('예약 리스트 가져오기 실패', error);
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
      <MainWrapper>
        <MyPostingListScrollView>
          {myReserveDatas &&
            myReserveDatas.data.map((myReserveData) => (
              <ReserveListItem key={myReserveData.id} myReserveData={myReserveData} />
            ))}
        </MyPostingListScrollView>
      </MainWrapper>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const MainWrapper = styled.View`
  height: ${hp(78)}px;
`;

const MyPostingListScrollView = styled.ScrollView`
  flex-grow: 1;
`;

export default ReserveMainScreen;

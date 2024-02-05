import ReserveListItem from '@components/reservation/ReserveListItem';
import { useFocusEffect } from '@react-navigation/native';
import { getReserveList } from 'api/reservation';
import format from 'pretty-format';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styled from 'styled-components';

function ReserveMainScreen(props) {
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
  height: ${hp(75)}px;
`;

const MyPostingListScrollView = styled.ScrollView`
  flex-grow: 1;
`;

export default ReserveMainScreen;

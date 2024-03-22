import ReserveListItem from '@components/reservation/ReserveListItem';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getReserveList } from 'api/reservation';
import { COLORS } from 'colors';
import format from 'pretty-format';
import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
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
          console.log('예약 리스트 가져오기', format(res.data));
          setmyReserveData(res.data);
          console.log('예약', myReserveDatas);
          setIsLoading(false);
        })
        .catch((error) => {
          if (error.response && error.response.data.code === 500) {
            Alert.alert('알림', '서버에러가 발생했습니다. 잠시 후 다시 시도해 주세요.');
          } else {
            console.log('예약 리스트 가져오기 실패', error);
            Alert.alert('알림', '네트워크 연결을 확인해주세요.');
            navigation.navigate('homeScreen');
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
          {myReserveDatas && myReserveDatas.data && myReserveDatas.data.length > 0 ? (
            myReserveDatas.data.map((data) => <ReserveListItem key={data.id} myReserveData={data} />)
          ) : (
            <SubWrapper>
              <NoDataText>예약된 레슨이 없습니다.</NoDataText>
            </SubWrapper>
          )}
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

const SubWrapper = styled.View`
  align-items: center;
  justify-content: center;
`;

const NoDataText = styled.Text`
  font-size: ${RFValue(18)}px;
  font-weight: bold;
  margin-top: ${hp(37)}px;
  color: ${COLORS.main};
`;

export default ReserveMainScreen;

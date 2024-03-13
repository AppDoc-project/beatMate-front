import { ReserveBtn } from '@assets/Icons/Buttons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { makeReserve } from 'api/reservation';
import { COLORS } from 'colors';
import format from 'pretty-format';
import React, { useState } from 'react';
import { Alert, SafeAreaView, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styled from 'styled-components';

function ReservationFormScreen() {
  const route = useRoute();
  const { tuteeId } = route.params;

  const navigation = useNavigation();

  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [lessonType, setLessonType] = useState('');
  const [memo, setMemo] = useState('');

  const onChangeYear = (text) => setYear(text);
  const onChangeMonth = (text) => setMonth(text);
  const onChangeDay = (text) => setDay(text);

  const onChangeStartTime = (text) => setStartTime(text);
  const onChangeEndTime = (text) => setEndTime(text);
  const onChangeMemo = (text) => setMemo(text);

  const [isOnline, setIsOnline] = useState(false);
  const [isOffline, setisOffline] = useState(false);

  const onPressAlertBtn = () => {
    if (!(year?.length === 4 && month?.length === 2 && day?.length === 2)) {
      Alert.alert('알림', '날짜를 모두 예시의 형식과 같이 작성해주세요.');
    }
  };

  // 예약 생성하기 api
  const onPressReserveBtn = () => {
    const date = year + ':' + month + ':' + day;
    const data = {
      tuteeId: tuteeId,
      lessonType: lessonType,
      date: date,
      startTime: startTime,
      endTime: endTime,
      memo: memo,
    };

    console.log(data);

    makeReserve(data)
      .then((res) => {
        const { data } = res;
        console.log('예약 생성하기', format(data));
        navigation.navigate('reservation');
      })
      .catch((error) => {
        if (error.response && error.response.data.code === 410) {
          Alert.alert('알림', '강사 또는 해당 수강생의 겹치는 예약이 존재합니다.');
        } else if (error.response && error.response.data.code === 412) {
          Alert.alert('알림', '탈퇴한 수강생입니다.');
        } else if (error.response && error.response.data.code === 400) {
          Alert.alert('알림', '유효한 시간대를 입력해주세요.');
        } else if (error.response && error.response.data.code === 408) {
          Alert.alert('알림', '로그인을 해주세요.');
          navigation.navigate('homeScreen');
        } else if (error.response && error.response.data.code === 500) {
          Alert.alert('알림', '서버에러가 발생했습니다. 잠시 후 다시 시도해 주세요.');
        } else {
          console.log('예약 생성하기', format(error.response));
          Alert.alert('알림', '네트워크 연결을 확인해주세요.');
          navigation.navigate('homeScreen');
        }
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Container>
        <MainInfoTxt1>강사님,</MainInfoTxt1>
        <MainInfoTxt2>
          <Text style={{ color: 'navy' }}>예약 정보</Text>를 입력해주세요!
        </MainInfoTxt2>
        <TxtWrapper>
          <SubTitleTxt>
            ※ <Text style={{ color: COLORS.black, fontWeight: 'bold' }}>필수 항목들</Text>은 모두 입력해주세요.
          </SubTitleTxt>
          <SubTitleTxt>
            ※ 반드시 모든 문항은 <Text style={{ color: COLORS.black, fontWeight: 'bold' }}>예시와 같은 형식</Text>으로
            작성해주세요.
          </SubTitleTxt>
          <SubTitleTxt>
            ※ 예시와 다르게 작성하신 경우, 예약 신청이{' '}
            <Text style={{ color: COLORS.black, fontWeight: 'bold' }}>거절</Text>될 수 있습니다.
          </SubTitleTxt>
          <SubTitleTxt>
            ※ 레슨 진행 날짜는 <Text style={{ color: COLORS.black, fontWeight: 'bold' }}>현재 날짜 또는 이후만</Text>
            설정 가능합니다.
          </SubTitleTxt>
          <SubTitleTxt>
            ※ 레슨 시작 / 종료시간은 반드시 <Text style={{ color: COLORS.black, fontWeight: 'bold' }}>30분 단위</Text>로
            작성해주세요.
          </SubTitleTxt>
          <SubTitleTxt>
            ※ 특이사항 작성은 <Text style={{ color: COLORS.black, fontWeight: 'bold' }}>선택</Text>입니다. (선택)
          </SubTitleTxt>
        </TxtWrapper>

        <Info>
          <Component>
            <Txt>레슨을 진행하실 날짜를 알려주세요.</Txt>
            <SubTxt>예시와 같은 형식으로 작성해주세요. (필수)</SubTxt>
            <SelectOptionWrapper>
              <DateRow>
                <DateInput
                  value={year}
                  onChangeText={onChangeYear}
                  placeholder="2024"
                  placeholderTextColor="lightgray"
                />
                <DateTxt>년</DateTxt>
              </DateRow>
              <DateRow>
                <DateInput
                  value={month}
                  onChangeText={onChangeMonth}
                  placeholder="08"
                  placeholderTextColor="lightgray"
                />
                <DateTxt>월</DateTxt>
              </DateRow>
              <DateRow>
                <DateInput value={day} onChangeText={onChangeDay} placeholder="01" placeholderTextColor="lightgray" />
                <DateTxt>일</DateTxt>
              </DateRow>
            </SelectOptionWrapper>
          </Component>
          <Component>
            <Txt>레슨 시작 시간을 알려주세요.</Txt>
            <SubTxt>예시와 같은 형식으로 작성해주세요. (필수)</SubTxt>
            <Input
              value={startTime}
              onChangeText={onChangeStartTime}
              placeholder="( 예시. 17:30 )"
              placeholderTextColor="lightgray"
            />
          </Component>
          <Component>
            <Txt>레슨 종료 시간을 알려주세요.</Txt>
            <SubTxt>예시와 같은 형식으로 작성해주세요. (필수)</SubTxt>
            <Input
              value={endTime}
              onChangeText={onChangeEndTime}
              placeholder="( 예시. 20:00 )"
              placeholderTextColor="lightgray"
            />
          </Component>
          <Component>
            <Txt>원하는 레슨 방식을 선택해 주세요.</Txt>
            <SelectOptionWrapper>
              <CategoryBtn
                onPress={() => {
                  setIsOnline(true);
                  setisOffline(false);
                  setLessonType('REMOTE');
                }}
                selected={isOnline}
              >
                <CategoryTxt selected={isOnline}>화상</CategoryTxt>
              </CategoryBtn>

              <CategoryBtn
                onPress={() => {
                  setIsOnline(false);
                  setisOffline(true);
                  setLessonType('FACETOFACE');
                }}
                selected={isOffline}
              >
                <CategoryTxt selected={isOffline}>대면</CategoryTxt>
              </CategoryBtn>
            </SelectOptionWrapper>
          </Component>
          <Component>
            <Txt>특이 사항을 입력해주세요.</Txt>
            <SubTxt>작성 내용은 예약 페이지 상에 나타납니다. (선택)</SubTxt>
            <Input value={memo} onChangeText={onChangeMemo} />
          </Component>
        </Info>
        <ReserveBtn
          fontColor={year && month && day && startTime && endTime && lessonType ? 'white' : 'navy'}
          backColor={year && month && day && startTime && endTime && lessonType ? 'navy' : 'white'}
          width={wp(100)}
          marginBottom={hp(6.15)}
          justifyContent="center"
          onPress={() => {
            onPressAlertBtn();
            onPressReserveBtn();
          }}
        />
      </Container>
    </SafeAreaView>
  );
}

const Container = styled(KeyboardAwareScrollView)`
  flex: 1;
  background-color: white;
`;

const MainInfoTxt1 = styled.Text`
  font-size: ${RFValue(22)}px;
  font-weight: bold;
  margin-left: ${wp(4.8)}px;
  margin-top: ${hp(2)}px;
`;

const MainInfoTxt2 = styled.Text`
  font-size: ${RFValue(22)}px;
  font-weight: bold;
  margin-left: ${wp(4.8)}px;
  margin-top: ${RFValue(5)}px;
`;

const SubTitleTxt = styled.Text`
  color: ${COLORS.gray};
  margin-left: ${wp(4.8)}px;
  font-size: ${RFValue(9)}px;
  line-height: ${hp(2)}px;
`;

const SubTxt = styled.Text`
  color: lightgray;
  font-size: ${RFValue(12)}px;
  margin-top: ${hp(1)}px;
`;

const Info = styled.View`
  flex: 1;
`;

const TxtWrapper = styled.View`
  margin-bottom: ${hp(3)}px;
  margin-top: ${hp(1.23)}px;
`;

const Component = styled.View`
  margin-left: ${wp(4.8)}px;
  margin-bottom: ${hp(4)}px;
`;

const Txt = styled.Text`
  font-weight: bold;
  font-size: ${RFValue(14)}px;
`;

const DateRow = styled.View`
  flex-direction: row;
  top: ${hp(1.5)}px;
  justify-content: center;
  align-items: center;
`;

const DateTxt = styled.Text`
  font-weight: bold;
  font-size: ${RFValue(12)}px;
  margin-left: ${wp(2)}px;
`;

const DateInput = styled.TextInput`
  background-color: transparent;
  position: relative;

  width: ${wp(20)}px;
  height: auto;
  border-radius: 8px;
  border-color: lightgray;
  border-width: 1px;

  padding-left: ${RFValue(4)}px;
  font-size: ${RFValue(12)}px;
  font-weight: bold;
  padding: ${RFValue(10)}px;
`;

const Input = styled.TextInput`
  background-color: transparent;
  position: relative;

  top: ${hp(1.5)}px;
  width: ${wp(90.4)}px;
  height: auto;
  border-radius: 8px;
  border-color: lightgray;
  border-width: 1px;

  padding-left: ${RFValue(4)}px;
  font-size: ${RFValue(12)}px;
  font-weight: bold;
  padding: ${RFValue(10)}px;
`;

const SelectOptionWrapper = styled.View`
  width: ${wp(90)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CategoryBtn = styled.TouchableOpacity`
  top: ${hp(1.5)}px;
  width: ${wp(40)}px;
  height: auto;
  border-radius: ${RFValue(8)}px;
  border-color: ${(props) => (props.selected ? COLORS.main : COLORS.lightgray)};
  border-width: ${(props) => (props.selected ? '3px' : '1px')};
  justify-content: center;
  align-items: center;
  padding: ${RFValue(10)}px;
`;

const CategoryTxt = styled.Text`
  color: ${(props) => (props.selected ? COLORS.main : COLORS.lightgray)};
  font-weight: ${(props) => (props.selected ? 'bold' : 'normal')};
`;

export default ReservationFormScreen;

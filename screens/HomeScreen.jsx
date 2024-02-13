import { COLORS } from 'colors';
import React from 'react';
import { Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

function HomeScreen(props) {
  return (
    <Container>
      <MainTxt>BeatMate</MainTxt>
      <Section>
        <ShowTime>
          <TotalTxt>
            <TimeTxt style={{ marginBottom: 2 }}>임박한 레슨</TimeTxt>
            <TimeTxt>
              <Text style={{ color: COLORS.subMiddleblue }}>01:00:59 </Text>남음
            </TimeTxt>
          </TotalTxt>
          <MaterialCommunityIcons name={'timer-outline'} color={COLORS.main} size={RFValue(50)} />
        </ShowTime>
        <SecondRow>
          <ManageConsult>
            <Txt>레슨 관리</Txt>
          </ManageConsult>
          <RightSection>
            <MidBox style={{ marginBottom: RFValue(10) }}>
              <Txt>예약 관리</Txt>
            </MidBox>
            <MidBox>
              <Txt>강사 찾기</Txt>
            </MidBox>
          </RightSection>
        </SecondRow>
        <ThirdRow>
          <SmallBox>
            <Txt>커뮤니티</Txt>
          </SmallBox>
          <SmallBox>
            <Txt>채팅</Txt>
          </SmallBox>
          <SmallBox>
            <Txt>내 정보</Txt>
          </SmallBox>
        </ThirdRow>
      </Section>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.white};
  position: relative;
  align-items: center;
`;

const MainTxt = styled.Text`
  font-size: ${RFValue(35)}px;
  font-weight: bold;
  position: absolute;
  top: ${hp(10)}px;
`;

const Section = styled.View`
  justify-content: center;
  flex: 1;
  margin-top: ${hp(18)}px;
  align-items: center;
`;

const ShowTime = styled.TouchableOpacity`
  border-color: ${COLORS.main};
  border-style: solid;
  border-width: 3px;
  border-radius: 10px;

  width: ${wp(95)}px;
  height: ${hp(13)}px;

  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const TimeTxt = styled.Text`
  font-weight: bold;
  color: ${COLORS.main};
  font-size: ${RFValue(16)}px;
`;

const TotalTxt = styled.View`
  flex-direction: column;
  align-items: center;
`;

const SecondRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: ${hp(5)}px;
  width: ${wp(90)}px;
`;

const ManageConsult = styled.TouchableOpacity`
  border-color: ${COLORS.main};
  border-style: solid;
  border-width: 3px;
  border-radius: 10px;
  background-color: ${COLORS.subLightblue};

  width: ${wp(42)}px;
  height: ${wp(42)}px;

  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const Txt = styled.Text`
  color: ${COLORS.white};
  font-size: ${RFValue(16)}px;
  font-weight: bold;
`;

const RightSection = styled.View``;

const MidBox = styled.TouchableOpacity`
  border-color: ${COLORS.subLightblue};
  border-style: solid;
  border-width: 3px;
  border-radius: 10px;
  background-color: ${COLORS.subMiddleblue};

  width: ${wp(42)}px;
  height: ${wp(18)}px;

  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const ThirdRow = styled.View`
  margin-top: ${RFValue(40)}px;
  flex-direction: row;
  justify-content: space-between;
  width: ${wp(90)}px;
`;

const SmallBox = styled.TouchableOpacity`
  border-color: ${COLORS.main};
  border-style: solid;
  border-width: 3px;
  border-radius: 10px;
  background-color: ${COLORS.main};

  width: ${wp(27)}px;
  height: ${wp(27)}px;

  justify-content: space-around;
  align-items: center;
`;

export default HomeScreen;

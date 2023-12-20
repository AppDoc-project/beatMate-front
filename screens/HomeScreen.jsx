import { COLORS } from 'colors';
import React from 'react';
import { Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';

function HomeScreen(props) {
  return (
    <Container>
      <BellIcon name={'bell'} size={RFValue(25)} />
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

const BellIcon = styled(MaterialCommunityIcons)`
  position: absolute;
  top: 50px;
  right: 20px;
`;

const MainTxt = styled.Text`
  font-size: ${RFValue(35)}px;
  font-weight: bold;
  position: absolute;
  top: 110px;
`;

const Section = styled.View`
  justify-content: center;
  flex: 1;
  margin-top: 150px;
`;

const ShowTime = styled.TouchableOpacity`
  border-color: ${COLORS.main};
  border-style: solid;
  border-width: 3px;
  border-radius: 10px;

  width: ${RFValue(326)}px;
  height: ${RFValue(102)}px;

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
  margin-top: ${RFValue(40)}px;
`;

const ManageConsult = styled.TouchableOpacity`
  border-color: ${COLORS.main};
  border-style: solid;
  border-width: 3px;
  border-radius: 10px;
  background-color: ${COLORS.subLightblue};

  width: ${RFValue(160)}px;
  height: ${RFValue(160)}px;

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

  width: ${RFValue(160)}px;
  height: ${RFValue(75)}px;

  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const ThirdRow = styled.View`
  margin-top: ${RFValue(40)}px;
  flex-direction: row;
  justify-content: space-between;
`;

const SmallBox = styled.TouchableOpacity`
  border-color: ${COLORS.main};
  border-style: solid;
  border-width: 3px;
  border-radius: 10px;
  background-color: ${COLORS.main};

  width: ${RFValue(105)}px;
  height: ${RFValue(105)}px;

  justify-content: space-around;
  align-items: center;
`;

export default HomeScreen;

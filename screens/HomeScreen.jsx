import { COLORS } from 'colors';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';

function HomeScreen(props) {
  return (
    <Container>
      <BellIcon name={'bell'} size={RFValue(25)} />
      <MainTxt>AppDoc</MainTxt>
      <Section>
        <ShowTime>
          <TimeTxt>임박한 상담</TimeTxt>
          <MaterialCommunityIcons name={'timer-outline'} color={COLORS.main} size={RFValue(50)} />
        </ShowTime>
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
  margin-top: 20px;
  position: absolute;
  top: 110px;
`;

const Section = styled.View`
  justify-content: center;
  flex: 1;
`;

const ShowTime = styled.View`
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

const TimeTxt = styled.Text``;

export default HomeScreen;

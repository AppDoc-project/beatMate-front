import { COLORS } from 'colors';
import React, { useState } from 'react';
import styled from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

function PushAlarmSetScreen(props) {
  const [pushAlarm, setPushAlarm] = useState('');

  const selectedAlarm = (value) => {
    setPushAlarm(value);
  };

  return (
    <Container>
      <FirstSection>
        <Txt>푸쉬 알림 여부 설정</Txt>
        <AcceptBtn select={pushAlarm === 'accept'} onPress={() => selectedAlarm('accept')}>
          <AcceptText select={pushAlarm === 'accept'}>수락</AcceptText>
        </AcceptBtn>
        <DenyBtn select={pushAlarm === 'deny'} onPress={() => selectedAlarm('deny')}>
          <DenyText select={pushAlarm === 'deny'}>거부</DenyText>
        </DenyBtn>
      </FirstSection>

      <SecondSection>
        <Text>
          ※ [푸쉬 알림 여부 설정]을 거부한다면 모든 알림을 받을 수 없습니다. 이에 따라 작성한 게시글, 댓글에 대한 알림
          상담 관련 알림 등을 받을 수 없습니다.
        </Text>
      </SecondSection>
      <ChangeBtn>
        <BtnText>변경하기</BtnText>
      </ChangeBtn>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const FirstSection = styled.View`
  position: absolute;
  top: ${hp(13)}px;

  margin-left: ${wp(4.8)}px;
  margin-right: ${wp(4.8)}px;

  flex-direction: row;
`;

const SecondSection = styled.View`
  position: absolute;
  top: ${hp(20)}px;

  margin-left: ${wp(4.8)}px;
  margin-right: ${wp(4.8)}px;
`;

const Txt = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: bold;
`;

const Text = styled.Text`
  font-size: ${RFValue(11)}px;
  font-weight: 600;
  color: ${COLORS.gray};
`;

const AcceptBtn = styled.TouchableOpacity`
  width: ${wp(14)}px;
  height: ${hp(4)}px;

  border-radius: 10px;
  border-color: ${({ select }) => (select ? COLORS.main : COLORS.lightgray)};
  border-width: 1.5px;

  justify-content: center;
  align-items: center;

  margin: ${hp(-0.8)}px ${wp(12)}px;
`;

const DenyBtn = styled.TouchableOpacity`
  width: ${wp(14)}px;
  height: ${hp(4)}px;

  border-radius: 10px;
  border-color: ${({ select }) => (select ? COLORS.main : COLORS.lightgray)};
  border-width: 1.5px;

  justify-content: center;
  align-items: center;

  margin: ${hp(-0.8)}px 0px;
`;

const AcceptText = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: bold;
  color: ${({ select }) => (select ? COLORS.main : COLORS.lightgray)};
`;

const DenyText = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: bold;
  color: ${({ select }) => (select ? COLORS.main : COLORS.lightgray)};
`;

const ChangeBtn = styled.TouchableOpacity`
  background-color: ${COLORS.white};
  padding: ${hp(1)}px;
  margin: ${hp(2)}px ${wp(4.8)}px;
  border-radius: ${wp(1)}px;
  border-colors: ${COLORS.main};

  position: absolute;
  bottom: ${hp(5)}px;
  right: ${wp(40)}px;
`;

const BtnText = styled.Text`
  color: ${COLORS.main};
  font-size: ${RFValue(16)}px;
  font-weight: bold;
`;

export default PushAlarmSetScreen;

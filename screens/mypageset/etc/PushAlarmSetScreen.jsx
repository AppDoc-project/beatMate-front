import { COLORS } from 'colors';
import React from 'react';
import styled from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

function PushAlarmSetScreen(props) {
  return (
    <Container>
      <Section>
        <Txt>푸쉬 알림 여부 설정</Txt>
        <AcceptBtn>
          <AcceptText>수락</AcceptText>
        </AcceptBtn>
        <DenyBtn>
          <DenyText>거부</DenyText>
        </DenyBtn>
      </Section>

      <Section>
        <Text>
          [푸쉬 알림 여부 설정]을 거부한다면 모든 알림을 받을 수 없습니다. 이에 따라 작성한 게시글, 댓글에 대한 알림
          상담 관련 알림 등을 받을 수 없습니다.
        </Text>
      </Section>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Section = styled.View`
  margin-left: ${wp(4.8)}px;
  margin-top: ${hp(2)}px;
  flex-direction: row;
`;

const Txt = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: bold;
`;

const Text = styled.Text`
  font-size: ${RFValue(13)}px;
  font-weight: bold;
  margin-bottom: ${hp(1)}px;
  color: ${COLORS.gray};
`;

const AcceptBtn = styled.TouchableOpacity``;

const DenyBtn = styled.TouchableOpacity``;

const AcceptText = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: bold;
  color: ${COLORS.main};
`;

const DenyText = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: bold;
  color: ${COLORS.main};
`;

export default PushAlarmSetScreen;

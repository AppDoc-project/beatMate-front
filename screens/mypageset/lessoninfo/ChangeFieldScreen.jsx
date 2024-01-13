import { COLORS } from 'colors';
import React from 'react';
import styled from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

function ChangeFieldScreen(props) {
  return (
    <Container>
      <FieldSection>
        <Txt>변경된 음악 분야를 선택해주세요.</Txt>
        <SubTxt>(택1 필수, 중복 불가)</SubTxt>
      </FieldSection>

      <Section>
        <Text>※ "레슨 이름"을 변경하기 위해서는 증명서를 재제출해야 합니다.</Text>
        <Text>※ 수정이 승인되면 해당 정보가 변경되며 승인되었음을 알리는 알림이 갑니다.</Text>
      </Section>

      <ImageSection>
        <Txt>강사 자격을 인증할 수 있는 이미지를 첨부해주세요.</Txt>
        <SubTxt>최소 1장 이상, 최대 5장까지 첨부 가능</SubTxt>
        <SubTxt>해당 이미지들로 강사 자격 심사가 진행될 예정입니다.</SubTxt>
      </ImageSection>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const FieldSection = styled.View`
  position: absolute;
  top: ${hp(13)}px;

  margin-left: ${wp(4.8)}px;
  margin-right: ${wp(4.8)}px;
`;

const Section = styled.View`
  position: absolute;
  top: ${hp(33)}px;

  margin-left: ${wp(4.8)}px;
  margin-right: ${wp(4.8)}px;
`;

const ImageSection = styled.View`
  position: absolute;
  top: ${hp(48)}px;

  margin-left: ${wp(4.8)}px;
  margin-right: ${wp(4.8)}px;
`;

const Txt = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: bold;
`;

const SubTxt = styled.Text`
  font-size: ${RFValue(11.7)}px;
  margin-top: ${hp(1)}px;
  color: ${COLORS.lightgray};
`;

const Text = styled.Text`
  font-size: ${RFValue(11)}px;
  font-weight: 600;
  margin-bottom: ${hp(1)}px;
  color: ${COLORS.gray};
`;

export default ChangeFieldScreen;

import { COLORS } from 'colors';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styled from 'styled-components';

// eslint-disable-next-line react/prop-types
function LessonInfoModal({ closeModal }) {
  return (
    <Container>
      <BackgroundClose onPress={closeModal} />
      <InfoModal>
        <Info>
          <InfoItem>
            <LabelText>수강생 이름 : </LabelText>
            <ValueText>김철수</ValueText>
          </InfoItem>
          <InfoItem>
            <LabelText>생년월일 : </LabelText>
            <ValueText>20001112</ValueText>
          </InfoItem>
          <InfoItem>
            <LabelText>레슨 방식 : </LabelText>
            <ValueText>화상 레슨</ValueText>
          </InfoItem>
          <InfoItem>
            <LabelText>숙련도 : </LabelText>
            <ValueText>하</ValueText>
          </InfoItem>
          <InfoItem>
            <LabelText>상담 내용 : </LabelText>
            <ValueText>아직 많이 부족한 상태라서 기초부터 다지고 싶어요!</ValueText>
          </InfoItem>
        </Info>
        {/* <Photo>
          <PhotoEx></PhotoEx>
        </Photo> */}
      </InfoModal>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 8;
  justify-content: center;
  align-items: center;
`;

const BackgroundClose = styled.TouchableOpacity`
  flex: 1;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9;
`;

const InfoModal = styled.View`
  border-width: 2px;
  border-color: ${COLORS.main};
  height: ${hp(20)}px;
  width: ${wp(80)}px;
  background-color: ${COLORS.white};

  border-width: ${RFValue(3)}px;
  border-color: ${COLORS.main};
  border-radius: ${RFValue(10)}px;
  z-index: 10;
  overflow: hidden;

  padding: ${RFValue(10)}px;
`;

const Info = styled.View``;

const InfoItem = styled.View`
  flex-direction: row;
  margin-bottom: ${RFValue(5)}px;
`;

const LabelText = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 700;
`;

const ValueText = styled.Text`
  flex: 1;
  font-size: ${RFValue(12)}px;
  font-weight: 600;
  margin-top: ${RFValue(2.5)}px;
`;

// const Photo = styled.View`
//   justify-content: center;
//   align-items: center;
//   margin: ${RFValue(5)}px;
// `;

// const PhotoEx = styled.View`
//   border-width: 2px;
//   border-color: ${COLORS.main};
//   height: 80px;
//   width: 200px;
// `;
export default LessonInfoModal;

import { COLORS } from 'colors';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styled from 'styled-components';

import LessonInfoContent from './LessonInfoContent';

// eslint-disable-next-line react/prop-types
function LessonInfoModal({ closeModal, onGoingLessonInfo }) {
  return (
    <Container>
      <BackgroundClose onPress={closeModal} />
      <InfoModal>{onGoingLessonInfo && <LessonInfoContent onGoingLessonInfo={onGoingLessonInfo} />}</InfoModal>
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
  height: ${hp(30)}px;
  width: ${wp(80)}px;
  background-color: ${COLORS.white};

  border-width: ${RFValue(3)}px;
  border-color: ${COLORS.main};
  border-radius: ${RFValue(10)}px;
  z-index: 10;
  overflow: hidden;

  padding: ${RFValue(10)}px;
`;

export default LessonInfoModal;

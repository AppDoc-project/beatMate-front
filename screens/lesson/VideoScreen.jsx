import LessonInfoModal from '@components/lesson/currentLessonItem/LessonInfoModal';
import { COLORS } from 'colors';
import React, { useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components';

// eslint-disable-next-line react/prop-types
function VideoScreen(props) {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Container>
        <LessonInfoBtn onPress={toggleModal}>
          <LessonInfoBtnText>레슨 정보 확인하기</LessonInfoBtnText>
        </LessonInfoBtn>
      </Container>
      {isModalVisible && <LessonInfoModal closeModal={toggleModal} />}
    </SafeAreaView>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.white};
`;

const LessonInfoBtn = styled.TouchableOpacity`
  width: ${wp(30)}px;
  height: ${hp(4)}px;
  border-radius: ${RFValue(10)}px;
  background-color: ${COLORS.subMiddleblue};

  justify-content: center;
  align-items: center;

  margin: ${RFValue(5)}px 0 0 ${RFValue(60)}px;
`;

const LessonInfoBtnText = styled.Text`
  font-size: ${RFValue(12)}px;
  color: ${COLORS.white};
`;

export default VideoScreen;

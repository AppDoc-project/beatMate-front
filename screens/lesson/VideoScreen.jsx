import LessonInfoModal from '@components/lesson/currentLessonItem/LessonInfoModal';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from 'colors';
import { UserInfo } from 'context/UserInfoContext';
import React, { useContext, useEffect, useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styled from 'styled-components';

function VideoScreen(props) {
  const {
    loginUserInfo: [loginUser],
  } = useContext(UserInfo);
  const isTutor = loginUser.isTutor;

  const navigation = useNavigation();

  const [isModalVisible, setModalVisible] = useState(false);
  const [isMyVideoBig, setIsMyVideoBig] = useState(false);
  const [isYourVideoBig, setIsYourVideoBig] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleMyVideoSize = () => {
    setIsMyVideoBig((prevState) => {
      if (prevState && isYourVideoBig) {
        setIsYourVideoBig(false);
      }
      return !prevState && !isYourVideoBig;
    });
  };

  const toggleYourVideoSize = () => {
    setIsYourVideoBig((prevState) => {
      if (prevState && isMyVideoBig) {
        setIsMyVideoBig(false);
      }
      return !prevState && !isMyVideoBig;
    });
  };

  const onPressLessonClose = () => {
    navigation.navigate('lessonMainScreen');
  };

  useEffect(() => {
    console.log('나', isMyVideoBig);
    console.log('너', isYourVideoBig);
  }, [isMyVideoBig, isYourVideoBig]);

  return (
    <Container>
      <Info>
        <LessonInfoBtn onPress={toggleModal}>
          <LessonInfoBtnText>레슨 정보 확인하기</LessonInfoBtnText>
        </LessonInfoBtn>

        <LessonInfoBtn onPress={toggleModal}>
          <LessonInfoBtnText>레슨 정보 확인하기</LessonInfoBtnText>
        </LessonInfoBtn>
        {isTutor && (
          <LessonCloseBtn onPress={onPressLessonClose}>
            <LessonCloseText>레슨 종료</LessonCloseText>
          </LessonCloseBtn>
        )}
      </Info>
      <Video>
        <MyVideo onPress={toggleMyVideoSize} meBig={isMyVideoBig} youBig={isYourVideoBig}></MyVideo>
        <YourVideo onPress={toggleYourVideoSize} youBig={isYourVideoBig} meBig={isMyVideoBig}></YourVideo>
      </Video>

      {isModalVisible && <LessonInfoModal closeModal={toggleModal} />}
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.black};
  justify-content: center;
  align-items: center;
`;

const Info = styled.View`
  margin-top: ${hp(7)}px;
  margin-right: ${wp(2)}px;
  margin-left: ${wp(2)}px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: ${wp(95)}px;
`;

const LessonCloseBtn = styled.TouchableOpacity`
  width: ${wp(22)}px;
  height: ${hp(5)}px;
  border-radius: ${RFValue(10)}px;
  background-color: ${COLORS.main};

  justify-content: center;
  align-items: center;
`;

const LessonCloseText = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 500;
  color: ${COLORS.white};
`;

const LessonInfoBtn = styled.TouchableOpacity`
  width: ${wp(32)}px;
  height: ${hp(5)}px;
  border-radius: ${RFValue(10)}px;
  background-color: ${COLORS.subMiddleblue};

  justify-content: center;
  align-items: center;
`;

const LessonInfoBtnText = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 500;
  color: ${COLORS.white};
`;

const Video = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const MyVideo = styled.TouchableOpacity`
  width: ${(props) => (props.meBig ? `${wp(100)}px` : !props.meBig && !props.youBig ? `${wp(100)}px` : `${wp(30)}px`)};
  height: ${(props) => (props.meBig ? `${hp(60)}px` : !props.meBig && !props.youBig ? `${hp(35)}px` : `${wp(30)}px`)};
  background-color: lightgray;
`;

const YourVideo = styled.TouchableOpacity`
  width: ${(props) => (props.youBig ? `${wp(100)}px` : !props.youBig && !props.meBig ? `${wp(100)}px` : `${wp(30)}px`)};
  height: ${(props) => (props.youBig ? `${hp(60)}px` : !props.youBig && !props.meBig ? `${hp(35)}px` : `${wp(30)}px`)};
  margin-top: ${hp(1)}px;
  background-color: pink;
`;

export default VideoScreen;

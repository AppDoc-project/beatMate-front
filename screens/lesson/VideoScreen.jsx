import LessonInfoModal from '@components/lesson/currentLessonItem/LessonInfoModal';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from 'colors';
import { UserInfo } from 'context/UserInfoContext';
import React, { useContext, useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styled from 'styled-components';

function VideoScreen(props) {
  const {
    loginUserInfo: [loginUser],
  } = useContext(UserInfo);
  const isTutor = loginUser.isTutor;

  const navigation = useNavigation();

  const [isModalVisible, setModalVisible] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isVideoBig, setIsVideoBig] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onPressMicOn = () => {
    setIsMicOn((prevState) => !prevState);
  };

  const onPressCameraOn = () => {
    setIsCameraOn((prevState) => !prevState);
  };

  const toggleVideoSize = () => {
    setIsVideoBig((prevState) => !prevState);
  };

  const onPressLessonClose = () => {
    navigation.navigate('lessonMainScreen');
  };

  return (
    <Container>
      <Info>
        <LessonInfoBtn onPress={toggleModal}>
          <LessonInfoBtnText>레슨 정보 확인하기</LessonInfoBtnText>
        </LessonInfoBtn>
      </Info>
      <Video>
        <Video1 big={isVideoBig}></Video1>
        <Video2 onPress={toggleVideoSize} big={isVideoBig}></Video2>
      </Video>
      <Btns>
        <MicBtn onPress={onPressMicOn}>
          <FontAwesome5 name={isMicOn ? 'microphone' : 'microphone-slash'} size={28} />
        </MicBtn>
        <VideoBtn onPress={onPressCameraOn} isTutor={isTutor}>
          <FontAwesome5 name={isCameraOn ? 'video' : 'video-slash'} size={26} />
        </VideoBtn>
        {isTutor && (
          <LessonCloseBtn onPress={onPressLessonClose}>
            <LessonCloseText>레슨 종료</LessonCloseText>
          </LessonCloseBtn>
        )}
      </Btns>
      {isModalVisible && <LessonInfoModal closeModal={toggleModal} />}
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.white};
`;

const Info = styled.View`
  flex: 0.06;
  margin: ${RFValue(42)}px 0 ${RFValue(10)}px 0;
`;

const LessonInfoBtn = styled.TouchableOpacity`
  width: ${wp(32)}px;
  height: ${hp(5)}px;
  border-radius: ${RFValue(10)}px;
  background-color: ${COLORS.subMiddleblue};

  justify-content: center;
  align-items: center;

  margin-left: ${RFValue(42)}px;
`;

const LessonInfoBtnText = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 500;
  color: ${COLORS.white};
`;

const Video = styled.View`
  flex: 0.87;
  justify-content: center;
  align-items: center;
`;

const Video1 = styled.View`
  width: ${(props) => (props.big ? RFValue(320) : RFValue(260))}px;
  height: ${(props) => (props.big ? RFValue(430) : RFValue(260))}px;
  background-color: lightgray;
  margin: ${(props) => (props.big ? RFValue(5) : RFValue(10))}px;
`;

const Video2 = styled.TouchableOpacity`
  width: ${(props) => (props.big ? RFValue(100) : RFValue(260))}px;
  height: ${(props) => (props.big ? RFValue(100) : RFValue(260))}px;
  background-color: lightgray;
  margin: ${(props) => (props.big ? RFValue(5) : RFValue(10))}px;
`;

const Btns = styled.View`
  flex: 0.07;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: ${RFValue(5)}px 0 ${RFValue(5)}px 0;
`;

const MicBtn = styled.TouchableOpacity`
  width: ${RFValue(40)}px;
  height: ${RFValue(40)}px;
  border-width: ${RFValue(2)}px;
  border-color: ${COLORS.main};
  border-radius: 50%;

  justify-content: center;
  align-items: center;

  margin-right: ${RFValue(35)}px;
`;

const VideoBtn = styled.TouchableOpacity`
  width: ${RFValue(40)}px;
  height: ${RFValue(40)}px;
  border-width: ${RFValue(2)}px;
  border-color: ${COLORS.main};
  border-radius: 50%;

  justify-content: center;
  align-items: center;

  margin-right: ${(props) => (props.isTutor ? RFValue(35) : 0)}px;
`;

const LessonCloseBtn = styled.TouchableOpacity`
  width: ${wp(22)}px;
  height: ${hp(4)}px;
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

export default VideoScreen;

// import 'expo-dev-client';
// import AgoraUIKit from 'agora-rn-uikit';
// import PropTypes from 'prop-types';
// import React, { useState } from 'react';

// function VideoScreen({ connectionData, rtcCallbacks }) {
//   const [videoCall, setVideoCall] = useState(true);

//   const props = {
//     connectionData: {
//       appId: '8a28d57155f14f6eba0cfe4cdc71e001',
//       channel: 'test',
//       ...connectionData,
//     },
//     rtcCallbacks: {
//       EndCall: () => setVideoCall(false),
//       ...rtcCallbacks,
//     },
//   };

//   return videoCall ? <AgoraUIKit connectionData={props.connectionData} rtcCallbacks={props.rtcCallbacks} /> : null;
// }

// VideoScreen.propTypes = {
//   connectionData: PropTypes.shape({
//     appId: PropTypes.string.isRequired,
//     channel: PropTypes.string.isRequired,
//   }),
//   rtcCallbacks: PropTypes.shape({
//     EndCall: PropTypes.func.isRequired,
//   }),
// };

// export default VideoScreen;

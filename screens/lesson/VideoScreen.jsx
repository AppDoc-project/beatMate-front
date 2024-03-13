import LessonInfoModal from '@components/lesson/currentLessonItem/LessonInfoModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { finishLesson } from 'api/lesson';
import { COLORS } from 'colors';
import { UserInfo } from 'context/UserInfoContext';
import React, { useRef, useState, useEffect, useContext } from 'react';
import { Text, View } from 'react-native';
import { ClientRoleType, createAgoraRtcEngine, RtcSurfaceView, ChannelProfileType } from 'react-native-agora';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import socketio from 'socket.io-client';
import styled from 'styled-components';

const VideoScreen = () => {
  const route = useRoute();
  const { remoteLessonInfo } = route.params;

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onPressLessonClose = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      leave();

      showMessage('소켓 없음');
      console.log('소켓 없음');
    }

    finishLesson(remoteLessonInfo.id)
      .then((res) => {
        const { data } = res;
        console.log(data);
        showMessage('레슨 종료 완료');
        navigation.navigate('lessonMainScreen');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navigation = useNavigation();

  const socketRef = useRef(null);

  const {
    loginUserInfo: [loginUser],
  } = useContext(UserInfo);

  const isTutor = loginUser.isTutor;

  const appId = '8a28d57155f14f6eba0cfe4cdc71e001';
  const channelName = remoteLessonInfo ? remoteLessonInfo.channelName : '';
  const token = isTutor
    ? remoteLessonInfo
      ? remoteLessonInfo.tutorToken
      : ''
    : remoteLessonInfo
      ? remoteLessonInfo.tuteeToken
      : '';

  const uid = loginUser.id;

  const agoraEngineRef = useRef();
  const [isJoined, setIsJoined] = useState(false);
  const [remoteUid, setRemoteUid] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setupVideoSDKEngine();
  });

  useEffect(() => {
    if (isJoined) {
      handleDisconnectEvent();
    }
  });

  const setupVideoSDKEngine = async () => {
    try {
      agoraEngineRef.current = createAgoraRtcEngine();
      const agoraEngine = agoraEngineRef.current;
      agoraEngine.registerEventHandler({
        onJoinChannelSuccess: () => {
          showMessage('Successfully joined the channel ' + channelName);
          setIsJoined(true);
        },
        onUserJoined: (_connection, Uid) => {
          showMessage('Remote user joined with uid ' + Uid);
          setRemoteUid(Uid);
        },
        onUserOffline: (_connection, Uid) => {
          showMessage('Remote user left the channel. uid: ' + Uid);
          setRemoteUid(0);
        },
      });
      agoraEngine.initialize({
        appId: appId,
        channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
      });
      agoraEngine.enableVideo();
    } catch (e) {
      showMessage(e);
    }
  };

  const join = async () => {
    if (isJoined) {
      return;
    }
    try {
      agoraEngineRef.current?.setChannelProfile(ChannelProfileType.ChannelProfileCommunication);
      agoraEngineRef.current?.startPreview();
      agoraEngineRef.current?.joinChannel(token, channelName, uid, {
        clientRoleType: ClientRoleType.ClientRoleBroadcaster,
      });
    } catch (e) {
      showMessage(e);
    }
  };

  const leave = () => {
    try {
      agoraEngineRef.current?.leaveChannel();
      setRemoteUid(0);
      setIsJoined(false);
      showMessage('You left the channel');
    } catch (e) {
      showMessage(e);
    }
  };

  const [isError, setIsError] = useState(false);

  const initializeSocket = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      console.log('Trying to initialize socket...');
      console.log('Token:', token);

      if (socketRef.current) {
        socketRef.current.disconnect();
      }

      socketRef.current = socketio(`https://beatmate.zapto.org/chat/lesson?lessonId=${remoteLessonInfo.id}`, {
        transports: ['polling'],
        path: '/socket.io',
        extraHeaders: {
          Authorization: `${token}`,
        },
      });

      socketRef.current.on('connect', () => {
        showMessage('Socket connected successfully');
      });

      socketRef.current.on('connect_error', (error) => {
        showMessage('Socket connection failed:');
        showMessage(error);
        setIsError(true);
      });
    } catch (error) {
      console.log('Error initializing socket:', error);
      showMessage('Error initializing socket');
      setIsError(true);
    }
  };

  const handleDisconnectEvent = () => {
    socketRef.current.on('disconnect_event', (msg) => {
      showMessage(msg);

      if (socketRef.current) {
        socketRef.current.disconnect();
        leave();

        showMessage('소켓 없음');
        console.log('소켓 없음');
      }

      finishLesson(remoteLessonInfo.id)
        .then((res) => {
          const { data } = res;
          console.log(data);
          showMessage('레슨 종료 완료');
          navigation.navigate('lessonMainScreen');
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      initializeSocket();
    };
    fetchData();
  }, []);

  if (isError) {
    return (
      <View>
        <Text>에러 발생</Text>
      </View>
    );
  }

  return (
    <MainContainer>
      <Info>
        <ButtonContainer>
          {!isJoined && <Button onPress={join}>레슨 참여하기</Button>}
          {isJoined && <Button onPress={leave}>Leave</Button>}
          <LessonInfoBtn onPress={toggleModal}>
            <LessonInfoBtnText>레슨 정보 확인하기</LessonInfoBtnText>
          </LessonInfoBtn>
        </ButtonContainer>
      </Info>
      <ScrollContainer contentContainerStyle={{ alignItems: 'center' }}>
        {isJoined ? (
          <React.Fragment key={0}>
            <VideoView big={isVideoBig}>
              <RtcSurfaceView canvas={{ uid: 0 }} style={{ width: '100%', height: '100%' }} />
            </VideoView>
            <Text>Local user uid: {uid}</Text>
          </React.Fragment>
        ) : (
          <Text>Join a channel</Text>
        )}
        {isJoined && remoteUid !== 0 ? (
          <React.Fragment key={remoteUid}>
            <VideoView>
              <RtcSurfaceView canvas={{ uid: remoteUid }} style={{ width: '100%', height: '100%' }} />
            </VideoView>
            <Text>Remote user uid: {remoteUid}</Text>
          </React.Fragment>
        ) : (
          <Text>Waiting for a remote user to join</Text>
        )}
        <InfoText>{message}</InfoText>
      </ScrollContainer>
      <Btns>
        {isTutor && (
          <LessonCloseBtn onPress={onPressLessonClose}>
            <LessonCloseText>레슨 종료</LessonCloseText>
          </LessonCloseBtn>
        )}
      </Btns>
      {isModalVisible && <LessonInfoModal closeModal={toggleModal} />}
    </MainContainer>
  );

  function showMessage(msg) {
    setMessage(msg);
  }
};

const MainContainer = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`;

const Info = styled.View`
  flex: 0.03;
  margin: ${hp(5)}px 0 ${wp(5)}px 0;
`;

const LessonInfoBtn = styled.TouchableOpacity`
  width: ${wp(32)}px;
  height: ${hp(5)}px;
  border-radius: ${RFValue(10)}px;
  background-color: ${COLORS.subMiddleblue};

  justify-content: center;
  align-items: center;

  margin-left: ${wp(5)}px;
  margin-right: ${wp(5)}px;
`;

const LessonInfoBtnText = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 500;
  color: ${COLORS.white};
`;

const Button = styled.Text`
  padding-horizontal: 25px;
  padding-vertical: 4px;
  font-weight: bold;
  color: #ffffff;
  background-color: #0055cc;
  margin-right: ${wp(5)}px;
`;

const ScrollContainer = styled.ScrollView`
  flex: 1;
  background-color: #ddeeff;
  width: 100%;
`;

const VideoView = styled.View`
  width: 90%;
  height: 200px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const InfoText = styled.Text`
  background-color: #ffffe0;
  color: #0000ff;
`;

const Btns = styled.View`
  flex: 0.07;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: ${hp(5)}px;
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

// import { useRoute } from '@react-navigation/native';
// import React from 'react';
// import { View } from 'react-native';

// const VideoScreen = () => {
//   const route = useRoute();
//   const { remoteLessonInfo } = route.params;

//   console.log(remoteLessonInfo);

//   return <View></View>;
// };

// export default VideoScreen;

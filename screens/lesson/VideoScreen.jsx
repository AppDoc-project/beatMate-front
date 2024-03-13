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
        {!isJoined && <Button onPress={join}>레슨 참여하기</Button>}
        {isJoined && <Button onPress={leave}>나가기</Button>}
        <LessonInfoBtn onPress={toggleModal}>
          <LessonInfoBtnText>레슨 정보 확인하기</LessonInfoBtnText>
        </LessonInfoBtn>
        {isTutor && (
          <LessonCloseBtn onPress={onPressLessonClose}>
            <LessonCloseText>레슨 종료</LessonCloseText>
          </LessonCloseBtn>
        )}
      </Info>
      <ScrollContainer contentContainerStyle={{ alignItems: 'center', flex: 1 }}>
        {isJoined ? (
          <React.Fragment key={0}>
            <MyVideo onPress={toggleMyVideoSize} meBig={isMyVideoBig} youBig={isYourVideoBig}>
              <RtcSurfaceView canvas={{ uid: 0 }} style={{ width: '100%', height: '100%' }} />
            </MyVideo>
            <Text>Local user uid: {uid}</Text>
          </React.Fragment>
        ) : (
          <Text>레슨에 참여하세요.</Text>
        )}
        {isJoined && remoteUid !== 0 ? (
          <React.Fragment key={remoteUid}>
            <YourVideo onPress={toggleYourVideoSize} youBig={isYourVideoBig} meBig={isMyVideoBig}>
              <RtcSurfaceView canvas={{ uid: remoteUid }} style={{ width: '100%', height: '100%' }} />
            </YourVideo>
            <Text>Remote user uid: {remoteUid}</Text>
          </React.Fragment>
        ) : (
          <Text>상대방이 입장할때까지 기다려주세요.</Text>
        )}
        <InfoText>{message}</InfoText>
      </ScrollContainer>
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

const Button = styled.Text`
  width: ${wp(22)}px;
  height: ${hp(5)}px;
  border-radius: ${RFValue(10)}px;
  background-color: ${COLORS.subLightblue};

  justify-content: center;
  align-items: center;
`;

const ScrollContainer = styled.ScrollView`
  flex: 1;
  background-color: ${COLORS.black};
  width: 100%;
`;

const MyVideo = styled.TouchableOpacity`
  width: ${(props) => (props.meBig ? `${wp(100)}px` : !props.meBig && !props.youBig ? `${wp(100)}px` : `${wp(30)}px`)};
  height: ${(props) => (props.meBig ? `${hp(60)}px` : !props.meBig && !props.youBig ? `${hp(35)}px` : `${wp(30)}px`)};
`;

const YourVideo = styled.TouchableOpacity`
  width: ${(props) => (props.youBig ? `${wp(100)}px` : !props.youBig && !props.meBig ? `${wp(100)}px` : `${wp(30)}px`)};
  height: ${(props) => (props.youBig ? `${hp(60)}px` : !props.youBig && !props.meBig ? `${hp(35)}px` : `${wp(30)}px`)};
  margin-top: ${hp(1)}px;
`;

const InfoText = styled.Text`
  background-color: #ffffe0;
  color: #0000ff;
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

// import LessonInfoModal from '@components/lesson/currentLessonItem/LessonInfoModal';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useRoute, useFocusEffect } from '@react-navigation/native';
// import { finishLesson } from 'api/lesson';
// import { COLORS } from 'colors';
// import { UserInfo } from 'context/UserInfoContext';
// import React, { useRef, useState, useEffect, useContext } from 'react';
// import { Alert, Text, View } from 'react-native';
// import { ClientRoleType, createAgoraRtcEngine, RtcSurfaceView, ChannelProfileType } from 'react-native-agora';
// import { RFValue } from 'react-native-responsive-fontsize';
// import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
// import socketio from 'socket.io-client';
// import styled from 'styled-components';
// import PropTypes from 'prop-types';

// const VideoScreen = ({ navigation }) => {
//   const route = useRoute();
//   const { remoteLessonInfo } = route.params;

//   const [isModalVisible, setModalVisible] = useState(false);
//   const [isMyVideoBig, setIsMyVideoBig] = useState(false);
//   const [isYourVideoBig, setIsYourVideoBig] = useState(false);

//   useFocusEffect(
//     React.useCallback(() => {
//       const parent = navigation.getParent();
//       parent.setOptions({ tabBarStyle: { display: 'none' } });

//       return () => parent.setOptions({ tabBarStyle: { display: 'flex' } });
//     }, [navigation]),
//   );

//   const toggleModal = () => {
//     setModalVisible(!isModalVisible);
//   };

//   const toggleMyVideoSize = () => {
//     setIsMyVideoBig((prevState) => {
//       if (prevState && isYourVideoBig) {
//         setIsYourVideoBig(false);
//       }
//       return !prevState && !isYourVideoBig;
//     });
//   };

//   const toggleYourVideoSize = () => {
//     setIsYourVideoBig((prevState) => {
//       if (prevState && isMyVideoBig) {
//         setIsMyVideoBig(false);
//       }
//       return !prevState && !isMyVideoBig;
//     });
//   };

//   const onPressLessonClose = () => {
//     if (socketRef.current) {
//       socketRef.current.disconnect();
//       leave();
//       Alert.alert('알림', '강사가 레슨을 종료하였습니다.');

//       console.log('소켓 없음');
//     }

//     finishLesson(remoteLessonInfo.id)
//       .then((res) => {
//         const { data } = res;
//         console.log(data);
//         navigation.navigate('lessonMainScreen');
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const socketRef = useRef(null);

//   const {
//     loginUserInfo: [loginUser],
//   } = useContext(UserInfo);

//   const isTutor = loginUser.isTutor;

//   const appId = '8a28d57155f14f6eba0cfe4cdc71e001';
//   const channelName = remoteLessonInfo ? remoteLessonInfo.channelName : '';
//   const token = isTutor
//     ? remoteLessonInfo
//       ? remoteLessonInfo.tutorToken
//       : ''
//     : remoteLessonInfo
//       ? remoteLessonInfo.tuteeToken
//       : '';

//   const uid = loginUser.id;

//   const agoraEngineRef = useRef();
//   const [isJoined, setIsJoined] = useState(false);
//   const [remoteUid, setRemoteUid] = useState(0);

//   useEffect(() => {
//     setupVideoSDKEngine();
//   });

//   useEffect(() => {
//     if (isJoined) {
//       handleDisconnectEvent();
//     }
//   });

//   const setupVideoSDKEngine = async () => {
//     try {
//       agoraEngineRef.current = createAgoraRtcEngine();
//       const agoraEngine = agoraEngineRef.current;
//       agoraEngine.registerEventHandler({
//         onJoinChannelSuccess: () => {
//           setIsJoined(true);
//         },
//         onUserJoined: (_connection, Uid) => {
//           setRemoteUid(Uid);
//         },
//         onUserOffline: (_connection, Uid) => {
//           console.log('상대방이 방을 떠났습니다.', Uid);
//           setRemoteUid(0);
//         },
//       });
//       agoraEngine.initialize({
//         appId: appId,
//         channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
//       });
//       agoraEngine.enableVideo();
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const join = async () => {
//     if (isJoined) {
//       return;
//     }
//     try {
//       agoraEngineRef.current?.setChannelProfile(ChannelProfileType.ChannelProfileCommunication);
//       agoraEngineRef.current?.startPreview();
//       agoraEngineRef.current?.joinChannel(token, channelName, uid, {
//         clientRoleType: ClientRoleType.ClientRoleBroadcaster,
//       });
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const leave = () => {
//     try {
//       agoraEngineRef.current?.leaveChannel();
//       setRemoteUid(0);
//       setIsJoined(false);
//       navigation.navigate('lessonMainScreen');
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const [isError, setIsError] = useState(false);

//   const initializeSocket = async () => {
//     try {
//       const token = await AsyncStorage.getItem('access_token');
//       console.log('Trying to initialize socket...');
//       console.log('Token:', token);

//       if (socketRef.current) {
//         socketRef.current.disconnect();
//       }

//       socketRef.current = socketio(`https://beatmate.zapto.org/chat/lesson?lessonId=${remoteLessonInfo.id}`, {
//         transports: ['polling'],
//         path: '/socket.io',
//         extraHeaders: {
//           Authorization: `${token}`,
//         },
//       });

//       socketRef.current.on('connect', () => {
//         Alert.alert('알림', '성공적으로 방에 연결되었습니다.');
//       });

//       socketRef.current.on('connect_error', (error) => {
//         Alert.alert('알림', '방 연결에 실패하였습니다.');
//         console.log(error);
//         setIsError(true);
//       });
//     } catch (error) {
//       Alert.alert('알림', '방 연결에 실패하였습니다.');
//       console.log('소켓 초기화에 오류가 있습니다.', error);
//       setIsError(true);
//     }
//   };

//   const handleDisconnectEvent = () => {
//     socketRef.current.on('disconnect_event', (msg) => {
//       Alert.alert('알림', msg);

//       if (socketRef.current) {
//         socketRef.current.disconnect();
//         leave();

//         console.log('소켓 없음');
//       }

//       finishLesson(remoteLessonInfo.id)
//         .then((res) => {
//           const { data } = res;
//           console.log(data);
//           navigation.navigate('lessonMainScreen');
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     });
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       initializeSocket();
//     };
//     fetchData();
//   }, []);

//   if (isError) {
//     return (
//       <View>
//         <Text>에러 발생</Text>
//       </View>
//     );
//   }

//   return (
//     <MainContainer>
//       <Info>
//         {!isJoined && (
//           <MeetingInfoBtn onPress={join}>
//             <LessonInfoBtnText>레슨 참여하기</LessonInfoBtnText>
//           </MeetingInfoBtn>
//         )}
//         {isJoined && (
//           <MeetingInfoBtn onPress={leave}>
//             <LessonInfoBtnText>나가기</LessonInfoBtnText>
//           </MeetingInfoBtn>
//         )}
//         <LessonInfoBtn onPress={toggleModal}>
//           <LessonInfoBtnText>레슨 정보 확인하기</LessonInfoBtnText>
//         </LessonInfoBtn>
//         {isTutor && (
//           <LessonCloseBtn onPress={onPressLessonClose}>
//             <LessonCloseText>레슨 종료</LessonCloseText>
//           </LessonCloseBtn>
//         )}
//       </Info>
//       <ScrollContainer contentContainerStyle={{ alignItems: 'center' }}>
//         {isJoined ? (
//           <React.Fragment key={0}>
//             <MyVideo onPress={toggleMyVideoSize} meBig={isMyVideoBig} youBig={isYourVideoBig}>
//               <RtcSurfaceView canvas={{ uid: 0 }} style={{ width: '100%', height: '100%' }} />
//             </MyVideo>
//           </React.Fragment>
//         ) : (
//           <Text>레슨에 참여하세요.</Text>
//         )}
//         {isJoined && remoteUid !== 0 ? (
//           <React.Fragment key={remoteUid}>
//             <YourVideo onPress={toggleYourVideoSize} youBig={isYourVideoBig} meBig={isMyVideoBig}>
//               <RtcSurfaceView canvas={{ uid: remoteUid }} style={{ width: '100%', height: '100%' }} />
//             </YourVideo>
//           </React.Fragment>
//         ) : (
//           <Text>상대방이 입장할때까지 기다려주세요.</Text>
//         )}
//       </ScrollContainer>
//       {isModalVisible && remoteLessonInfo && (
//         <LessonInfoModal closeModal={toggleModal} onGoingLessonInfo={remoteLessonInfo} />
//       )}
//     </MainContainer>
//   );
// };

// VideoScreen.propTypes = {
//   navigation: PropTypes.shape({
//     navigate: PropTypes.func.isRequired,
//     getParent: PropTypes.func.isRequired,
//   }).isRequired,
// };

// const MainContainer = styled.SafeAreaView`
//   flex: 1;
//   align-items: center;
//   background-color: ${COLORS.black};
// `;

// const Info = styled.View`
//   margin-right: ${wp(2)}px;
//   margin-left: ${wp(2)}px;
//   flex-direction: row;
//   justify-content: space-evenly;
//   align-items: center;
//   width: ${wp(95)}px;
//   height: ${hp(15)}px;
// `;

// const LessonCloseBtn = styled.TouchableOpacity`
//   width: ${wp(22)}px;
//   height: ${hp(5)}px;
//   border-radius: ${RFValue(10)}px;
//   background-color: ${COLORS.main};

//   justify-content: center;
//   align-items: center;
// `;

// const MeetingInfoBtn = styled.TouchableOpacity`
//   width: auto;
//   height: ${hp(5)}px;
//   border-radius: ${RFValue(10)}px;
//   background-color: ${COLORS.subLightblue};

//   justify-content: center;
//   align-items: center;
//   padding-left: ${wp(3)}px;
//   padding-right: ${wp(3)}px;
// `;

// const LessonCloseText = styled.Text`
//   font-size: ${RFValue(12)}px;
//   font-weight: 500;
//   color: ${COLORS.white};
// `;

// const LessonInfoBtn = styled.TouchableOpacity`
//   width: ${wp(32)}px;
//   height: ${hp(5)}px;
//   border-radius: ${RFValue(10)}px;
//   background-color: ${COLORS.subMiddleblue};

//   justify-content: center;
//   align-items: center;
// `;

// const LessonInfoBtnText = styled.Text`
//   font-size: ${RFValue(12)}px;
//   font-weight: 500;
//   color: ${COLORS.white};
// `;

// const ScrollContainer = styled.ScrollView`
//   flex: 1;
//   background-color: ${COLORS.black};
//   width: 100%;
// `;

// const MyVideo = styled.TouchableOpacity`
//   width: ${(props) => (props.meBig ? `${wp(100)}px` : !props.meBig && !props.youBig ? `${wp(100)}px` : `${wp(30)}px`)};
//   height: ${(props) => (props.meBig ? `${hp(55)}px` : !props.meBig && !props.youBig ? `${hp(35)}px` : `${wp(30)}px`)};
// `;

// const YourVideo = styled.TouchableOpacity`
//   width: ${(props) => (props.youBig ? `${wp(100)}px` : !props.youBig && !props.meBig ? `${wp(100)}px` : `${wp(30)}px`)};
//   height: ${(props) => (props.youBig ? `${hp(55)}px` : !props.youBig && !props.meBig ? `${hp(35)}px` : `${wp(30)}px`)};
//   margin-top: ${hp(1)}px;
// `;

// export default VideoScreen;

import { useFocusEffect, useRoute } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

const VideoScreen = ({ navigation }) => {
  useFocusEffect(
    React.useCallback(() => {
      const parent = navigation.getParent();
      parent.setOptions({ tabBarStyle: { display: 'none' } });

      return () => parent.setOptions({ tabBarStyle: { display: 'flex' } });
    }, [navigation]),
  );

  const route = useRoute();
  const { remoteLessonInfo } = route.params;

  console.log(remoteLessonInfo);

  return <View></View>;
};

VideoScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParent: PropTypes.func.isRequired,
  }).isRequired,
};

export default VideoScreen;

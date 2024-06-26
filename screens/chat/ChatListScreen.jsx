import ChatRoomList from '@components/chat/list/ChatRoomList';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getChatList } from 'api/chat';
import format from 'pretty-format';
import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { styled } from 'styled-components/native';

function ChatListScreen() {
  const navigation = useNavigation();

  const [chatListInfo, setChatListInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const reGetChatList = () => {
    setIsLoading(true);
    getChatList()
      .then((res) => {
        console.log(format(res.data));
        setChatListInfo(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.response && error.response.data.code === 408) {
          Alert.alert('알림', '로그인을 해주세요.');
          navigation.navigate('homeScreen');
        } else if (error.response && error.response.data.code === 500) {
          Alert.alert('알림', '서버에러가 발생했습니다. 잠시 후 다시 시도해 주세요.');
        } else {
          console.log('채팅리스트 가져오기 실패', error);
          Alert.alert('알림', '네트워크 연결을 확인해주세요.');
          navigation.navigate('homeScreen');
          setIsError(true);
        }
        setIsLoading(false);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      getChatList()
        .then((res) => {
          console.log(format(res.data));
          setChatListInfo(res.data);
          setIsLoading(false);
        })
        .catch((error) => {
          if (error.response && error.response.data.code === 408) {
            Alert.alert('알림', '로그인을 해주세요.');
            navigation.navigate('homeScreen');
          } else if (error.response && error.response.data.code === 500) {
            Alert.alert('알림', '서버에러가 발생했습니다. 잠시 후 다시 시도해 주세요.');
          } else {
            console.log('채팅리스트 가져오기 실패', error);
            Alert.alert('알림', '네트워크 연결을 확인해주세요.');
            navigation.navigate('homeScreen');
            setIsError(true);
          }
          setIsLoading(false);
        });
    }, []),
  );

  if (isLoading) {
    return (
      <View>
        <Text>로딩중...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View>
        <Text>에러 발생</Text>
      </View>
    );
  }

  return (
    <Container>
      <RedoWrapper onPress={reGetChatList}>
        <MaterialIcons name="refresh" size={35} marginTop={hp(2)} marginBottom={hp(2)} marginRight={wp(2)} />
      </RedoWrapper>
      {chatListInfo !== null && <ChatRoomList rooms={chatListInfo} />}
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const RedoWrapper = styled.TouchableOpacity`
  flex-direction: row-reverse;
  margin-left: ${wp(5)}px;
`;

export default ChatListScreen;

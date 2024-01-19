import { useNavigation } from '@react-navigation/native';
import { COLORS } from 'colors';
import PropTypes from 'prop-types';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { styled } from 'styled-components/native';

ChatRoomListItem.propTypes = {
  room: PropTypes.shape({
    id: PropTypes.string.isRequired, // 채팅방 id
    target: PropTypes.shape({
      name: PropTypes.string.isRequired, // 채팅 상대방 이름
      userId: PropTypes.number.isRequired, // 채팅 상대방 userId
      profile: PropTypes.string, // 채팅 상대방 프로필 이미지 URL 또는 null
    }).isRequired,
    notReadYet: PropTypes.number.isRequired, // 내가 읽지 않은 메세지 수
    lastMessage: PropTypes.string.isRequired, // 채팅방 마지막 메세지
    lastTime: PropTypes.string.isRequired, // 마지막 채팅 시간
  }).isRequired,
};

// 날짜 변경하기 함수
function formatLastTime(lastTime) {
  const [date] = lastTime.split(' ');
  const formattedDate = date.split(':').join('.').substring(0, 10);
  return formattedDate;
}

function ChatRoomListItem({ room }) {
  const navigation = useNavigation();
  const { target, notReadYet, lastMessage, lastTime } = room;

  return (
    <Container onPress={() => navigation.navigate('chat-room', { room })}>
      <Profile source={target.profile ? { uri: target.profile } : require('@assets/chat/nullProfile.jpg')} />
      <ContentGroup>
        <Name numberOfLines={1}>{target.name}</Name>
        <LastChat numberOfLines={1}>{lastMessage}</LastChat>
      </ContentGroup>
      <SubInfoGroup>
        <LastUpdated>{formatLastTime(lastTime)}</LastUpdated>
        {notReadYet !== null && (
          <NotReadContainer>
            <NotRead>{notReadYet}</NotRead>
          </NotReadContainer>
        )}
      </SubInfoGroup>
    </Container>
  );
}

const Container = styled.TouchableOpacity`
  min-height: ${hp(8)}px;
  flex-direction: row;
  flex-wrap: wrap;

  justify-content: space-between;
  align-items: center;

  padding: ${RFValue(8)}px;

  border-bottom-width: 1px;
  border-bottom-color: ${COLORS.lightgray};
`;

const Profile = styled.Image`
  width: 55px;
  height: 55px;
`;

const ContentGroup = styled.View`
  width: 65%;
  height: 100%;
  justify-content: center;
  flex-wrap: wrap;
  align-content: space-around;
  flex-direction: column;

  margin-left: ${wp(2)}px;
`;

const Name = styled.Text`
  max-width: 70%;
  font-weight: 700;
  font-size: ${RFValue(14)}px;
  margin-right: ${wp(1)}px;
`;

const LastChat = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 500;
`;

const NotReadContainer = styled.View`
  background-color: red;
  border-radius: 50%;
  width: ${RFValue(18)}px;
  height: ${RFValue(18)}px;
  padding: ${RFValue(4)}px;
  margin-top: ${RFValue(18)}px;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
`;

const NotRead = styled.Text`
  color: ${COLORS.white};
  font-size: ${RFValue(9)}px;
  font-weight: bold;
`;

const SubInfoGroup = styled.View`
  height: 100%;
  max-width: 20%;
`;

const LastUpdated = styled.Text`
  color: ${COLORS.gray};
  font-size: ${RFValue(10)}px;
  font-weight: 700;
`;

export default ChatRoomListItem;

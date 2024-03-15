import { useNavigation } from '@react-navigation/native';
import { COLORS } from 'colors';
import PropTypes from 'prop-types';
import React from 'react';
import { ImageBackground } from 'react-native'; // Import ImageBackground
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { styled } from 'styled-components/native';

ChatRoomListItem.propTypes = {
  room: PropTypes.shape({
    id: PropTypes.string.isRequired,
    target: PropTypes.shape({
      name: PropTypes.string.isRequired,
      userId: PropTypes.number.isRequired,
      profile: PropTypes.string,
    }).isRequired,
    notReadYet: PropTypes.number.isRequired,
    lastMessage: PropTypes.string.isRequired,
    lastTime: PropTypes.string.isRequired,
  }).isRequired,
};

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
      <ProfileContainer>
        {room && room.target.profile ? (
          <ImageBackground
            source={{
              uri: room.target.profile,
            }}
            style={{
              width: wp(14),
              height: wp(14),
              borderRadius: 50,
              overflow: 'hidden',
            }}
          ></ImageBackground>
        ) : (
          <FontAwesome name={'user-circle'} size={RFValue(40)} color={'lightgray'} />
        )}
      </ProfileContainer>
      <ContentGroup>
        <Name numberOfLines={1}>{target.name}</Name>
        {lastMessage && (
          <LastChat numberOfLines={1}>
            {lastMessage.length > 10 ? `${lastMessage.substring(0, 15)}...` : lastMessage}
          </LastChat>
        )}
      </ContentGroup>
      <SubInfoGroup>
        {lastTime && <LastUpdated>{formatLastTime(lastTime)}</LastUpdated>}
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
  padding: ${RFValue(8)}px;
  border-bottom-width: 1px;
  border-bottom-color: ${COLORS.lightgray};
  justify-content: space-between;
  align-items: center;
`;

const ProfileContainer = styled.View`
  border-radius: 50%;
  margin-right: ${RFValue(5)}px;
`;

const ContentGroup = styled.View`
  width: ${wp(60)}px;
  flex-wrap: wrap;
  flex-direction: column;
  margin-left: ${wp(2)}px;
`;

const Name = styled.Text`
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
  border-radius: 50px;
  width: ${wp(6)}px;
  height: ${wp(6)}px;
  padding: ${wp(1)}px;
  margin-top: ${wp(5)}px;
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
  width: ${wp(17)}px;
`;

const LastUpdated = styled.Text`
  color: ${COLORS.gray};
  font-size: ${RFValue(9)}px;
  font-weight: 700;
`;

export default ChatRoomListItem;

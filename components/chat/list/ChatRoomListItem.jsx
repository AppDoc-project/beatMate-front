import { useNavigation } from '@react-navigation/native';
import { COLORS } from 'colors';
import PropTypes from 'prop-types';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { styled } from 'styled-components/native';

ChatRoomListItem.propTypes = {
  room: PropTypes.shape({
    id: PropTypes.number,
    profile: PropTypes.number,
    name: PropTypes.string,
    lastChat: PropTypes.string,
    lastUpdated: PropTypes.string,
  }),
};

function ChatRoomListItem({ room }) {
  const navigation = useNavigation();
  const chatRoomId = 1;
  const { profile, name, lastChat, lastUpdated } = room;

  return (
    <Container onPress={() => navigation.navigate('chat-room', { chatRoomId })}>
      <Profile source={profile} />
      <ContentGroup>
        <Name numberOfLines={1}>{name}</Name>
        <LastChat numberOfLines={1}>{lastChat}</LastChat>
      </ContentGroup>
      <SubInfoGroup>
        <LastUpdated>{lastUpdated}</LastUpdated>
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

  flex-wrap: wrap;
  align-items: center;
  align-content: space-around;
  flex-direction: row;

  margin-left: ${wp(2)}px;
`;

const Name = styled.Text`
  max-width: 70%;

  color: ${COLORS.black};
  font-weight: 700;
  font-size: ${RFValue(14)}px;

  margin-right: ${wp(1)}px;
`;

const LastChat = styled.Text`
  color: ${COLORS.black};
  font-size: ${RFValue(12)}px;
  font-weight: 500;
`;

const SubInfoGroup = styled.View`
  height: 100%;
  max-width: 20%;
`;

const LastUpdated = styled.Text`
  color: ${COLORS.darkgray};
  font-size: ${RFValue(10)}px;
  font-weight: 700;
`;

export default ChatRoomListItem;

import { COLORS } from 'colors';
import { UserInfo } from 'context/UserInfoContext';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { styled } from 'styled-components/native';

ChatSideInfo.propTypes = {
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

function ChatSideInfo({ room }) {
  const {
    loginUserInfo: [loginUser],
  } = useContext(UserInfo);

  console.log(room);

  const isTutor = loginUser.isTutor;

  console.log(isTutor);

  return (
    <Container>
      <ProfileImg>
        {room && room.target.profile && (
          <Image
            source={{
              uri: room.target.profile,
            }}
            style={{ width: wp(14), height: wp(14), borderRadius: 50 }}
          />
        )}
        {!room.target.profile && <FontAwesome name={'user-circle'} size={RFValue(40)} color={'lightgray'} />}
      </ProfileImg>
      <InfoGroup>
        <Group isTutor={isTutor}>
          <GroupLabel>{isTutor ? '수강생' : '강사'}</GroupLabel>
        </Group>
        <Name>{room.target.name}</Name>
      </InfoGroup>
    </Container>
  );
}

const ProfileImg = styled.View`
  border-radius: 50%;
  margin-right: ${RFValue(5)}px;
`;

const Container = styled.View`
  flex-direction: row;

  align-items: center;
  justify-content: space-around;

  height: ${hp(10)}px;

  border-top-width: 1px;
  border-bottom-width: 1px;
  border-top-color: ${COLORS.gray};
  border-bottom-color: ${COLORS.gray};
  background-color: ${COLORS.white};
`;

const InfoGroup = styled.View`
  width: 75%;
  min-height: 70%;
  max-height: 80%;

  justify-content: space-around;
`;

const Group = styled.View`
  ${({ isTutor }) =>
    isTutor
      ? `
    width: ${wp(16)}px;
    border-radius: ${RFValue(6)}px;
    background-color: ${COLORS.gray};
  `
      : `
    width: ${wp(10)}px;
    border-radius: ${RFValue(4)}px;
    background-color: ${COLORS.main};
  `}
  padding: ${RFValue(4)}px;
  justify-content: center;
  align-items: center;
`;

const GroupLabel = styled.Text`
  color: ${COLORS.white};
  font-size: ${RFValue(8)}px;
  font-weight: 700;
`;

const Name = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 700;
`;

export default ChatSideInfo;

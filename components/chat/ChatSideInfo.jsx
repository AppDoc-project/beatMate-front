import { COLORS } from 'colors';
import { UserInfo } from 'context/UserInfoContext';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Image, Text } from 'react-native';
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
    <Container isTutor={isTutor}>
      <TopWrapper>
        <LeftWrapper>
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
        </LeftWrapper>
        {isTutor && (
          <RightWrapper>
            <ReserveBtn>
              <ReserveTxt>레슨 예약하기</ReserveTxt>
            </ReserveBtn>
          </RightWrapper>
        )}
      </TopWrapper>
      {isTutor && (
        <BottomWrapper>
          <InfoTxt>
            {' '}
            ※ 현재 수강생과의 레슨 예약을 원하면,{' '}
            <Text style={{ fontWeight: 'bold', color: COLORS.black }}>레슨 예약하기</Text> 버튼을 통해 진행해주세요.
          </InfoTxt>
        </BottomWrapper>
      )}
    </Container>
  );
}

const Container = styled.View`
  ${({ isTutor }) =>
    isTutor
      ? `
      height: ${hp(14)}px;
  `
      : `
      height: ${hp(12)}px;
  `}

  border-top-width: 1px;
  border-bottom-width: 1px;
  border-top-color: ${COLORS.gray};
  border-bottom-color: ${COLORS.gray};
  background-color: ${COLORS.white};

  justify-content: center;
`;

const TopWrapper = styled.View`
  flex-direction: row;

  align-items: center;
  justify-content: space-between;
`;

const ProfileImg = styled.View`
  border-radius: 50%;
  margin-right: ${wp(4)}px;
`;

const LeftWrapper = styled.View`
  flex-direction: row;
  margin-left: ${wp(5)}px;
  align-items: center;
`;

const InfoGroup = styled.View`
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

const RightWrapper = styled.View`
  align-items: center;
  justify-content: center;
  margin-right: ${wp(5)}px;
`;

const ReserveBtn = styled.TouchableOpacity`
  width: auto;
  height: auto;
  padding: ${RFValue(7)}px;
  background-color: ${COLORS.subBrown};
  border-radius: ${RFValue(4)}px;
`;

const ReserveTxt = styled.Text`
  color: ${COLORS.white};
  font-weight: bold;
  font-size: ${RFValue(10)};
`;

const BottomWrapper = styled.View`
  margin-left: ${wp(5)}px;
  margin-bottom: ${hp(1)}px;
`;

const InfoTxt = styled.Text`
  font-size: ${RFValue(9)};
  color: ${COLORS.gray};
`;

export default ChatSideInfo;

import { COLORS } from 'colors';
import { Auth } from 'context/AuthContext';
import React, { useContext } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { styled } from 'styled-components/native';

/**
 * 채팅 상대방의 정보를 출력하는 컴포넌트 (위에 헤더 형식으로 나타냄)
 */
function ChatSideInfo() {
  const {
    loginUserInfo: [loginUser],
  } = useContext(Auth);

  const isTutor = loginUser?.isTutor || true; // 기본값으로 true (이거 나중에 없애야함)

  // const { chatRoomId } = useRoute().params;

  return (
    <Container>
      <Profile source={require('@assets/profile.png')} />
      <InfoGroup>
        <Group isTutor={isTutor}>
          <GroupLabel>{isTutor ? '강사' : '수강생'}</GroupLabel>
        </Group>
        <Name>김연주</Name>
      </InfoGroup>
    </Container>
  );
}

const Profile = styled.Image``;

const Container = styled.View`
  flex-direction: row;

  align-items: center;
  justify-content: space-around;

  height: ${hp(10)}px;

  border-top-width: 1px;
  border-bottom-width: 1px;
  border-top-color: ${COLORS.gray01};
  border-bottom-color: ${COLORS.gray01};
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
    width: ${wp(10)}px;
    border-radius: ${RFValue(4)}px;
    background-color: ${COLORS.main};
  `
      : `
    width: ${wp(16)}px;
    border-radius: ${RFValue(6)}px;
    background-color: ${COLORS.gray01};
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

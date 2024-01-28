import { COLORS } from 'colors';
import PropTypes from 'prop-types';
import React from 'react';
import { Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';

CommentListItem.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired, // 댓글 아이디
    userId: PropTypes.number.isRequired, // 유저 아이디
    createdAt: PropTypes.string.isRequired, // 작성 시간 (LocalDateTime 형식)
    text: PropTypes.string.isRequired, // 댓글 내용
    nickName: PropTypes.string.isRequired, // 닉네임
    isTutor: PropTypes.bool.isRequired, // 튜터 여부 (true/false)
    profile: PropTypes.string.isRequired, // 프로필 주소 (null이면 기본 프로필 이미지 사용)
    childThreads: PropTypes.array.isRequired,
  }).isRequired,
};

function CommentListItem({ comment }) {
  const formattedDate = comment && comment.createdAt.substring(0, 10).replace(/:/g, '.');
  return (
    <Container>
      <FirstRow>
        <UserInfoWrapper>
          <ProfileImg>
            {comment && comment.profile && (
              <Image
                source={{
                  uri: comment.profile,
                }}
                style={{ width: 40, height: 40, borderRadius: 50 }}
              />
            )}
            {comment && !comment.profile && <FontAwesome name={'user-circle'} size={RFValue(30)} color={'lightgray'} />}
          </ProfileImg>
          <Name>{comment.nickName}</Name>
        </UserInfoWrapper>
        <RightWrapper>
          <Date>{formattedDate}</Date>
          <MaterialCommunityIcons name={'dots-vertical'} color={COLORS.lightgray01} size={RFValue(17)} />
        </RightWrapper>
      </FirstRow>
      <SecondRow>
        <CommentTxt>{comment.text}</CommentTxt>
      </SecondRow>
    </Container>
  );
}

const Container = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${COLORS.lightgray};
  padding: ${RFValue(10)}px;
  margin-left: ${wp(3)}px;
`;

const FirstRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const UserInfoWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ProfileImg = styled.View`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin-right: ${RFValue(5)}px;
`;

const Name = styled.Text`
  font-size: ${RFValue(11)}px;
  font-weight: bold;
  width: ${wp(20)}px;
  color: ${COLORS.gray};
`;

const Date = styled.Text`
  color: ${COLORS.lightgray};
  font-size: ${RFValue(11)}px;
`;

const RightWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SecondRow = styled.View`
  flex-direction: row;
  margin-left: ${wp(11)}px;
`;

const CommentTxt = styled.Text`
  flex-shrink: 1;
`;

export default CommentListItem;

import { useNavigation } from '@react-navigation/native';
import { deleteComment } from 'api/commity';
import { COLORS } from 'colors';
import { UserInfo } from 'context/UserInfoContext';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { Alert, Image, Modal, TouchableOpacity } from 'react-native';
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
  CommentData: PropTypes.object.isRequired,
  setCommentData: PropTypes.func.isRequired,
};

function CommentListItem({ comment, CommentData, setCommentData }) {
  const {
    loginUserInfo: [loginUser],
  } = useContext(UserInfo);

  const userId = loginUser.id;

  const formattedDate = comment && comment.createdAt.substring(0, 10).replace(/:/g, '.');
  const navigation = useNavigation();

  // 댓글 삭제 팝업창 띄우기
  const [commentModal, setCommentModal] = useState(false);

  // 댓글 삭제 기능
  const onPressDeleteComment = () => {
    deleteComment(comment.id)
      .then((res) => {
        console.log('삭제 성공');
        setCommentModal(false);
        const updatedComments = CommentData.data.filter((c) => c.id !== comment.id);
        setCommentData({ ...CommentData, data: updatedComments });
      })
      .catch((error) => {
        if (error.response && error.response.data.code === 408) {
          Alert.alert('알림', '로그인을 해주세요.');
          navigation.navigate('homeScreen');
        } else {
          console.log('삭제 실패', error);
        }
      });
  };

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
            {!comment.profile && <FontAwesome name={'user-circle'} size={RFValue(30)} color={'lightgray'} />}
          </ProfileImg>
          <Name>{comment.nickName}</Name>
        </UserInfoWrapper>
        <RightWrapper>
          <Date>{formattedDate}</Date>

          {userId === comment.userId && (
            <TouchableOpacity onPress={() => setCommentModal(true)}>
              <MaterialCommunityIcons name={'dots-vertical'} color={COLORS.lightgray01} size={RFValue(17)} />
            </TouchableOpacity>
          )}

          <Modal animationType="none" transparent={true} visible={commentModal}>
            <BanModal>
              <Box1 onPress={() => onPressDeleteComment()}>
                <BoxLabel color={COLORS.black}>댓글 삭제하기</BoxLabel>
              </Box1>
              <Box3 onPress={() => setCommentModal(false)}>
                <BoxLabel color={COLORS.black}>취소</BoxLabel>
              </Box3>
            </BanModal>
          </Modal>
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

const BanModal = styled.View`
  margin-left: ${wp(5)}px;
  margin-right: ${wp(5)}px;
  height: 180px;
  margin-top: ${hp(75)}px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.3);
`;

const Box1 = styled.TouchableOpacity`
  background-color: ${COLORS.white};
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  align-items: center;
  height: ${hp(6)}px;
  justify-content: center;
  margin-bottom: 1px;
`;

const Box3 = styled.TouchableOpacity`
  background-color: ${COLORS.subBrown};
  border-radius: 10px;
  align-items: center;
  height: ${hp(7)}px;
  justify-content: center;
`;

const BoxLabel = styled.Text`
  font-size: ${RFValue(18)}px;
`;

export default CommentListItem;

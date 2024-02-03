import { COLORS } from 'colors';
import React from 'react';
import { Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components';
import PropTypes from 'prop-types';

ReviewPostItem.propTypes = {
  post: PropTypes.shape({
    reviewId: PropTypes.number, // 리뷰 아이디
    userId: PropTypes.number, // 리뷰 작성자 아이디(튜티)
    nickName: PropTypes.string, // 리뷰 작성자 닉네임
    review: PropTypes.string, // 리뷰 내용
    profile: PropTypes.string, // 프로필 경로
    createdAt: PropTypes.string, // 리뷰 작성 시간
    score: PropTypes.number, // 리뷰 평점 0-5까지 정수
  }).isRequired,
};

function ReviewPostItem({ post }) {
  return (
    <ReviewBox>
      <ImageBox>
        {post.profile && (
          <Image
            source={{
              uri: post.profile,
            }}
            style={{ width: 30, height: 30, borderRadius: 50 }}
          />
        )}
        {!post.profile && <FontAwesome name={'user-circle'} size={RFValue(23)} color={'lightgray'} />}
      </ImageBox>
      <Box>
        <NickName>{post.nickName}</NickName>
        <ContentBox>
          <Content>{post.review}</Content>
          <Date>{post.createdAt}</Date>
        </ContentBox>
        <Postinfo>
          <Ionicons name="star" size={RFValue(15)} color={COLORS.main} marginRight={RFValue(3)} />
          <ScoreTxt>{post.score}</ScoreTxt>
        </Postinfo>
      </Box>
    </ReviewBox>
  );
}

const ReviewBox = styled.View`
  width: 100%;
  height: ${RFValue(90)}px;

  border-bottom-width: 1px;
  border-bottom-color: ${COLORS.lightgray};

  flex-direction: row;
`;

const ImageBox = styled.View`
  width: ${RFValue(24)}px;
  height: ${RFValue(24)}px;
  border-radius: ${RFValue(12)}px;
  overflow: hidden;

  margin: ${hp(1.6)}px ${wp(3)}px;
`;

const ProfileImage = styled(Image)`
  width: ${RFValue(24)}px;
  height: ${RFValue(24)}px;
  object-fit: cover;
`;

const Box = styled.View`
  flex-direction: column;
`;

const NickName = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 600;
  color: ${COLORS.lightgray};
  margin: ${hp(2.5)}px 0 ${hp(0.5)}px 0;
`;

const ContentBox = styled.View`
  flex-direction: row;
`;

const Content = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 500;
  color: ${COLORS.black};
  margin: ${hp(0.5)}px ${wp(1)}px ${hp(0.5)}px ${wp(0)}px;
`;

const Date = styled.Text`
  font-size: ${RFValue(10)}px;
  font-weight: 500;
  color: ${COLORS.lightgray};
  margin: ${hp(0.9)}px ${wp(0)}px ${hp(0)}px ${wp(0.4)}px;
`;

const Postinfo = styled.View`
  flex-direction: row;
`;

const ScoreTxt = styled.Text``;

export default ReviewPostItem;

import { COLORS } from 'colors';
import PropTypes from 'prop-types';
import React from 'react';
import { Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components';

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
  const formattedDate = post.createdAt.substring(0, 10).replace(/:/g, '.');

  return (
    <ReviewBox>
      <FirstRow>
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
        <NickName>{post.nickName}</NickName>
        <Date>{formattedDate}</Date>
      </FirstRow>
      <ContentBox>
        <Content>{post.review}</Content>
      </ContentBox>
      <Postinfo>
        <Ionicons name="star" size={RFValue(15)} color={COLORS.main} marginRight={RFValue(3)} />
        <ScoreTxt>{post.score}</ScoreTxt>
      </Postinfo>
    </ReviewBox>
  );
}

const ReviewBox = styled.View`
  width: auto;
  height: auto;

  border-bottom-width: 1px;
  border-bottom-color: ${COLORS.lightgray};

  padding: ${wp(3)}px;
`;

const ImageBox = styled.View`
  margin-right: ${wp(2)};
`;

const NickName = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 600;
  color: ${COLORS.lightgray};
  margin-right: ${wp(2)}px;
`;

const FirstRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ContentBox = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${hp(1)};
`;

const Content = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 500;
  color: ${COLORS.black};
  flex-grow: 1;
`;

const Date = styled.Text`
  font-size: ${RFValue(10)}px;
  font-weight: 500;
  color: ${COLORS.lightgray};
`;

const Postinfo = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${hp(1)};
`;

const ScoreTxt = styled.Text``;

export default ReviewPostItem;

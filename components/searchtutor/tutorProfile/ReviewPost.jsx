import { COLORS } from 'colors';
import React, { useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';

import ReviewModal from './ReviewModal';

function ReviewPost(props) {
  const [isLike, setLike] = useState(false);
  const [isBookmark, setBookmark] = useState(false);
  const [isReviewModal, setReviewModal] = useState(false);

  const toggleReviewModal = () => {
    setReviewModal(!isReviewModal);
  };

  const toggleLike = () => {
    setLike(!isLike);
    if (isLike) {
      console.log('Remove Like');
    } else {
      console.log('Added Like');
    }
  };

  const toggleBookmark = () => {
    setBookmark(!isBookmark);
    if (isBookmark) {
      console.log('Remove Tutor');
    } else {
      console.log('Added Tutor');
    }
  };

  return (
    <ReviewBox>
      <ImageBox>
        <ProfileImage />
      </ImageBox>
      <Box>
        <NickName>익명</NickName>
        <ContentBox>
          <Content>나는 내용이다아아아아아</Content>
          <Date>2023.12.26</Date>
        </ContentBox>
        <Postinfo>
          <TouchableOpacity onPress={toggleLike}>
            <LikeIcon
              name={isLike ? 'like1' : 'like2'}
              size={RFValue(16)}
              color={isLike ? COLORS.main : COLORS.lightgray}
              marginTop={RFValue(0.6)}
            />
          </TouchableOpacity>
          <LikeBox>12</LikeBox>
          <TouchableOpacity onPress={toggleBookmark}>
            <BookmarkIcon
              name={isBookmark ? 'heart' : 'hearto'}
              size={RFValue(15)}
              color={isBookmark ? COLORS.main : COLORS.lightgray}
            />
          </TouchableOpacity>
        </Postinfo>
      </Box>
      <DotBtn onPress={toggleReviewModal}>
        <DotIcon name={'dots-vertical'} size={RFValue(16)} color={'lightgray'} />
      </DotBtn>
      {isReviewModal && <ReviewModal onClose={toggleReviewModal} />}
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

const LikeBox = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 500;
  color: ${COLORS.black};
  margin: ${hp(0.3)}px ${wp(2)}px 0 ${wp(0.5)}px;
`;

const LikeIcon = styled(AntDesign)``;

const BookmarkIcon = styled(AntDesign)`
  margin: ${hp(0.2)}px 0 0 ${wp(2)}px;
`;

const DotBtn = styled.TouchableOpacity``;

const DotIcon = styled(MaterialCommunityIcons)`
  top: ${hp(1.6)}px;
  left: ${wp(30)}px;
`;
export default ReviewPost;

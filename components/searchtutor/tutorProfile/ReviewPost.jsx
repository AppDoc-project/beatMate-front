import { COLORS } from 'colors';
import React from 'react';
import { Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styled from 'styled-components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import userimage from '@assets/userimage.png';

function ReviewPost(props) {
  return (
    <ReviewBox>
      <ImageBox>
        <ProfileImage source={userimage} />
      </ImageBox>
      <Box>
        <NickName>익명</NickName>
        <ContentBox>
          <Content>나는 내용이다아아아아아</Content>
          <Date>2023.12.26</Date>
        </ContentBox>
        <Postinfo>
          <LikeBox>
            <LikeIcon name={'heart'} size={RFValue(11)} color={'lightgray'} />
            12
          </LikeBox>
          <BookmarkIcon name={'bookmark'} size={RFValue(13)} color={'lightgray'} />
        </Postinfo>
      </Box>
      <DotIcon name={'dots-vertical'} size={RFValue(16)} color={'lightgray'} />
    </ReviewBox>
  );
}

const ReviewBox = styled.View`
  width: 100%;
  top: ${wp(10)}px;
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
  margin: ${hp(2.6)}px ${wp(3)}px ${hp(0.5)}px ${wp(0)}px;
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
  font-size: ${RFValue(10)}px;
  font-weight: bold;
  color: ${COLORS.lightgray};
  margin: ${hp(0.5)}px ${wp(1)}px ${hp(0)}px ${wp(0)}px;
`;

const LikeIcon = styled(MaterialCommunityIcons)``;

const BookmarkIcon = styled(Feather)`
  margin: ${hp(0.5)}px ${wp(0)}px ${hp(0)}px ${wp(1)}px;
`;

const DotIcon = styled(MaterialCommunityIcons)`
  top: ${hp(1.6)}px;
  left: ${wp(30)}px;
`;
export default ReviewPost;

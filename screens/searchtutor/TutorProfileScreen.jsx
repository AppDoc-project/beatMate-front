import LessonInfoPost from '@components/searchtutor/tutorProfile/LessonInfoPost';
import ReviewPost from '@components/searchtutor/tutorProfile/ReviewPost';
import { Image } from 'react-native';
import vocal from '@assets/vocal.jpg';
import { COLORS } from 'colors';
import React, { useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styled from 'styled-components';
import ReviewItem from '@components/searchtutor/tutorProfile/ReviewItem';

function TutorProfileScreen(props) {
  const [isLessonInfo, selectLessonInfo] = useState(true);
  const [isReview, selectReview] = useState(false);

  const onPressLessonInfoBtn = () => {
    selectLessonInfo(true);
    selectReview(false);
  };

  const onPressReview = () => {
    selectLessonInfo(false);
    selectReview(true);
  };

  return (
    <Container>
      <Infosection>
        <ImageBox>
          <ProfileImage source={vocal} />
        </ImageBox>
        <Name>김철수</Name>
        <Intor>안녕하세요~ 보컬 가르치고 있는 김철수 강사 입니다.</Intor>
        <FieldBox>
          <Field>보컬</Field>
        </FieldBox>
      </Infosection>

      <SelectMenu>
        <LessonInfoBtn isLessonInfo={isLessonInfo} onPress={onPressLessonInfoBtn}>
          <LessonInfoTxt isLessonInfo={isLessonInfo}>정보</LessonInfoTxt>
        </LessonInfoBtn>
        <ReviewBtn isReview={isReview} onPress={onPressReview}>
          <ReviewTxt isReview={isReview}>후기</ReviewTxt>
        </ReviewBtn>
      </SelectMenu>

      <ShowMainInfo>
        {isLessonInfo && <LessonInfoPost />}
        {isReview && (
          <>
            <ReviewItem />
            <ReviewPost />
          </>
        )}
      </ShowMainInfo>
    </Container>
  );
}
const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.white};
`;

const Infosection = styled.View`
  flex: 0.6;
  background-color: ${COLORS.white};
  justify-content: center;
  align-items: center;
`;

const ImageBox = styled.View`
  width: ${RFValue(180)}px;
  height: ${RFValue(180)}px;
  border-radius: ${RFValue(90)}px;
  overflow: hidden;
`;

const ProfileImage = styled(Image)`
  width: ${RFValue(180)}px;
  height: ${RFValue(180)}px;
  object-fit: cover;
`;

const Name = styled.Text`
  font-size: ${RFValue(24)}px;
  font-weight: 900;
  top: ${hp(3)}px;
`;

const Intor = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 500;
  top: ${hp(5)}px;
`;

const FieldBox = styled.View``;

const Field = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 500;
  top: ${hp(7)}px;
`;

const SelectMenu = styled.View`
  flex-direction: row;
  width: 100%;
  height: ${hp(5)}px;
  justify-content: center;
  align-items: center;
`;

const LessonInfoBtn = styled.TouchableOpacity`
  width: 50%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${({ isLessonInfo }) => (isLessonInfo ? COLORS.main : COLORS.white)};

  border-width: 1px;
  border-bottom-color: ${({ isLessonInfo }) => (isLessonInfo ? COLORS.main : COLORS.lightgray)};
  border-top-color: ${({ isLessonInfo }) => (isLessonInfo ? COLORS.main : COLORS.lightgray)};
  border-left-width: 0;
  border-right-width: 0;
`;

const LessonInfoTxt = styled.Text`
  font-size: ${RFValue(15)}px;
  ${({ isLessonInfo }) =>
    isLessonInfo
      ? `
    font-weight: bold;
    color: ${COLORS.white};
    `
      : `
    font-weight: normal;
    color: ${COLORS.lightgray};
    `}
`;

const ReviewBtn = styled.TouchableOpacity`
  width: 50%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${({ isReview }) => (isReview ? COLORS.main : COLORS.white)};

  border-width: 1px;
  border-top-color: ${({ isReview }) => (isReview ? COLORS.main : COLORS.lightgray)};
  border-bottom-color: ${({ isReview }) => (isReview ? COLORS.main : COLORS.lightgray)};
  border-left-width: 0;
  border-right-width: 0;
`;

const ReviewTxt = styled.Text`
  font-size: ${RFValue(15)}px;
  ${({ isReview }) =>
    isReview
      ? `
  font-weight: bold;
  color: ${COLORS.white};
  `
      : `
  font-weight: normal;
  color: ${COLORS.lightgray};
  `}
`;

const ShowMainInfo = styled.View`
  flex: 0.4;
`;

export default TutorProfileScreen;

import vocal from '@assets/vocal.jpg';
import LessonInfoPost from '@components/searchtutor/tutorProfile/LessonInfoPost';
import ReviewItem from '@components/searchtutor/tutorProfile/ReviewItem';
import ReviewPost from '@components/searchtutor/tutorProfile/ReviewPost';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from 'colors';
import React, { useState } from 'react';
import { Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components';

function TutorProfileScreen(props) {
  const navigation = useNavigation();

  const onPressPreviousBtn = () => {
    navigation.navigate('searchTutorScreen');
  };

  const [isBookmark, setBookmark] = useState(false);

  const toggleBookmark = () => {
    setBookmark(!isBookmark);
    if (isBookmark) {
      console.log('Remove Tutor');
    } else {
      console.log('Added Tutor');
    }
  };

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
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Container>
        <Header>
          <TouchableOpacity onPress={onPressPreviousBtn}>
            <AntDesign name="left" size={32} marginLeft={5} />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleBookmark}>
            <AntDesign
              name={isBookmark ? 'heart' : 'hearto'}
              size={RFValue(24)}
              color={isBookmark ? COLORS.main : COLORS.lightgray}
              marginRight={14}
            />
          </TouchableOpacity>
        </Header>
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
        <ChatBtn>
          <ChatTxt>채팅하기</ChatTxt>
        </ChatBtn>
      </Container>
    </SafeAreaView>
  );
}
const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.white};
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Infosection = styled.View`
  flex: 0.5;
  align-items: center;
`;

const ImageBox = styled.View`
  width: ${RFValue(140)}px;
  height: ${RFValue(140)}px;
  border-radius: ${RFValue(70)}px;
  overflow: hidden;

  top: ${hp(2)}px;
`;

const ProfileImage = styled(Image)`
  width: ${RFValue(140)}px;
  height: ${RFValue(140)}px;
  object-fit: cover;
`;

const Name = styled.Text`
  font-size: ${RFValue(24)}px;
  font-weight: 900;
  top: ${hp(4)}px;
`;

const Intor = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 400;
  top: ${hp(5)}px;
`;

const FieldBox = styled.View`
  width: ${wp(12)}px;
  height: ${hp(3)}px;

  border-width: ${wp(0.4)}px;
  border-radius: ${RFValue(5)}px;
  border-color: ${COLORS.main};

  justify-content: center;
  align-items: center;

  top: ${hp(6)}px;
`;

const Field = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 600;
  color: ${COLORS.main};
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

  border-width: ${RFValue(1)}px;
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

  border-width: ${RFValue(1)}px;
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
  flex: 0.5;
`;

const ChatBtn = styled.TouchableOpacity`
  height: ${hp(5)}px;
  background-color: ${COLORS.main};

  justify-content: center;
  align-items: center;
`;

const ChatTxt = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: 600;
  color: ${COLORS.white};
`;

export default TutorProfileScreen;

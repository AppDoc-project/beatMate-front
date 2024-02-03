import LessonInfoPost from '@components/searchtutor/tutorProfile/LessonInfoPost';
import ReviewItem from '@components/searchtutor/tutorProfile/ReviewItem';
import ReviewPostList from '@components/searchtutor/tutorProfile/ReviewPostList';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getDatailTutorInfo, postPickTutor } from 'api/tutorpage';
import { COLORS } from 'colors';
import { TutorFindCategory } from 'context/TutorFindCategoryContext';
import format from 'pretty-format';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, TouchableOpacity, Image, View, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components';

function TutorProfileScreen() {
  const {
    category: [findTutorCategory, setFindTutorCategory],
  } = useContext(TutorFindCategory);

  const { koCategoryName } = findTutorCategory;

  const navigation = useNavigation();

  const route = useRoute();
  const { tutorId } = route.params;

  const onPressPreviousBtn = () => {
    navigation.goBack();
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

  // 강사 상세정보 가져오기 api
  const [specificTutorData, setSpecificTutorData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getDatailTutorInfo(tutorId)
      .then((res) => {
        console.log('강사 상세정보 가져오기', format(res.data));
        setSpecificTutorData(res.data.object);
        setIsLoading(false);
        setIsLike(specificTutorData?.pickYn || false);
      })
      .catch((err) => {
        console.log('강사 상세정보 가져오기', err);
        setIsError(true);
        setIsLoading(false);
      });
  }, [tutorId]);

  // 강사 찜 api
  const [isLike, setIsLike] = useState(false);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [isLikeError, setIsLikeError] = useState(false);

  const toggleBookmark = () => {
    setIsLikeLoading(true);

    const data = {
      tutorId: tutorId,
    };

    postPickTutor(data)
      .then((res) => {
        console.log('강사 찜하기', format(res.data));
        setIsLikeLoading(false);
        setIsLike(!isLike);
      })
      .catch((err) => {
        console.log('강사 찜하기', err);
        setIsLikeError(true);
        setIsLikeLoading(false);
      });
  };

  if (isLoading || isLikeLoading) {
    return (
      <View>
        <Text>로딩중...</Text>
      </View>
    );
  }

  if (isError || isLikeError) {
    return (
      <View>
        <Text>에러 발생</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {specificTutorData && (
        <Container>
          <Header>
            <TouchableOpacity onPress={onPressPreviousBtn}>
              <AntDesign name="left" size={32} marginLeft={5} />
            </TouchableOpacity>
            <MainTxt>{koCategoryName}</MainTxt>
            <TouchableOpacity onPress={toggleBookmark}>
              <AntDesign
                name={isLike ? 'heart' : 'hearto'}
                size={RFValue(24)}
                color={isLike ? COLORS.main : COLORS.lightgray}
                marginRight={14}
              />
            </TouchableOpacity>
          </Header>
          <InfoSection>
            <ProfileImg>
              {specificTutorData.profile && (
                <Image
                  source={{
                    uri: specificTutorData.profile,
                  }}
                  style={{ width: 80, height: 80, borderRadius: 50 }}
                />
              )}
              {!specificTutorData.profile && (
                <FontAwesome name={'user-circle'} size={RFValue(100)} color={'lightgray'} />
              )}
            </ProfileImg>

            <Name>{specificTutorData.name}</Name>
            <FieldBox>
              {specificTutorData.specialities &&
                specificTutorData.specialities.map((speciality, index) => (
                  <Field key={index}>
                    {speciality}
                    {index < specificTutorData.specialities.length - 1 && <Gap />}
                  </Field>
                ))}
            </FieldBox>
          </InfoSection>

          <SelectMenu>
            <LessonInfoBtn isLessonInfo={isLessonInfo} onPress={onPressLessonInfoBtn}>
              <LessonInfoTxt isLessonInfo={isLessonInfo}>정보</LessonInfoTxt>
            </LessonInfoBtn>
            <ReviewBtn isReview={isReview} onPress={onPressReview}>
              <ReviewTxt isReview={isReview}>후기</ReviewTxt>
            </ReviewBtn>
          </SelectMenu>

          <ShowMainInfo>
            {isLessonInfo && <LessonInfoPost description={specificTutorData.selfDescription} />}
            {isReview && (
              <>
                <ReviewItem
                  lessonCount={specificTutorData.lessonCount}
                  reviewCount={specificTutorData.reviewCount}
                  score={specificTutorData.score}
                />
                <ReviewPostList tutorId={tutorId} />
              </>
            )}
          </ShowMainInfo>
          <ChatBtn>
            <ChatTxt>채팅하기</ChatTxt>
          </ChatBtn>
        </Container>
      )}
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

const MainTxt = styled.Text`
  font-size: ${RFValue(22)}px;
  font-weight: bold;
  top: ${hp(9)};
`;

const InfoSection = styled.View`
  flex: 0.5;
  align-items: center;
`;

const ProfileImg = styled.View``;

const Name = styled.Text`
  font-size: ${RFValue(24)}px;
  font-weight: 900;
  top: ${hp(4)}px;
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
  width: ${wp(100)}px;
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

const Gap = styled.View`
  width: ${wp(1)}px;
`;

export default TutorProfileScreen;

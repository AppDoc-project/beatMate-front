import LessonInfoPost from '@components/searchtutor/tutorProfile/LessonInfoPost';
import ReviewItem from '@components/searchtutor/tutorProfile/ReviewItem';
import ReviewPostList from '@components/searchtutor/tutorProfile/ReviewPostList';
import { useNavigation, useRoute } from '@react-navigation/native';
import { makeChatRoom } from 'api/chat';
import { getDatailTutorInfo, postPickTutor } from 'api/tutorpage';
import { COLORS } from 'colors';
import { UserInfo } from 'context/UserInfoContext';
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
    loginUserInfo: [loginUser],
  } = useContext(UserInfo);

  const loginUserId = loginUser.id;
  const isTutor = loginUser.isTutor;

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
        setIsLike(res.data.object?.pickYn || false);
        setIsLoading(false);
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

  // 채팅방 만들기 api
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [isChatError, setIsChatError] = useState(false);

  const makeChat = () => {
    setIsChatLoading(true);

    let chatData;

    if (isTutor) {
      chatData = {
        tutorId: loginUserId,
        tuteeId: specificTutorData.id,
      };
    } else {
      chatData = {
        tutorId: specificTutorData.id,
        tuteeId: loginUserId,
      };
    }

    makeChatRoom(chatData)
      .then((res) => {
        console.log('채팅방 만들기', format(res.data));
        setIsChatLoading(false);
        navigation.navigate('chat');
      })
      .catch((err) => {
        console.error('채팅방 만들기', err);
        setIsChatError(true);
        setIsChatLoading(false);
      });
  };

  if (isLoading || isLikeLoading || isChatLoading) {
    return (
      <View>
        <Text>로딩중...</Text>
      </View>
    );
  }

  if (isError || isLikeError || isChatError) {
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
            {!isTutor && (
              <TouchableOpacity onPress={toggleBookmark}>
                <AntDesign
                  name={isLike ? 'heart' : 'hearto'}
                  size={RFValue(24)}
                  color={isLike || specificTutorData.pickYn ? COLORS.main : COLORS.lightgray}
                  marginRight={14}
                />
              </TouchableOpacity>
            )}
          </Header>
          <InfoSection>
            <NoticeTxt>
              ※ 해당 강사와{' '}
              <Text style={{ color: COLORS.black, fontSize: RFValue(10), fontWeight: 'bold' }}>
                레슨 상담 또는 예약
              </Text>
              을 원하면,{' '}
              <Text style={{ color: COLORS.black, fontSize: RFValue(10), fontWeight: 'bold' }}>채팅하기</Text>를
              눌러주세요.
            </NoticeTxt>
            <ProfileImg>
              {specificTutorData.profile && (
                <Image
                  source={{
                    uri: specificTutorData.profile,
                  }}
                  style={{ width: 50, height: 50, borderRadius: 50 }}
                />
              )}
              {!specificTutorData.profile && (
                <FontAwesome name={'user-circle'} size={RFValue(80)} color={'lightgray'} />
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
          {!isTutor && (
            <ChatBtn onPress={makeChat}>
              <ChatTxt>채팅하기</ChatTxt>
            </ChatBtn>
          )}
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
  align-items: center;
`;

const InfoSection = styled.View`
  width: ${wp(100)};
  height: auto;
  align-items: center;
  margin-top: ${hp(3)}px;
`;

const NoticeTxt = styled.Text`
  font-size: ${RFValue(10)}px;
  color: ${COLORS.gray};
`;

const ProfileImg = styled.View`
  margin-top: ${hp(3)}px;
`;

const Name = styled.Text`
  font-size: ${RFValue(17)}px;
  font-weight: 900;
  margin-top: ${hp(2)}px;
`;

const FieldBox = styled.View`
  width: auto;
  height: auto;
  border-width: ${wp(0.4)}px;
  border-radius: ${RFValue(5)}px;
  border-color: ${COLORS.main};
  justify-content: center;
  align-items: center;
  margin-top: ${hp(2)}px;
  margin-bottom: ${hp(2)}px;
  padding: ${wp(2)}px;
`;

const Field = styled.Text`
  font-size: ${RFValue(10)}px;
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
  height: ${hp(30)}px;
  width: ${wp(100)}px;
`;

const ChatBtn = styled.TouchableOpacity`
  height: ${hp(5)}px;
  width: ${wp(100)}px;
  background-color: ${COLORS.main};
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
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

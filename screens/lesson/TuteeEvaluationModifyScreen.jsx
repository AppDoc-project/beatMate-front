import { RegisterBtn } from '@assets/Icons/Buttons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { writeReview } from 'api/lesson';
import { COLORS } from 'colors';
import format from 'pretty-format';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AirbnbRating } from 'react-native-ratings';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components';

function TuteeEvaluationModifyScreen(props) {
  const route = useRoute();
  const { lessonData } = route.params;

  const navigation = useNavigation();

  const [content, setContent] = useState(lessonData.review || '');
  const [rating, setRating] = useState(0);

  const MAX_LENGTH = 500;

  const onChangeContent = (text) => {
    const truncatedText = text.slice(0, MAX_LENGTH);
    setContent(truncatedText);
  };

  //게시글 등록하기
  const onPressRegisterBtn = () => {
    if (content.length === 0 || content === ' ') {
      Alert.alert('알림', '내용을 입력해주세요.');
    } else {
      const data = {
        lessonId: lessonData.id,
        review: content,
        score: rating,
      };

      console.log(data);

      writeReview(data)
        .then((res) => {
          const { data } = res;
          console.log(format(data));
          navigation.navigate('lessonMainScreen');
        })
        .catch((error) => {
          if (error.response && error.response.data.code === 408) {
            Alert.alert('알림', '로그인을 해주세요.');
            navigation.navigate('homeScreen');
          } else if (error.response && error.response.data.code === 500) {
            Alert.alert('알림', '서버에러가 발생했습니다. 잠시 후 다시 시도해 주세요.');
          } else {
            console.log('게시글 등록하기 실패', error);
          }
        });
    }
  };

  const handleRating = (rating) => {
    setRating(rating);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Container>
        <Main>
          <FirstRow>
            <MainText>수강생님,</MainText>
          </FirstRow>
          <SecondRow>
            <MainText color={COLORS.main}>레슨 평가지</MainText>
            <MainText>를 입력해 주세요!</MainText>
          </SecondRow>
        </Main>
        <Rate>
          <RateTextSection>
            <SubText>레슨은 어떠셨나요?</SubText>
            <RateGuideText>별점을 매겨주세요</RateGuideText>
          </RateTextSection>
          <AirbnbRating
            selectedColor={COLORS.subMiddleblue}
            unselectedColor={COLORS.gray01}
            reviewColor={COLORS.black}
            reviews={[1, 2, 3, 4, 5]}
            size={RFValue(22)}
            reviewSize={RFValue(17)}
            onFinishRating={handleRating}
          />
        </Rate>
        <Review>
          <SubText>레슨 후기를 작성해 주세요.</SubText>
          <ReviewGuideText>(작성해주신 후기는 강사님의 프로필 상에 보여지게 됩니다.)</ReviewGuideText>
          <ContentInput
            onChangeText={onChangeContent}
            value={content}
            placeholder="레슨 후기를 입력하세요. (최대 1000자)"
            placeholderTextColor="lightgray"
            multiline
          />
          <TextCount>
            {content.length}/{MAX_LENGTH} 자
          </TextCount>
        </Review>
        <RegisterBtn
          fontColor={content.length > 0 ? 'white' : 'navy'}
          backColor={content.length > 0 ? 'navy' : 'white'}
          width={wp(100)}
          justifyContent="center"
          onPress={onPressRegisterBtn}
        />
      </Container>
    </SafeAreaView>
  );
}
const Container = styled(KeyboardAwareScrollView)`
  flex: 1;
  background-color: ${COLORS.white};
`;

const Main = styled.View`
  flex: 0.1;
  margin: ${RFValue(10)}px ${RFValue(18)}px;
`;

const FirstRow = styled.View``;

const SecondRow = styled.View`
  flex-direction: row;
`;

const MainText = styled.Text`
  font-size: ${RFValue(20)}px;
  font-weight: 900;
  color: ${(props) => props.color || COLORS.black};
`;

const Rate = styled.View`
  flex: 0.15;
  margin: ${RFValue(10)}px ${RFValue(18)}px;
`;

const RateTextSection = styled.View`
  flex-direction: row;
  margin-bottom: ${RFValue(10)}px;
`;

const SubText = styled.Text`
  font-size: ${RFValue(18)}px;
  font-weight: 900;
  margin: ${RFValue(5)}px 0;
`;

const Review = styled.View`
  flex: 0.75;
  margin: ${RFValue(10)}px ${RFValue(18)}px ${RFValue(20)}px ${RFValue(18)}px;
`;

const RateGuideText = styled.Text`
  font-size: ${RFValue(10)}px;
  font-weight: 600;
  color: ${COLORS.lightgray};

  align-self: center;
  margin-left: ${RFValue(10)}px;
`;

const ReviewGuideText = styled.Text`
  font-size: ${RFValue(10)}px;
  font-weight: 600;
  color: ${COLORS.lightgray};
  margin-bottom: ${RFValue(10)}px;
`;

const ContentInput = styled.TextInput`
  background-color: transparent;

  width: ${wp(90)}px;
  height: ${hp(25)}px;
  border-width: ${RFValue(1)}px;
  border-radius: ${RFValue(5)}px;
  border-color: ${COLORS.lightgray};

  font-size: ${RFValue(12)}px;

  padding: ${RFValue(10)}px;
`;

const TextCount = styled.Text`
  font-size: ${RFValue(10)}px;
  font-weight: 600;
  color: ${COLORS.lightgray};
  margin: ${RFValue(3)}px;
`;

export default TuteeEvaluationModifyScreen;

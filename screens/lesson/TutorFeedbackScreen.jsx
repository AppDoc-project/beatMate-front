import { RegisterBtn } from '@assets/Icons/Buttons';
import LessonInfoContent from '@components/lesson/notYetWroteItem/LessonInfoContent';
import { useNavigation, useRoute } from '@react-navigation/native';
import { writeFeedBack } from 'api/lesson';
import { COLORS } from 'colors';
import format from 'pretty-format';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components';

function TutorFeedbackScreen(props) {
  const route = useRoute();
  const { notWriteData } = route.params;

  const navigation = useNavigation();

  const [content, setContent] = useState('');

  const MAX_LENGTH = 1000;

  const onChangeContent = (text) => {
    // 글자 수 제한 함수
    const truncatedText = text.slice(0, MAX_LENGTH);
    setContent(truncatedText);
  };

  //게시글 등록하기
  const onPressRegisterBtn = () => {
    if (content.length === 0 || content === ' ') {
      Alert.alert('알림', '내용을 입력해주세요.');
    } else {
      const data = {
        lessonId: notWriteData.id,
        feedback: content,
      };

      console.log(data);

      writeFeedBack(data)
        .then((res) => {
          const { data } = res;
          console.log(format(data));
          navigation.navigate('lessonMainScreen');
        })
        .catch((error) => console.log(format(error)));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Container>
        <Main>
          <FirstRow>
            <MainText>강사님,</MainText>
          </FirstRow>
          <SecondRow>
            <MainText color={COLORS.main}>레슨 피드백지</MainText>
            <MainText>를 입력해 주세요!</MainText>
          </SecondRow>
        </Main>
        <TuteeInfo>
          <SubText>수강생 정보</SubText>
          <TuteeInfoBox>
            <LessonInfoContent notWriteData={notWriteData} />
          </TuteeInfoBox>
        </TuteeInfo>
        <LessonFeedback>
          <SubText>레슨 피드백을 입력해주세요.</SubText>
          <ContentInput
            onChangeText={onChangeContent}
            placeholder="레슨 피드백을 입력하세요. (최대 1000자)"
            placeholderTextColor="lightgray"
            multiline
          />
          <TextCount>
            {content.length}/{MAX_LENGTH} 자
          </TextCount>
        </LessonFeedback>
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

const TuteeInfo = styled.View`
  margin: ${RFValue(10)}px ${RFValue(18)}px;
`;

const SubText = styled.Text`
  font-size: ${RFValue(17)}px;
  font-weight: 900;
  margin-bottom: ${RFValue(5)}px;
`;

const TuteeInfoBox = styled.View`
  height: ${hp(20)}px;
  width: ${wp(90)}px;
  border-width: ${RFValue(1)}px;
  border-radius: ${RFValue(10)}px;
  border-color: ${COLORS.lightgray};

  padding: ${RFValue(10)}px;
`;

const LessonFeedback = styled.View`
  margin: ${RFValue(10)}px ${RFValue(18)}px ${RFValue(30)}px ${RFValue(18)}px;
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
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: ${RFValue(10)}px;
  font-weight: 600;
  color: ${COLORS.lightgray};
`;

export default TutorFeedbackScreen;

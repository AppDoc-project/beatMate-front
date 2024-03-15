import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS } from 'colors';
import { UserInfo } from 'context/UserInfoContext';
import React, { useContext } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AirbnbRating } from 'react-native-ratings';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components';

function LessonEvaluationScreen(props) {
  const route = useRoute();
  const { lessonData } = route.params;

  const {
    loginUserInfo: [loginUser],
  } = useContext(UserInfo);
  const isTutor = loginUser.isTutor;

  const navigation = useNavigation();

  const onPressPreviousBtn = () => {
    navigation.navigate('lessonScheduleScreen');
  };

  const onPressEvaluationModify = () => {
    navigation.navigate('tuteeEvaluationModifyScreen', { lessonData });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Container>
        <AntDesign name="left" size={32} marginLeft={5} onPress={onPressPreviousBtn} />

        <Header>
          <HeaderTitle>
            <HeaderText1>{lessonData.tuteeName}님의 </HeaderText1>
            <HeaderText2 color={COLORS.main}>레슨 평가지</HeaderText2>
          </HeaderTitle>
        </Header>
        <Body>
          <Rate>
            <SubText1>레슨 평점</SubText1>
            <AirbnbRating
              selectedColor={COLORS.subMiddleblue}
              unselectedColor={COLORS.gray01}
              reviewColor={COLORS.black}
              reviews={[1, 2, 3, 4, 5]}
              size={RFValue(22)}
              reviewSize={RFValue(17)}
              defaultRating={lessonData.score}
              isDisabled={true}
            />
          </Rate>
          <Review>
            <SubText>레슨 후기</SubText>
            <ReviewBox>
              {lessonData.review ? (
                <ReveiwText>{lessonData.review}</ReveiwText>
              ) : (
                <ReveiwText>아직 수강생님이 후기를 작성하지 않았습니다.</ReveiwText>
              )}
            </ReviewBox>
          </Review>

          {!isTutor && (
            <Btn>
              <ModifyBtn onPress={onPressEvaluationModify}>
                <ModifyText>수정하기</ModifyText>
              </ModifyBtn>
            </Btn>
          )}
        </Body>
      </Container>
    </SafeAreaView>
  );
}

const Container = styled(KeyboardAwareScrollView)`
  flex: 1;
  background-color: ${COLORS.white};
`;

const Header = styled.View`
  justify-items: center;
  align-items: center;
  margin-bottom: ${hp(5)}px;
`;

const HeaderTitle = styled.View`
  flex-direction: row;
`;

const HeaderText1 = styled.Text`
  font-size: ${RFValue(18)}px;
  font-weight: 600;
  color: ${(props) => props.color || COLORS.black};
`;

const HeaderText2 = styled.Text`
  font-size: ${RFValue(18)}px;
  font-weight: 900;
  color: ${(props) => props.color || COLORS.black};
`;

const Body = styled.View`
  justify-content: center;
  align-items: center;
`;

const Rate = styled.View`
  margin-bottom: ${hp(3)}px;
`;

const SubText1 = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: 900;
  margin-left: ${wp(-24)}px;
`;

const SubText = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: 900;
  margin-bottom: ${hp(1)}px;
`;

const Review = styled.View`
  margin-bottom: ${hp(5)}px;
`;

const ReviewBox = styled.View`
  width: ${wp(90)}px;
  border-width: ${RFValue(1)}px;
  border-radius: ${RFValue(5)}px;
  border-color: ${COLORS.lightgray};

  padding: ${wp(4)}px;
  max-height: auto;
`;

const ReveiwText = styled.Text`
  font-size: ${RFValue(12)}px;
  flex-shrink: 1;
`;

const Btn = styled.View``;

const ModifyBtn = styled.TouchableOpacity`
  width: ${wp(22)}px;
  height: ${hp(4)}px;
  border-radius: ${RFValue(5)}px;
  background-color: ${COLORS.subMiddleblue};

  justify-content: center;
  align-items: center;
`;

const ModifyText = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 500;
  color: ${COLORS.white};
`;

export default LessonEvaluationScreen;

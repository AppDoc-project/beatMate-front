import { useNavigation } from '@react-navigation/native';
import { COLORS } from 'colors';
import { UserInfo } from 'context/UserInfoContext';
import React, { useContext, useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components';

function LessonEvaluationScreen(props) {
  const {
    loginUserInfo: [loginUser],
  } = useContext(UserInfo);
  const isTutor = loginUser.isTutor;

  const navigation = useNavigation();

  const [content] = useState('');
  const MAX_LENGTH = 1000;

  const onPressPreviousBtn = () => {
    navigation.navigate('lessonScheduleScreen');
  };

  const onPressEvaluationModify = () => {
    navigation.navigate('tuteeEvaluationScreen');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Container>
        <Header>
          <AntDesign name="left" size={32} marginLeft={5} onPress={onPressPreviousBtn} />
          <HeaderTitle>
            <HeaderText>OO님의 </HeaderText>
            <HeaderText color={COLORS.main}>레슨 평가지</HeaderText>
          </HeaderTitle>
        </Header>
        <Rate>
          <RateTextSection>
            <SubText>레슨 별점</SubText>
          </RateTextSection>
          <Ionicons name="star-outline" size={40} />
        </Rate>
        <Review>
          <SubText>레슨 후기 내용</SubText>
          <ReviewGuideText>(작성해주신 후기는 강사님의 프로필 상에 보여지게 됩니다.)</ReviewGuideText>
          <ReviewBox>
            <ReveiwText></ReveiwText>
          </ReviewBox>
          <TextCount>
            {content.length}/{MAX_LENGTH} 자
          </TextCount>
        </Review>
        {!isTutor && (
          <Btn>
            <ModifyBtn onPress={onPressEvaluationModify}>
              <ModifyText>수정하기</ModifyText>
            </ModifyBtn>
          </Btn>
        )}
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
`;

const HeaderTitle = styled.View`
  flex-direction: row;
`;

const HeaderText = styled.Text`
  font-size: ${RFValue(20)}px;
  font-weight: 900;
  color: ${(props) => props.color || COLORS.black};
`;

const Rate = styled.View`
  flex: 0.13;
  margin: ${RFValue(20)}px ${RFValue(18)}px;
`;

const RateTextSection = styled.View`
  flex-direction: row;
`;

const SubText = styled.Text`
  font-size: ${RFValue(18)}px;
  font-weight: 900;
  margin: ${RFValue(5)}px 0;
`;

const Review = styled.View`
  flex: 0.9;
  margin: ${RFValue(10)}px ${RFValue(18)}px ${RFValue(30)}px ${RFValue(18)}px;
`;

const ReviewGuideText = styled.Text`
  font-size: ${RFValue(10)}px;
  font-weight: 600;
  color: ${COLORS.lightgray};
  margin-bottom: ${RFValue(10)}px;
`;

const ReviewBox = styled.ScrollView`
  width: ${wp(90)}px;
  height: ${hp(50)}px;
  border-width: ${RFValue(1)}px;
  border-radius: ${RFValue(5)}px;
  border-color: ${COLORS.lightgray};

  padding: ${RFValue(10)}px;
`;

const ReveiwText = styled.Text`
  font-size: ${RFValue(12)}px;
`;

const TextCount = styled.Text`
  font-size: ${RFValue(10)}px;
  font-weight: 600;
  color: ${COLORS.lightgray};
  margin: ${RFValue(3)}px;
`;

const Btn = styled.View`
  flex: 0.07;
`;

const ModifyBtn = styled.TouchableOpacity`
  width: ${wp(22)}px;
  height: ${hp(4)}px;
  border-radius: ${RFValue(5)}px;
  background-color: ${COLORS.subMiddleblue};
  margin-left: ${RFValue(250)}px;

  justify-content: center;
  align-items: center;
`;

const ModifyText = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 500;
  color: ${COLORS.white};
`;

export default LessonEvaluationScreen;

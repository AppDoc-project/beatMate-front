import { useNavigation } from '@react-navigation/native';
import { COLORS } from 'colors';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styled from 'styled-components';

function CurrentOnlineLesson(props) {
  const navigation = useNavigation();
  const videoNavi = () => {
    navigation.navigate('videoScreen');
  };
  return (
    <Container>
      <Box>
        <Info>
          <LabelText>수강생 이름 : </LabelText>
          <ValueText>김철수</ValueText>
        </Info>
        <Info>
          <LabelText>레슨 방식 : </LabelText>
          <ValueText>화상 레슨</ValueText>
        </Info>
        <Lesson>
          <OnlineBtn onPress={videoNavi}>
            <OnlineBtnText>방 입장하기</OnlineBtnText>
          </OnlineBtn>
          <GuideText>(클릭 시 화상 채팅 방으로 입장됩니다.)</GuideText>
        </Lesson>
      </Box>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  bakcground-color: ${COLORS.white};
  justify-content: center;
  align-items: center;
`;

const Box = styled.View`
  width: ${wp(80)}px;
  height: ${hp(14)}px;
  border-width: ${RFValue(3)}px;
  border-radius: ${RFValue(10)}px;
  border-color: ${COLORS.main};

  padding: ${RFValue(12)}px;
`;

const Info = styled.View`
  flex-direction: row;
  margin: 0 0 ${RFValue(5)}px 0;
`;

const LabelText = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 700;
`;

const ValueText = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 600;
  margin-top: ${RFValue(2.5)}px;
`;

const Lesson = styled.View`
  justify-content: center;
  align-items: center;
`;

const OnlineBtn = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin: ${RFValue(4)}px 0 ${RFValue(2)}px 0;
`;

const OnlineBtnText = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 600;
  color: ${COLORS.subMiddleblue};

  text-decoration-line: underline;
`;

const GuideText = styled.Text`
  font-size: ${RFValue(8)}px;
  font-weight: 600;
  color: ${COLORS.lightgray};
`;

export default CurrentOnlineLesson;

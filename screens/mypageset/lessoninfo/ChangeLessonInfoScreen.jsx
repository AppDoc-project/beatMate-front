import { COLORS } from 'colors';
import React, { useState } from 'react';
import styled from 'styled-components';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';

function ChangeLessonInfoScreen(props) {
  const [beforeLessonInfo, setBeforeLessonInfo] = useState('');
  const [lessonInfo, setLessonInfo] = useState('');
  const [beforeProfile, setBeforeProfile] = useState('');
  const [profile, setProfile] = useState('');

  const onPressChangeBtn = () => {};
  
  return (
    <Container>
      <FirstSection>
        <Txt>변경된 레슨 정보를 입력해주세요.</Txt>
        <TextInput placeholder={setBeforeLessonInfo} value={lessonInfo} onChangeText={setLessonInfo} />
      </FirstSection>
      <SecondSection>
        <Txt>변경된 강사 약력을 입력해주세요.</Txt>
        <TextInput placeholder={setBeforeProfile} value={profile} onChangeText={setProfile} />
      </SecondSection>
      <ChangeBtn
        fontColor={lessonInfo && profile ? 'white' : COLORS.main}
        backColor={lessonInfo && profile ? COLORS.main : 'white'}
        width={wp(90.4)}
        marginBottom={hp(6.15)}
        marginTop={hp(8)}
        justifyContent="center"
        onPress={onPressChangeBtn}
      >
        <BtnText>변경하기</BtnText>
      </ChangeBtn>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const FirstSection = styled.View`
  position: absolute;
  top: ${hp(13)}px;

  margin-left: ${wp(4.8)}px;
  margin-right: ${wp(4.8)}px;
`;

const SecondSection = styled.View`
  position: absolute;
  top: ${hp(33)}px;

  margin-left: ${wp(4.8)}px;
  margin-right: ${wp(4.8)}px;
`;

const Txt = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: bold;
`;

const TextInput = styled.TextInput`
  height: ${hp(5)}px;
  width: ${wp(90)}px;
  border-width: 1px;
  border-radius: 10px;
  border-color: ${COLORS.lightgray};
  margin-top: ${hp(1)}px;
  padding: 0 ${wp(2)}px;
`;

const ChangeBtn = styled.TouchableOpacity`
  width: ${wp(90.4)}px;
  height: ${hp(5)}px;
  border: 2px;
  border-radius: ${wp(3)}px;
  border-color: ${COLORS.main};
  border-style: solid;

  padding: ${hp(1)}px;
  margin: ${hp(2)}px ${wp(4.8)}px;

  position: absolute;
  bottom: ${hp(3)}px;
`;

const BtnText = styled.Text`
  color: ${COLORS.main};
  font-size: ${RFValue(16)}px;
  font-weight: bold;
  text-align: center;
`;

export default ChangeLessonInfoScreen;

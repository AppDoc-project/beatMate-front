import { ChangeBtn } from '@assets/Icons/Buttons';
import { useNavigation } from '@react-navigation/native';
import { changeDescription } from 'api/mypage';
import { COLORS } from 'colors';
import format from 'pretty-format';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components/native';

function ChangeIntroScreen(props) {
  const navigation = useNavigation();

  const [changedSelfDescription, setSelfDescription] = useState('');

  const onChangeIntroduction = (text) => setSelfDescription(text);

  const onPressPreviousBtn = () => {
    setSelfDescription('');
    navigation.goBack();
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const onPressChangeBtn = () => {
    //자기소개 변경 api
    setIsLoading(true);
    const data = {
      selfDescription: changedSelfDescription,
    };

    changeDescription(data)
      .then((res) => {
        console.log('자기소개 변경', format(res.data));
        setIsLoading(false);
        navigation.goBack();
      })
      .catch((err) => {
        console.log('자기소개 변경', err);
        setIsError(true);
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return (
      <View>
        <Text>로딩중...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View>
        <Text>에러 발생</Text>
      </View>
    );
  }

  return (
    <Container>
      <AntDesign name="left" size={32} marginLeft={5} top={40} onPress={onPressPreviousBtn} />

      <Section>
        <Txt>변경된 자기소개를 입력해주세요.</Txt>
        <TextInput placeholder={beforeSelfIntro} value={selfDescription} onChangeText={setSelfDescription} />
      </Section>
      <BottomContainer>
        <ChangeBtn
          fontColor={changedSelfDescription ? COLORS.white : COLORS.main}
          backColor={changedSelfDescription ? COLORS.main : COLORS.white}
          width={wp(100)}
          justifyContent="center"
          onPress={onPressChangeBtn}
        />
      </BottomContainer>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Section = styled.View`
  position: absolute;
  top: ${hp(13)}px;
  margin-left: ${wp(4.8)}px;
  margin-right: ${wp(4.8)}px;
`;

const Txt = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: bold;
`;

const ChangeInput = styled.TextInput`
  height: ${hp(5)}px;
  width: ${wp(90)}px;
  border-width: 1px;
  border-radius: 10px;
  border-color: ${COLORS.lightgray};
  margin-top: ${hp(1)}px;
  padding: 0 ${wp(2)}px;
`;

const BottomContainer = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
`;

export default ChangeIntroScreen;

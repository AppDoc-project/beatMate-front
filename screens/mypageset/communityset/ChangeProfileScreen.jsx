import { ChangeBtn } from '@assets/Icons/Buttons';
import UploadImages from '@components/mypage/mypageSetScreen/UploadImages';
import { useNavigation } from '@react-navigation/native';
import { changeProfile } from 'api/mypage';
import { COLORS } from 'colors';
import format from 'pretty-format';
import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components/native';

function ChangeProfileScreen(props) {
  const [profileAddress, setProfileAddress] = useState('');

  const navigation = useNavigation();

  const onPressPreviousBtn = () => {
    setProfileAddress('');
    navigation.goBack();
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const onPressChangeBtn = () => {
    //자기소개 변경 api
    setIsLoading(true);
    const data = {
      profile: profileAddress,
    };

    changeProfile(data)
      .then((res) => {
        console.log('프로필 이미지 변경', format(res.data));
        setIsLoading(false);
        navigation.goBack();
      })
      .catch((error) => {
        if (error.response && error.response.data.code === 408) {
          Alert.alert('알림', '로그인을 해주세요.');
          navigation.navigate('homeScreen');
        } else {
          console.log('프로필 이미지 변경 실패', error);
          setIsError(true);
        }
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
        <Txt>변경하실 프로필 사진을 첨부해주세요.</Txt>
      </Section>
      <Image>
        <StyledUploadImages addresses={profileAddress} setAddresses={setProfileAddress} />
      </Image>
      <BottomContainer>
        <ChangeBtn
          fontColor={profileAddress ? COLORS.white : COLORS.main}
          backColor={profileAddress ? COLORS.main : COLORS.white}
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
  top: ${hp(13)}px;
  margin-left: ${wp(4.8)}px;
  margin-right: ${wp(4.8)}px;
`;

const Txt = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: bold;
`;

const Image = styled.View`
  margin-top: ${hp(15)}px;
`;

const BottomContainer = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const StyledUploadImages = styled(UploadImages)``;

export default ChangeProfileScreen;

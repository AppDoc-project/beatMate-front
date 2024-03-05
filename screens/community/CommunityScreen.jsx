import { WriteBtn } from '@assets/Icons/Buttons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getCommunitySection } from 'api/commity';
import { COLORS } from 'colors';
import format from 'pretty-format';
import React, { useState } from 'react';
import { Text, View, SafeAreaView, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styled from 'styled-components/native';

function CommunityScreen() {
  const navigation = useNavigation();

  //게시판 리스트 조회 API
  const [SectionData, setSectionData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const writeNewPost = () => {
    navigation.navigate('writeNewPostScreen');
  };

  const moveSpecificScreen = (communityId, name) => {
    navigation.navigate('communitySpecificScreen', { communityId, name });
  };

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      getCommunitySection()
        .then((res) => {
          console.log(format(res.data));
          setSectionData(res.data);
          setIsLoading(false);
          setIsError(false);
        })
        .catch((error) => {
          if (error.response && error.response.data.code === 408) {
            Alert.alert('알림', '로그인을 해주세요.');
            navigation.navigate('homeScreen');
          } else if (error.response && error.response.data.code === 500) {
            Alert.alert('알림', '서버에러가 발생했습니다. 잠시 후 다시 시도해 주세요.');
          } else {
            console.log('게시글 가져오기 실패', error);
            setIsError(true);
          }
          setIsLoading(false);
        });
    }, [setIsLoading, setSectionData, setIsError]),
  );

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
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Container>
        <Wrapper>
          <MainTxt>커뮤니티</MainTxt>

          {SectionData && SectionData.data && (
            <Grid>
              {SectionData.data.map((item) => (
                <Item key={item.id} onPress={() => moveSpecificScreen(item.id, item.name)}>
                  <ItemName>{item.name}</ItemName>
                </Item>
              ))}
            </Grid>
          )}

          <Btn onPress={writeNewPost}>
            <WriteBtn />
          </Btn>
        </Wrapper>
      </Container>
    </SafeAreaView>
  );
}

const Container = styled(KeyboardAwareScrollView)`
  flex: 1;
  background-color: white;
`;

const Wrapper = styled.View`
  align-items: center;
`;

const MainTxt = styled.Text`
  font-size: ${RFValue(22)}px;
  font-weight: bold;
  top: ${hp(9)};
`;

const Grid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: ${hp(20)}px;
  margin-right: ${wp(5)}px;
  margin-left: ${wp(5)}px;
`;

const Item = styled.TouchableOpacity`
  width: ${wp(25)}px;
  height: ${wp(25)}px;
  align-items: center;
  justify-content: center;
  margin-bottom: ${hp(2)}px;
  background-color: ${COLORS.white};
  border-color: ${COLORS.main};
  border-radius: 10px;
  border-width: 3px;
`;

const ItemName = styled.Text`
  font-size: ${RFValue(15)}px;
  font-weight: bold;
`;

const Btn = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  bottom: 20px;
`;

export default CommunityScreen;

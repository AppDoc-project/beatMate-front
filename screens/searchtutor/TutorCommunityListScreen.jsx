import { useNavigation } from '@react-navigation/native';
import { COLORS } from 'colors';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styled from 'styled-components/native';

function TutorCommunityListScreen() {
  const navigation = useNavigation();

  const SectionData = [
    { speciality: '피아노', english: 'PIANO' },
    { speciality: '기타', english: 'GUITAR' },
    { speciality: '보컬', english: 'VOCAL' },
    { speciality: '드럼', english: 'DRUM' },
    { speciality: '베이스', english: 'BASS' },
    { speciality: '음악이론', english: 'MUSIC_THEORY' },
    { speciality: '작곡', english: 'COMPOSITION' },
    { speciality: '관악기', english: 'WIND_INSTRUMENT' },
    { speciality: '현악기', english: 'STRING_INSTRUMENT' },
    { speciality: '건반악기', english: 'KEYBOARD_INSTRUMENT' },
  ];

  const moveSpecificScreen = (speciality, english) => {
    navigation.navigate('getSearchOptionScreen', { speciality, english });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Container>
        <Wrapper>
          <MainTxt>카테고리를 먼저 선택해주세요.</MainTxt>

          {SectionData && (
            <Grid>
              {SectionData.map((item) => (
                <Item key={item.english} onPress={() => moveSpecificScreen(item.speciality, item.english)}>
                  <ItemName>{item.speciality}</ItemName>
                </Item>
              ))}
            </Grid>
          )}
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

export default TutorCommunityListScreen;

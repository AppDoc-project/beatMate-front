import { ContinueBtn } from '@assets/SignUp/SelectUserScreen';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS } from 'colors';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { styled } from 'styled-components/native';

function GetSearchOptionScreen(props) {
  const navigation = useNavigation();
  const route = useRoute();

  const { communityId, name } = route.params; //선택한 커뮤니티와 커뮤니티 이름

  const [isName, setIsName] = useState(false); // 이름 선택 옵션 버튼 클릭
  const [isSearchOption, setIsSearchOption] = useState(false); // 검색 옵션 버튼 클릭

  const [searchTutorName, setSearchTutorName] = useState('');
  const onChangeTutorName = (text) => setSearchTutorName(text);

  const [searchType, setSearchType] = useState('');

  const onPressPreviousBtn = () => {
    setSearchTutorName('');
    setIsName(false);
    setIsSearchOption(false);
    setSearchType('');
    navigation.goBack();
  };

  const onPressContinueBtn = () => {
    if (searchType || searchTutorName) {
      setSearchTutorName('');
      setIsName(false);
      setIsSearchOption(false);
      setSearchType('');
      navigation.navigate('searchTutorScreen', { communityId, name, searchTutorName, searchType });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Container>
        <AntDesign name="left" size={32} marginLeft={5} onPress={onPressPreviousBtn} />

        <ContentContainer>
          <MainInfoContainer>
            <MainInfoTxt1>사용자님,</MainInfoTxt1>
            <MainInfoTxt2>검색 조건을 입력해주세요!</MainInfoTxt2>
          </MainInfoContainer>
          <SubTitleTxt>※ 2가지 옵션 중 오직 1개만 설정 가능합니다.</SubTitleTxt>
          <WholeWrapper>
            <SelectCategoryWrapper>
              <CategoryBtn
                onPress={() => {
                  setIsName(true);
                  setIsSearchOption(false);
                  setSearchType('');
                }}
                selected={isName}
              >
                <CategoryTxt selected={isName}>강사 이름으로 검색하기</CategoryTxt>
              </CategoryBtn>

              <CategoryBtn
                onPress={() => {
                  setIsName(false);
                  setIsSearchOption(true);
                  setSearchTutorName('');
                }}
                selected={isSearchOption}
              >
                <CategoryTxt selected={isSearchOption}>정렬 조건대로 정렬하기</CategoryTxt>
              </CategoryBtn>
            </SelectCategoryWrapper>
          </WholeWrapper>
          <Info>
            {isName && (
              <Component>
                <Txt>검색하실 강사 이름을 입력해주세요.</Txt>
                <SubTxt>이름을 정확히 모두 입력해주세요.</SubTxt>
                <Input value={searchTutorName} onChangeText={onChangeTutorName} />
              </Component>
            )}
            {isSearchOption && (
              <Component>
                <Txt>정렬 조건을 선택해주세요</Txt>
                <SubTxt>한가지만 선택 가능합니다.</SubTxt>
                <WholeWrapper>
                  <SelectCategoryWrapper>
                    <CategoryBtn onPress={() => setSearchType('PICK')} selected={searchType === 'PICK'}>
                      <CategoryTxt selected={searchType === 'PICK'}>찜 많은 순</CategoryTxt>
                    </CategoryBtn>

                    <CategoryBtn onPress={() => setSearchType('LESSON')} selected={searchType === 'LESSON'}>
                      <CategoryTxt selected={searchType === 'LESSON'}>레슨 횟수 많은 순</CategoryTxt>
                    </CategoryBtn>

                    <CategoryBtn onPress={() => setSearchType('SCORE')} selected={searchType === 'SCORE'}>
                      <CategoryTxt selected={searchType === 'SCORE'}>평점 높은 순</CategoryTxt>
                    </CategoryBtn>
                  </SelectCategoryWrapper>
                </WholeWrapper>
              </Component>
            )}
          </Info>

          <StyledContinueBtn
            fontColor={searchTutorName || searchType ? 'white' : 'navy'}
            backColor={searchTutorName || searchType ? 'navy' : 'white'}
            width={wp(100)}
            marginBottom={hp(6.15)}
            justifyContent="center"
            onPress={() => {
              onPressContinueBtn();
            }}
          />
        </ContentContainer>
      </Container>
    </SafeAreaView>
  );
}

const Container = styled(KeyboardAwareScrollView)`
  flex: 1;
  background-color: white;
`;

const ContentContainer = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const MainInfoContainer = styled.View`
  margin-left: ${wp(4.8)}px;
  margin-top: ${hp(5)}px;
`;

const MainInfoTxt1 = styled.Text`
  font-size: ${RFValue(22)}px;
  font-weight: bold;
`;

const MainInfoTxt2 = styled.Text`
  font-size: ${RFValue(22)}px;
  font-weight: bold;
  color: navy;
  margin-top: ${hp(1)}px;
`;

const SubTitleTxt = styled.Text`
  color: ${COLORS.gray};
  margin-left: ${wp(4.8)}px;
  margin-top: ${hp(1.23)}px;
  margin-bottom: ${hp(3)}px;
  font-size: ${RFValue(13)}px;
`;

const WholeWrapper = styled.View`
  align-items: center;
`;

const SelectCategoryWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: ${wp(80)}px;
  margin-bottom: ${hp(10)}px;
`;

const CategoryBtn = styled.TouchableOpacity`
  top: ${hp(1.5)}px;
  width: auto;
  height: auto;
  border-radius: ${RFValue(8)}px;
  border-color: ${(props) => (props.selected ? COLORS.main : COLORS.lightgray)};
  border-width: 1px;
  justify-content: center;
  align-items: center;
  padding: ${RFValue(10)}px;
`;

const CategoryTxt = styled.Text`
  color: ${(props) => (props.selected ? COLORS.main : COLORS.lightgray)};
`;

const SubTxt = styled.Text`
  color: lightgray;
  font-size: ${RFValue(13)}px;
  margin-top: ${hp(1)}px;
  margin-bottom: ${hp(1)}px;
`;

const Info = styled.View`
  flex: 1;
`;

const Component = styled.View`
  margin-left: ${wp(4.8)}px;
`;

const Txt = styled.Text`
  font-weight: bold;
  font-size: ${RFValue(16)}px;
`;

const Input = styled.TextInput`
  background-color: transparent;
  position: relative;

  top: ${hp(1.5)}px;
  width: ${wp(90.4)}px;
  height: ${hp(5)}px;
  border-radius: 8px;
  border-color: lightgray;
  border-width: 1px;

  padding-left: ${RFValue(4)}px;
  font-size: ${RFValue(16)}px;
  font-weight: bold;
  padding: ${RFValue(10)}px;
  margin-bottom: ${hp(10)}px;
`;

const StyledContinueBtn = styled(ContinueBtn)`
  margin-top: auto;
`;

export default GetSearchOptionScreen;

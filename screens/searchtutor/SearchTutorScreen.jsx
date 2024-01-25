import CommunityCategoryModal from '@components/searchtutor/CommunityCategoryModal';
import SearchOptionModal from '@components/searchtutor/SearchOptionModal';
import SearchTutorItem from '@components/searchtutor/SearchTutorItem';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from 'colors';
import React, { useState } from 'react';
import { SafeAreaView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components';

function SearchTutorScreen() {
  const navigation = useNavigation();

  const TutorProfile = () => {
    navigation.navigate('tutorProfileScreen');
  };

  const [searchTutor, setSearchTutor] = useState('');
  const [isCategoryModal, setCategoryModal] = useState(false);
  const [isSearchModal, setSearchModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('보컬');
  const [selectedSearchOption, setSelectedSearchOption] = useState('찜 많은 순');

  const toggleCategoryModal = () => {
    setCategoryModal(!isCategoryModal);
  };

  const toggleSearchOptionModal = () => {
    setSearchModal(!isSearchModal);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <Txt>강사 찾기</Txt>
          </Header>
          <SearchBox>
            <Input
              value={searchTutor}
              onChangeText={setSearchTutor}
              placeholder="검색어를 입력해주세요."
              placeholderTextColor="lightgray"
            />
            <SearchIcon>
              <Ionicons name="search" size={32} color={COLORS.lightgray} />
            </SearchIcon>
          </SearchBox>
          <SelectSection>
            <CategoryBtn onPress={toggleCategoryModal}>
              <CategoryTxt>{selectedCategory}</CategoryTxt>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={RFValue(26)}
                marginRight={RFValue(5)}
                marginTop={RFValue(-3)}
              />
            </CategoryBtn>
            <SearchOptionBtn onPress={toggleSearchOptionModal}>
              <OptionTxt>{selectedSearchOption}</OptionTxt>
              <MaterialIcons name="keyboard-arrow-down" size={RFValue(20)} />
            </SearchOptionBtn>
          </SelectSection>
          <TutorList onPress={TutorProfile}>
            <SearchTutorItem />
          </TutorList>
          {isCategoryModal && (
            <CommunityCategoryModal
              onClose={() => setCategoryModal(false)}
              onSelectCategory={(category) => setSelectedCategory(category)}
              selectedCategory={selectedCategory}
            />
          )}
          {isSearchModal && (
            <SearchOptionModal
              onClose={() => setSearchModal(false)}
              onSelectSearchOption={(option) => setSelectedSearchOption(option)}
            />
          )}
        </Container>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.white};
`;

const Header = styled.View`
  flex: 0.05;
  justify-content: center;
  align-items: center;
`;

const Txt = styled.Text`
  font-size: ${RFValue(18)}px;
  font-weight: 900;
`;

const SearchBox = styled.View`
  flex: 0.08;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const Input = styled.TextInput`
  background-color: transparent;
  width: ${wp(90.4)}px;
  height: ${hp(5)}px;
  border-radius: 10px;
  border-color: lightgray;
  border-width: 1px;
  padding-left: ${RFValue(4)}px;
  font-size: ${RFValue(13)}px;
  padding: ${RFValue(10)}px;
`;

const SearchIcon = styled.TouchableOpacity`
  position: absolute;
  margin-top: ${hp(0.6)}px;
  right: ${wp(6)}px;
`;

const SelectSection = styled.View`
  flex: 0.05;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: ${hp(0)}px ${wp(5)}px;
`;

const CategoryBtn = styled.TouchableOpacity`
  flex-direction: row;
`;

const CategoryTxt = styled.Text`
  font-size: ${RFValue(20)}px;
  font-weight: 900;
  color: ${COLORS.black};
`;

const SearchOptionBtn = styled.TouchableOpacity`
  flex-direction: row;
  width: ${wp(32)}px;
  height: ${hp(3.6)}px;
  border-radius: ${RFValue(5)}px;
  border-color: lightgray;
  border-width: 1px;
  justify-content: space-between;
  align-items: center;
`;

const OptionTxt = styled.Text`
  font-size: ${RFValue(11)}px;
  font-weight: 600;
  color: ${COLORS.black};
  margin: 0 0 0 ${wp(2)}px;
`;

const TutorList = styled.TouchableOpacity`
  flex: 0.82;
`;

export default SearchTutorScreen;

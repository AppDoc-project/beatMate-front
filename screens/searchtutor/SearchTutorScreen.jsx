import { COLORS } from 'colors';
import React, { useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styled from 'styled-components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import CommunityCategory from '@components/searchtutor/CommunityCategory';
import SearchTutorItem from '@components/searchtutor/SearchTutorItem';
import { useNavigation } from '@react-navigation/native';

function SearchTutorScreen(props) {
  const navigation = useNavigation();

  const TutorProfile = () => {
    navigation.navigate('tutorProfileScreen');
  };

  const [searchTutor, setSearchTutor] = useState(''); // 강사 검색 저장

  const [isModalVisible, setModalVisible] = useState(false); //modal
  
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
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
          <CategoryBtn onPress={toggleModal}>
            <Txt>보컬</Txt>
            <MaterialIcons
              name="keyboard-arrow-down"
              size={RFValue(26)}
              marginRight={RFValue(5)}
              marginTop={RFValue(-3)}
            />
            {isModalVisible && <CommunityCategory />}
          </CategoryBtn>
        </SelectSection>
        <TutorList onPress={TutorProfile}>
          <SearchTutorItem />
        </TutorList>
      </Container>
    </TouchableWithoutFeedback>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.white};
`;

const SearchBox = styled.View`
  flex: 0.2;
  top: ${hp(11.5)}px;
  align-items: center;
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
  margin-top: ${hp(0.6)}px;
  position: absolute;
  right: ${wp(6)}px;
`;

const SelectSection = styled.View`
  flex: 0.05;
`;

const CategoryBtn = styled.TouchableOpacity`
  position: absolute;
  padding: ${hp(0)}px ${wp(5)}px;
  flex-direction: row;
`;

const Txt = styled.Text`
  font-size: ${RFValue(20)}px;
  font-weight: 900;
  color: ${COLORS.black};
`;

const TutorList = styled.TouchableOpacity`
  flex: 0.75;
`;

export default SearchTutorScreen;

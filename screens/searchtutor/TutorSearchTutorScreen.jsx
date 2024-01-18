import { COLORS } from 'colors';
import React, { useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styled from 'styled-components';
import Ionicons from 'react-native-vector-icons/Ionicons';

function TutorSearchTutorScreen(props) {
  const [searchTutor, setSearchTutor] = useState(''); // 강사 검색 저장

  return (
    <Container>
      <SearchBox>
        <Input
          value={searchTutor}
          onChangeText={setSearchTutor}
          placeholder="검색어를 입력해주세요."
          placeholderTextColor="lightgray"
        />
        <SearchIcon>
          <Ionicons name="search" size={32} color={COLORS.lightgray} marginLeft={5} />
        </SearchIcon>
      </SearchBox>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.white};
  align-items: center;
`;

const SearchBox = styled.View`
  top: ${hp(11.5)}px;
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
  right: ${wp(2)}px;
`;

export default TutorSearchTutorScreen;

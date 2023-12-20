import { COLORS } from 'colors';
import React, { useState } from 'react';
import { Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

function CommunityScreen(props) {
  const [searchKeyword, setSearchKeyword] = useState(''); // 검색 키워드 저장

  return (
    <Container>
      <MainTxt>커뮤니티</MainTxt>
      <SearchBox>
        <Input
          value={searchKeyword}
          onChangeText={setSearchKeyword}
          placeholder="검색어를 입력해주세요"
          placeholderTextColor="lightgray"
        />
        <AntDesign name="search1" size={32} marginLeft={5} />
      </SearchBox>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.white};
  align-items: center;
`;

const MainTxt = styled.Text`
  font-size: ${RFValue(22)}px;
  font-weight: bold;
  position: absolute;
  top: ${hp(9)};
`;

const SearchBox = styled.View`
  top: ${hp(15)}px;
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
  font-weight: bold;
  padding: ${RFValue(10)}px;
`;

export default CommunityScreen;

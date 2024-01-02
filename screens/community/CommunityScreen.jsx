import { useFocusEffect } from '@react-navigation/native';
import { getCommunitySection } from 'api/commity';
import { COLORS } from 'colors';
import format from 'pretty-format';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components/native';

function CommunityScreen(props) {
  const [searchKeyword, setSearchKeyword] = useState(''); // 검색 키워드 저장

  //게시판 리스트 조회 API
  const [SectionData, setSectionData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      getCommunitySection()
        .then((res) => {
          console.log('Request Headers:', res.headers); // 이 부분에서 요청(request)로 보낸 header를 확인할 수 있습니다.
          console.log(format(res.data));
          setSectionData(res.data);
          console.log(SectionData);
          setIsLoading(false);
          setIsError(false);
        })
        .catch((err) => {
          console.log(err);
          setIsError(true);
          setIsLoading(false);
        });
    }, []),
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

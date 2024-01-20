import { WriteBtn } from '@assets/Icons/Buttons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { COLORS } from 'colors';
import format from 'pretty-format';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components/native';

function CommunitySpecificScreen() {
  const navigation = useNavigation();
  const [searchKeyword, setSearchKeyword] = useState(''); // 검색 키워드 저장

  //게시판 리스트 조회 API
  //   const [SectionData, setSectionData] = useState(null);
  //   const [isLoading, setIsLoading] = useState(false);
  //   const [isError, setIsError] = useState(false);

  const writeNewPost = () => {
    navigation.navigate('writeNewPostScreen');
  };

  //   useFocusEffect(
  //     React.useCallback(() => {
  //       setIsLoading(true);
  //       getCommunitySection()
  //         .then((res) => {
  //           console.log(format(res.data));
  //           setSectionData(res.data);
  //           setIsLoading(false);
  //           setIsError(false);
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //           setIsError(true);
  //           setIsLoading(false);
  //         });
  //     }, [setIsLoading, setSectionData, setIsError]),
  //   );

  //   if (isLoading) {
  //     return (
  //       <View>
  //         <Text>로딩중...</Text>
  //       </View>
  //     );
  //   }

  //   if (isError) {
  //     return (
  //       <View>
  //         <Text>에러 발생</Text>
  //       </View>
  //     );
  //   }

  const onPressPreviousBtn = () => {
    navigation.navigate('');
  };

  return (
    <Container>
      <AntDesign name="left" size={32} marginLeft={5} onPress={onPressPreviousBtn} />

      <MainTxt>커뮤니티</MainTxt>
      <SearchBox>
        <Input
          value={searchKeyword}
          onChangeText={setSearchKeyword}
          placeholder="검색어를 입력해주세요"
          placeholderTextColor="lightgray"
        />
        <SearchIcon name="search1" size={30} color={COLORS.lightgray} />
      </SearchBox>

      <Btn onPress={writeNewPost}>
        <WriteBtn />
      </Btn>
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
  top: ${hp(9)};
`;

const SearchBox = styled.View`
  top: ${hp(15)}px;
  flex-direction: row;
  align-items: center;
  position: relative;
`;

const Input = styled.TextInput`
  background-color: transparent;
  width: ${wp(90)}px;
  height: ${hp(5)}px;
  border-radius: 10px;
  border-color: lightgray;
  border-width: 1px;
  padding-left: ${RFValue(4)}px;
  font-size: ${RFValue(13)}px;
  font-weight: bold;
  padding: ${RFValue(10)}px;
`;

const SearchIcon = styled(AntDesign)`
  position: absolute;
  right: 20px;
`;

const Btn = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  bottom: 20px;
`;

export default CommunitySpecificScreen;

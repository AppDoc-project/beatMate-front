import SearchTutorItem from '@components/searchtutor/SearchTutorItem';
import SelectCategoryTutor from '@components/searchtutor/SelectCategoryTutor';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { searchWithTutorName, searchWithSortOption } from 'api/tutorpage';
import { COLORS } from 'colors';
import { TutorFindCategory } from 'context/TutorFindCategoryContext';
import format from 'pretty-format';
import React, { useContext, useEffect, useState } from 'react';
import { Text, View, FlatList, ActivityIndicator, Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components/native';

function SearchTutorScreen() {
  const {
    category: [findTutorCategory, setFindTutorCategory],
  } = useContext(TutorFindCategory);

  const { koCategoryName, enCategoryName } = findTutorCategory;

  const navigation = useNavigation();
  const route = useRoute();
  const { searchTutorName, searchType } = route.params;

  const [page, setPage] = useState(0);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);

  const [tutorPosts, setTutorPosts] = useState([]);

  const onPressPreviousBtn = () => {
    navigation.goBack();
  };

  // 이름으로 강사찾기
  const [searchedNameTutors, setSearchedNameTutor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      if (searchTutorName && koCategoryName) {
        setIsLoading(true);
        searchWithTutorName(searchTutorName, enCategoryName)
          .then((res) => {
            console.log('이름으로 강사찾기', format(res.data));
            setSearchedNameTutor(res.data);
            setIsLoading(false);
          })
          .catch((error) => {
            if (error.response && error.response.data.code === 408) {
              Alert.alert('알림', '로그인을 해주세요.');
              navigation.navigate('homeScreen');
            } else if (error.response && error.response.data.code === 500) {
              Alert.alert('알림', '서버에러가 발생했습니다. 잠시 후 다시 시도해 주세요.');
            } else {
              console.log('이름으로 강사찾기 실패', error);
              Alert.alert('알림', '네트워크 연결을 확인해주세요.');
              navigation.navigate('homeScreen');
              setIsError(true);
            }
            setIsLoading(false);
          });
      }
    }, [searchTutorName, enCategoryName]),
  );

  // 검색 조건으로 강사찾기
  const [optionedTutor, setOptionedTutor] = useState(null);
  const [isOptionedLoading, setOptionedIsLoading] = useState(false);
  const [isOptionedError, setOptionedIsError] = useState(false);

  useEffect(() => {
    if (searchType && koCategoryName) {
      setOptionedIsLoading(true);
      searchWithSortOption(searchType, enCategoryName, page, 10)
        .then((res) => {
          console.log('검색 조건으로 강사찾기', format(res.data));
          setOptionedTutor(res.data);
          setTutorPosts(res.data);
          setOptionedIsLoading(false);
        })

        .catch((error) => {
          if (error.response && error.response.data.code === 408) {
            Alert.alert('알림', '로그인을 해주세요.');
            navigation.navigate('homeScreen');
          } else if (error.response && error.response.data.code === 500) {
            Alert.alert('알림', '서버에러가 발생했습니다. 잠시 후 다시 시도해 주세요.');
          } else {
            console.log('검색 조건으로 강사찾기 실패', error);
            Alert.alert('알림', '네트워크 연결을 확인해주세요.');
            navigation.navigate('homeScreen');
            setOptionedIsError(true);
          }
          setOptionedIsLoading(false);
        });
    }
  }, [searchType, enCategoryName]);

  const fetchData = async (page) => {
    try {
      if (isFetchingMore) {
        return;
      }

      setIsFetchingMore(true);
      setIsLoading(true);

      setPage(page + 1);

      const response = await searchWithSortOption(searchType, enCategoryName, page, 10);

      const newDatas = response.data;

      setTutorPosts((prevPosts) => (newDatas.length > 0 ? [...prevPosts, ...newDatas] : prevPosts));
      setHasMoreData(optionedTutor.length > 0);
      setIsLoading(false);
      setIsError(false);
    } catch (error) {
      console.error('데이터를 불러오는 중 에러 발생:', error);
      setIsError(true);
    } finally {
      setIsFetchingMore(false);
    }
  };

  const onEndReached = () => {
    if (!isLoading && hasMoreData && !isFetchingMore) {
      fetchData(page);
    }
  };

  if (isLoading || isOptionedLoading) {
    return (
      <View>
        <Text>로딩중...</Text>
      </View>
    );
  }

  if (isError || isOptionedError) {
    return (
      <View>
        <Text>에러 발생</Text>
      </View>
    );
  }

  return (
    <Container>
      <Top>
        <AntDesign name="left" size={32} marginLeft={5} marginRight={5} onPress={() => onPressPreviousBtn()} />
        <MainTxt>강사찾기</MainTxt>
      </Top>
      <SecondRow>
        <SelectCategoryTutor />
      </SecondRow>

      <TypeChooseWrapper onPress={() => navigation.navigate('getSearchOptionScreen')}>
        <TypeWrapper>
          <TypeTxt>검색 및 정렬 조건 설정하기</TypeTxt>
          <AntDesign name={'caretdown'} size={RFValue(12)} color={COLORS.black} />
        </TypeWrapper>
      </TypeChooseWrapper>

      <PostWrapper>
        {searchedNameTutors && searchedNameTutors.data && (
          <ListScrollView>
            {searchedNameTutors.data.map((searchedNameTutor) => (
              <SearchTutorItem key={searchedNameTutor.id} searchedTutor={searchedNameTutor} />
            ))}
          </ListScrollView>
        )}
        {tutorPosts && tutorPosts.data && (
          <FlatList
            data={tutorPosts.data}
            renderItem={({ item }) => <SearchTutorItem searchedTutor={item} />}
            onEndReached={onEndReached}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0.1}
            ListFooterComponent={() => (isLoading ? <ActivityIndicator /> : null)}
          />
        )}
      </PostWrapper>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.white};
  align-items: center;
`;

const Top = styled.View`
  top: ${hp(5)};
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const MainTxt = styled.Text`
  font-size: ${RFValue(15)}px;
  font-weight: bold;
  flex: 1;
`;

const SecondRow = styled.View`
  width: ${wp(100)}px;
  align-items: center;
  justify-content: center;
  padding: ${hp(1)}px;
  top: ${hp(5)}px;
`;

const PostWrapper = styled.View`
  height: ${hp(62)}px;
  top: ${hp(18)}px;
`;

const TypeChooseWrapper = styled.TouchableOpacity`
  width: ${wp(100)}px;
  align-items: center;
  top: ${hp(8)}px;
`;

const TypeWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  border-color: ${COLORS.black};
  border-width: 1px;
  padding: ${RFValue(5)}px;
  position: absolute;
  right: 0;
  margin-right: ${wp(5)}px;
`;

const TypeTxt = styled.Text`
  margin-right: ${wp(2)}px;
  font-size: ${RFValue(11)}px;
  font-weight: bold;
`;

const ListScrollView = styled.ScrollView`
  flex-grow: 1;
`;

export default SearchTutorScreen;
